<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;

class MidtransController extends Controller
{
    public function __construct()
    {
        // Configure Midtrans
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    /**
     * Create Snap Token for payment
     */
    public function createSnapToken(Request $request, $orderId)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $order = Order::where('user_id', Auth::id())
            ->where('id', $orderId)
            ->with('orderItems.product')
            ->firstOrFail();

        $user = Auth::user();

        // Prepare transaction details
        // Note: Midtrans uses IDR, so we need to convert USD to IDR (assuming 1 USD = 15000 IDR)
        // You should adjust this conversion rate based on your needs
        $conversionRate = 15000; // USD to IDR
        $grossAmount = (int) ($order->net_price * $conversionRate);
        
        $transactionDetails = [
            'order_id' => 'ORDER-' . $order->id . '-' . time(),
            'gross_amount' => $grossAmount,
        ];

        // Prepare customer details
        $customerDetails = [
            'first_name' => $user->name,
            'email' => $user->email,
        ];

        // Prepare item details
        $itemDetails = [];
        foreach ($order->orderItems as $item) {
            $itemDetails[] = [
                'id' => $item->product_id,
                'price' => (int) ($item->price * $conversionRate),
                'quantity' => $item->quantity,
                'name' => $item->product->name,
            ];
        }

        // Prepare Snap parameters
        $params = [
            'transaction_details' => $transactionDetails,
            'customer_details' => $customerDetails,
            'item_details' => $itemDetails,
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            
            // Update order with transaction ID
            $order->update([
                'transaction_id' => $transactionDetails['order_id'],
            ]);

            return response()->json([
                'snap_token' => $snapToken,
                'client_key' => config('midtrans.client_key'),
            ]);
        } catch (\Exception $e) {
            Log::error('Midtrans Snap Token Error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create payment token'], 500);
        }
    }

    /**
     * Handle Midtrans notification/callback
     */
    public function notification(Request $request)
    {
        try {
            $notification = new Notification();

            $transaction = $notification->transaction_status;
            $type = $notification->payment_type;
            $orderId = $notification->order_id;
            $fraud = $notification->fraud_status;

            // Extract order ID from transaction ID (format: ORDER-{id}-{timestamp})
            $orderIdParts = explode('-', $orderId);
            $actualOrderId = $orderIdParts[1] ?? null;

            if (!$actualOrderId) {
                return response()->json(['error' => 'Invalid order ID'], 400);
            }

            $order = Order::find($actualOrderId);

            if (!$order) {
                return response()->json(['error' => 'Order not found'], 404);
            }

            // Handle transaction status
            if ($transaction == 'capture') {
                if ($type == 'credit_card') {
                    if ($fraud == 'challenge') {
                        $order->update(['payment_status' => 'challenge']);
                    } else {
                        $order->update([
                            'payment_status' => 'paid',
                            'status' => 'processing',
                        ]);
                    }
                }
            } elseif ($transaction == 'settlement') {
                $order->update([
                    'payment_status' => 'paid',
                    'status' => 'processing',
                ]);
            } elseif ($transaction == 'pending') {
                $order->update(['payment_status' => 'pending']);
            } elseif ($transaction == 'deny') {
                $order->update([
                    'payment_status' => 'failed',
                    'status' => 'cancelled',
                ]);
            } elseif ($transaction == 'expire') {
                $order->update([
                    'payment_status' => 'expired',
                    'status' => 'cancelled',
                ]);
            } elseif ($transaction == 'cancel') {
                $order->update([
                    'payment_status' => 'cancelled',
                    'status' => 'cancelled',
                ]);
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error('Midtrans Notification Error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to process notification'], 500);
        }
    }

    /**
     * Handle payment success redirect
     */
    public function success(Request $request)
    {
        return redirect()->route('home')->with('success', 'Payment successful!');
    }

    /**
     * Handle payment failure redirect
     */
    public function failure(Request $request)
    {
        return redirect()->route('cart')->with('error', 'Payment failed or was cancelled. Please try again.');
    }

    /**
     * Mark order as failed when user closes payment popup
     */
    public function markFailed(Request $request, $orderId)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $order = Order::where('user_id', Auth::id())
            ->where('id', $orderId)
            ->firstOrFail();

        // Only mark as failed if still pending
        if ($order->payment_status === 'pending') {
            $order->update([
                'payment_status' => 'failed',
                'status' => 'cancelled',
            ]);
        }

        return response()->json(['status' => 'success']);
    }
}
