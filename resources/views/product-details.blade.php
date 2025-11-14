@extends('layouts.app')

@section('title', $product->name . ' - Product Details')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid md:grid-cols-2 gap-8">
        <!-- Product Images -->
        <div>
            <img src="{{ str_starts_with($product->product_image, 'http') ? $product->product_image : asset($product->product_image) }}" alt="{{ $product->name }}" class="w-full rounded-lg mb-4" id="mainImage">
            @if($product->product_sub_images && count($product->product_sub_images) > 0)
            <div class="grid grid-cols-5 gap-2">
                @foreach($product->product_sub_images as $subImage)
                <img src="{{ str_starts_with($subImage, 'http') ? $subImage : asset($subImage) }}" alt="{{ $product->name }}" 
                     class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition"
                     onclick="document.getElementById('mainImage').src = this.src">
                @endforeach
            </div>
            @endif
        </div>

        <!-- Product Info -->
        <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ $product->name }}</h1>
            <div class="flex items-center space-x-4 mb-4">
                <span class="text-3xl font-bold text-red-600">${{ number_format($product->new_price, 2) }}</span>
                <span class="text-xl text-gray-500 line-through">${{ number_format($product->old_price, 2) }}</span>
            </div>
            
            @if($product->rating > 0)
            <div class="flex items-center mb-4">
                @for($i = 0; $i < 5; $i++)
                    <svg class="w-5 h-5 {{ $i < $product->rating ? 'text-yellow-400' : 'text-gray-300' }}" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                @endfor
            </div>
            @endif

            <p class="text-gray-700 dark:text-gray-300 mb-6">{{ $product->description }}</p>
            
            @if($product->seller_name)
            <p class="text-gray-600 dark:text-gray-400 mb-6">Seller: <span class="font-semibold">{{ $product->seller_name }}</span></p>
            @endif

            <form action="{{ route('cart.add', $product->id) }}" method="POST" class="mb-6">
                @csrf
                <div class="flex items-center space-x-4 mb-4">
                    <label for="quantity" class="text-gray-700 dark:text-gray-300 font-semibold">Quantity:</label>
                    <input type="number" name="quantity" id="quantity" value="1" min="1" max="{{ $product->stock }}" 
                           class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                </div>
                <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition">
                    Add to Cart
                </button>
            </form>
        </div>
    </div>
</div>
@endsection

