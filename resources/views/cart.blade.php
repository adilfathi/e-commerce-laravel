@extends('layouts.app')

@section('title', 'Cart - E-Commerce')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
    
    @if($cartItems->count() > 0)
    <div class="grid md:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="md:col-span-2 space-y-4">
            @foreach($cartItems as $item)
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center space-x-4">
                <img src="{{ str_starts_with($item->product->product_image, 'http') ? $item->product->product_image : asset($item->product->product_image) }}" alt="{{ $item->product->name }}" class="w-24 h-24 object-cover rounded">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $item->product->name }}</h3>
                    <p class="text-red-600 font-bold">${{ number_format($item->product->new_price, 2) }}</p>
                </div>
                <div class="flex items-center space-x-4">
                    <form action="{{ route('cart.update', $item->id) }}" method="POST" class="flex items-center space-x-2">
                        @csrf
                        @method('PUT')
                        <input type="number" name="quantity" value="{{ $item->quantity }}" min="1" 
                               class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white">
                        <button type="submit" class="text-blue-600 hover:text-blue-800">Update</button>
                    </form>
                    <form action="{{ route('cart.remove', $item->id) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:text-red-800">Remove</button>
                    </form>
                </div>
            </div>
            @endforeach
        </div>

        <!-- Order Summary -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            <div class="space-y-2 mb-4">
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Total Price:</span>
                    <span class="font-semibold">${{ number_format($totalPrice, 2) }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Total Discount:</span>
                    <span class="font-semibold text-green-600">${{ number_format($discount, 2) }}</span>
                </div>
                <hr class="my-4 border-gray-300 dark:border-gray-600">
                <div class="flex justify-between text-xl font-bold">
                    <span>Net Price:</span>
                    <span class="text-red-600">${{ number_format($netPrice, 2) }}</span>
                </div>
            </div>
            <form action="{{ route('order.store') }}" method="POST">
                @csrf
                <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition">
                    PLACE ORDER
                </button>
            </form>
        </div>
    </div>
    @else
    <div class="text-center py-16">
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-4">Your cart is empty!</p>
        <a href="{{ route('home') }}" class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition">
            Continue Shopping
        </a>
    </div>
    @endif
</div>
@endsection

