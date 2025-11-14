@extends('layouts.app')

@section('title', 'Home - E-Commerce')

@section('content')
<!-- Hero Section -->
<div class="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h1 class="text-5xl font-bold mb-6">New Collections For Everyone</h1>
                <a href="{{ route('new-collections') }}" class="inline-block bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
                    View Collections
                </a>
            </div>
            <div>
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&auto=format" alt="New Collections" class="rounded-lg shadow-2xl">
            </div>
        </div>
    </div>
</div>

<!-- Popular Products Section -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Men's Products -->
    <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Popular In Men</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach($menProducts as $product)
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer" onclick="window.location='{{ route('product.details', $product->id) }}'">
                <img src="{{ str_starts_with($product->product_image, 'http') ? $product->product_image : asset($product->product_image) }}" alt="{{ $product->name }}" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $product->name }}</h3>
                    <div class="flex items-center space-x-2">
                        <span class="text-xl font-bold text-red-600">${{ number_format($product->new_price, 2) }}</span>
                        <span class="text-sm text-gray-500 line-through">${{ number_format($product->old_price, 2) }}</span>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>

    <!-- Women's Products -->
    <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Popular In Women</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach($womenProducts as $product)
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer" onclick="window.location='{{ route('product.details', $product->id) }}'">
                <img src="{{ str_starts_with($product->product_image, 'http') ? $product->product_image : asset($product->product_image) }}" alt="{{ $product->name }}" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $product->name }}</h3>
                    <div class="flex items-center space-x-2">
                        <span class="text-xl font-bold text-red-600">${{ number_format($product->new_price, 2) }}</span>
                        <span class="text-sm text-gray-500 line-through">${{ number_format($product->old_price, 2) }}</span>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>

    <!-- Kids' Products -->
    <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Popular In Kids</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach($kidsProducts as $product)
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer" onclick="window.location='{{ route('product.details', $product->id) }}'">
                <img src="{{ str_starts_with($product->product_image, 'http') ? $product->product_image : asset($product->product_image) }}" alt="{{ $product->name }}" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $product->name }}</h3>
                    <div class="flex items-center space-x-2">
                        <span class="text-xl font-bold text-red-600">${{ number_format($product->new_price, 2) }}</span>
                        <span class="text-sm text-gray-500 line-through">${{ number_format($product->old_price, 2) }}</span>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>

<!-- Offer Section -->
<div class="bg-gray-100 dark:bg-gray-800 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Exclusive Offers For You</h2>
                <button onclick="checkOffer()" class="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition">
                    Check Now
                </button>
            </div>
            <div>
                <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop&auto=format" alt="Special Offer" class="rounded-lg shadow-lg">
            </div>
        </div>
    </div>
</div>

<script>
function checkOffer() {
    const coupon = prompt("Please Enter Your Coupon Code Here!");
    if (coupon != null && coupon != "") {
        alert("Sorry! The Offer Expired!");
    }
}
</script>
@endsection

