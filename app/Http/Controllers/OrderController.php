<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())
            ->with('orderItems.product')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return inertia('Orders', [
            'orders' => $orders
        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to place an order');
        }

        $request->validate([
            'shipping_address' => 'required|string|max:1000'
        ]);

        $cartItems = CartItem::where('user_id', Auth::id())
            ->with('product')
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart')->with('error', 'Your cart is empty!');
        }

        DB::beginTransaction();
        try {
            $totalPrice = $cartItems->sum(function ($item) {
                return $item->product->new_price * $item->quantity;
            });

            $totalOldPrice = $cartItems->sum(function ($item) {
                return $item->product->old_price * $item->quantity;
            });

            $discount = $totalOldPrice - $totalPrice;
            $netPrice = $totalPrice;

            // Set payment expiration to 24 hours from now
            $order = Order::create([
                'user_id' => Auth::id(),
                'total_price' => $totalPrice,
                'discount' => $discount,
                'net_price' => $netPrice,
                'status' => 'pending',
                'payment_status' => 'pending',
                'shipping_address' => $request->shipping_address,
                'payment_expires_at' => now()->addHours(24),
            ]);

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->new_price,
                ]);
            }

            CartItem::where('user_id', Auth::id())->delete();

            DB::commit();

            return redirect()->route('payment', $order->id)->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to place order. Please try again.');
        }
    }

    public function payment($orderId)
    {
        $order = Order::where('user_id', Auth::id())
            ->where('id', $orderId)
            ->with('orderItems.product')
            ->firstOrFail();

        // Check if payment has expired
        if ($order->payment_expires_at && $order->payment_expires_at->isPast() && $order->payment_status === 'pending') {
            $order->update([
                'payment_status' => 'failed',
                'status' => 'cancelled',
            ]);
            return redirect()->route('cart')->with('error', 'Payment time has expired. Please place a new order.');
        }

        // Check if order is already paid or failed
        if ($order->payment_status === 'paid') {
            return redirect()->route('home')->with('success', 'This order has already been paid.');
        }

        if ($order->payment_status === 'failed' || $order->payment_status === 'expired' || $order->payment_status === 'cancelled') {
            return redirect()->route('cart')->with('error', 'This order has been cancelled or expired. Please place a new order.');
        }

        return inertia('Payment', [
            'order' => $order,
            'midtrans_client_key' => config('midtrans.client_key'),
            'is_production' => config('midtrans.is_production')
        ]);
    }

    public function completePayment(Request $request, $orderId)
    {
        $order = Order::where('user_id', Auth::id())
            ->where('id', $orderId)
            ->firstOrFail();

        $order->update([
            'payment_status' => 'paid',
            'status' => 'processing',
        ]);

        return redirect()->route('home')->with('success', 'Payment completed successfully!');
    }
}
