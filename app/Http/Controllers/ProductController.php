<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $topProducts = Product::inRandomOrder()->take(5)->get();
        return inertia('Home', compact('topProducts'));
    }

    public function show($category)
    {
        $products = Product::where('category', $category)->paginate(15);
        return inertia('ProductListing', compact('products', 'category'));
    }

    public function details($id)
    {
        $product = Product::with(['reviews.user'])->findOrFail($id);
        
        $can_review = false;
        if (auth()->check()) {
            // Check if user has an order containing this product
            $can_review = auth()->user()->orders()->whereHas('orderItems', function ($query) use ($id) {
                $query->where('product_id', $id);
            })->exists();
        }

        return inertia('ProductDetail', [
            'product' => $product,
            'can_review' => $can_review
        ]);
    }

    public function newCollections()
    {
        $products = Product::latest()->paginate(15);
        return inertia('ProductListing', [
            'products' => $products,
            'category' => 'New Collections'
        ]);
    }
}
