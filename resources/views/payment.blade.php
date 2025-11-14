@extends('layouts.app')

@section('title', 'Payment - E-Commerce')

@section('content')
<div class="max-w-2xl mx-auto px-4 py-16">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Payment Gateway</h1>
        
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Total Price:</span>
                    <span class="font-semibold">${{ number_format($order->total_price, 2) }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Discount:</span>
                    <span class="font-semibold text-green-600">${{ number_format($order->discount, 2) }}</span>
                </div>
                <hr class="my-4 border-gray-300 dark:border-gray-600">
                <div class="flex justify-between text-xl font-bold">
                    <span>Net Price:</span>
                    <span class="text-red-600">${{ number_format($order->net_price, 2) }}</span>
                </div>
            </div>
        </div>

        <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
            <div class="space-y-2">
                @foreach($order->orderItems as $item)
                <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <span class="text-gray-700 dark:text-gray-300">{{ $item->product->name }} x{{ $item->quantity }}</span>
                    <span class="font-semibold">${{ number_format($item->price * $item->quantity, 2) }}</span>
                </div>
                @endforeach
            </div>
        </div>

        @if($order->payment_expires_at)
        <div class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p class="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Payment expires:</strong> 
                <span id="expiry-time">{{ $order->payment_expires_at->format('M d, Y H:i:s') }}</span>
                <span id="expiry-countdown" class="ml-2 font-semibold"></span>
            </p>
            <p class="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                If payment is not completed before the expiration time, your order will be automatically cancelled.
            </p>
        </div>
        @endif

        <!-- Midtrans Snap Container -->
        <div id="snap-container" class="mb-6"></div>

        <!-- Payment Button -->
        <button id="pay-button" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition">
            Pay Now
        </button>
    </div>
</div>

<!-- Midtrans Snap Script -->
@if(config('midtrans.is_production'))
<script type="text/javascript" src="https://app.midtrans.com/snap/snap.js" data-client-key="{{ config('midtrans.client_key') }}"></script>
@else
<script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="{{ config('midtrans.client_key') }}"></script>
@endif

<script>
document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.getElementById('pay-button');
    const snapContainer = document.getElementById('snap-container');
    
    // Countdown timer for payment expiration
    @if($order->payment_expires_at)
    const expiryTime = new Date('{{ $order->payment_expires_at->toIso8601String() }}').getTime();
    const countdownElement = document.getElementById('expiry-countdown');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = expiryTime - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = '<span class="text-red-600">EXPIRED</span>';
            alert('Payment time has expired. Order will be cancelled.');
            window.location.href = '{{ route("midtrans.failure") }}';
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `(${hours}h ${minutes}m ${seconds}s remaining)`;
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    @endif
    
    payButton.addEventListener('click', function() {
        // Disable button to prevent multiple clicks
        payButton.disabled = true;
        payButton.textContent = 'Processing...';
        
        // Fetch Snap Token from backend
        fetch('{{ route("midtrans.snap-token", $order->id) }}', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.snap_token) {
                // Embed Snap payment
                window.snap.pay(data.snap_token, {
                    onSuccess: function(result) {
                        // Redirect to success page
                        window.location.href = '{{ route("midtrans.success") }}';
                    },
                    onPending: function(result) {
                        // Handle pending payment
                        console.log('Payment pending:', result);
                        window.location.href = '{{ route("midtrans.success") }}?status=pending';
                    },
                    onError: function(result) {
                        // Redirect to failure page
                        window.location.href = '{{ route("midtrans.failure") }}';
                    },
                    onClose: function() {
                        // User closed the payment popup without paying - mark as failed
                        fetch('{{ route("midtrans.mark-failed", $order->id) }}', {
                            method: 'POST',
                            headers: {
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        })
                        .then(() => {
                            alert('Payment was cancelled. Order has been marked as failed.');
                            window.location.href = '{{ route("midtrans.failure") }}';
                        })
                        .catch(() => {
                            payButton.disabled = false;
                            payButton.textContent = 'Pay Now';
                        });
                    }
                });
            } else {
                alert('Failed to initialize payment. Please try again.');
                payButton.disabled = false;
                payButton.textContent = 'Pay Now';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            payButton.disabled = false;
            payButton.textContent = 'Pay Now';
        });
    });
});
</script>
@endsection

