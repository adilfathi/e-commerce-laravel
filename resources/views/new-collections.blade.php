@extends('layouts.app')

@section('title', 'New Collections - E-Commerce')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">New Collections</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        @foreach($products as $product)
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
@endsection

