<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $menProducts = Product::where('category', 'men')->take(4)->get();
        $womenProducts = Product::where('category', 'women')->take(4)->get();
        $kidsProducts = Product::where('category', 'kids')->take(4)->get();
        
        return view('home', compact('menProducts', 'womenProducts', 'kidsProducts'));
    }

    public function show($category)
    {
        $products = Product::where('category', $category)->get();
        return view('category', compact('products', 'category'));
    }

    public function details($id)
    {
        $product = Product::findOrFail($id);
        return view('product-details', compact('product'));
    }

    public function newCollections()
    {
        $products = Product::latest()->take(12)->get();
        return view('new-collections', compact('products'));
    }
}
