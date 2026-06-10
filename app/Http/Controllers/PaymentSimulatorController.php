<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentSimulatorController extends Controller
{
    /**
     * Display the Payment Simulator UI
     */
    public function show($orderId)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $order = Order::where('user_id', Auth::id())
            ->where('id', $orderId)
            ->with('orderItems.product')
            ->firstOrFail();

        // If order is already paid or cancelled, redirect accordingly
        if ($order->payment_status === 'paid' || $order->payment_status === 'settlement') {
            return redirect()->route('simulator.success');
        }
        
        if (in_array($order->payment_status, ['failed', 'cancelled', 'expired'])) {
            return redirect()->route('simulator.failure');
        }

        return inertia('PaymentSimulator', [
            'order' => $order
        ]);
    }

    /**
     * Process the simulated payment status
     */
    public function process(Request $request, $orderId)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'status' => 'required|string|in:success,pending,failed',
            'payment_method' => 'nullable|string'
        ]);

        $order = Order::where('user_id', Auth::id())
            ->where('id', $orderId)
            ->firstOrFail();

        $status = $request->input('status');
        
        if ($status === 'success') {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'processing',
                'transaction_id' => 'SIM-' . time() . '-' . rand(1000, 9999)
            ]);
            return redirect()->route('simulator.success');
        } elseif ($status === 'pending') {
            $order->update([
                'payment_status' => 'pending',
                'transaction_id' => 'SIM-' . time() . '-' . rand(1000, 9999)
            ]);
            // Stay on the same page or go to an order history page (we will just return back for simplicity)
            return redirect()->back()->with('success', 'Payment is pending verification.');
        } elseif ($status === 'failed') {
            $order->update([
                'payment_status' => 'failed',
                'status' => 'cancelled',
                'transaction_id' => 'SIM-' . time() . '-' . rand(1000, 9999)
            ]);
            return redirect()->route('simulator.failure');
        }
    }

    /**
     * Display the success page
     */
    public function success()
    {
        return redirect()->route('home')->with('success', 'Payment successful! Thank you for your order.');
    }

    /**
     * Display the failure page
     */
    public function failure()
    {
        return redirect()->route('cart')->with('error', 'Payment failed or was cancelled. Please try again.');
    }
}
