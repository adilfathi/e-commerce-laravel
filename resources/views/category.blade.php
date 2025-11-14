@extends('layouts.app')

@section('title', ucfirst($category) . ' - E-Commerce')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
        @php
            $bannerImages = [
                'men' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&auto=format',
                'women' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop&auto=format',
                'kids' => 'https://images.unsplash.com/photo-1503454537195-1dcabb7ffcd9?w=1200&h=400&fit=crop&auto=format',
            ];
        @endphp
        <img src="{{ $bannerImages[$category] ?? $bannerImages['men'] }}" alt="{{ ucfirst($category) }} Banner" class="w-full h-64 object-cover rounded-lg">
    </div>
    
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">All {{ ucfirst($category) }} Products</h1>
    
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

