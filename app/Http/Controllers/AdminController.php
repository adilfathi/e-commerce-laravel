<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        
        $stats = [
            'totalRevenue' => Order::where('status', 'paid')->sum('net_price'),
            'totalOrders' => Order::count(),
            'totalProducts' => Product::count(),
        ];

        return inertia('Admin/Products', compact('products', 'stats'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:men,women,kids',
            'new_price' => 'required|numeric|min:0',
            'old_price' => 'required|numeric|min:0',
            'product_image' => 'nullable|url',
            'description' => 'required|string',
            'specifications' => 'nullable|string',
            'stock' => 'required|integer|min:0'
        ]);

        if (empty($validated['product_image'])) {
            $validated['product_image'] = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop';
        }

        // Handle specifications as array for backend if necessary, or just store as JSON
        if (!empty($validated['specifications'])) {
            $specsArray = array_filter(array_map('trim', explode("\n", $validated['specifications'])));
            $validated['specifications'] = json_encode($specsArray);
        } else {
            $validated['specifications'] = null;
        }

        Product::create($validated);

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:men,women,kids',
            'new_price' => 'required|numeric|min:0',
            'old_price' => 'required|numeric|min:0',
            'product_image' => 'nullable|url',
            'description' => 'required|string',
            'specifications' => 'nullable|string',
            'stock' => 'required|integer|min:0'
        ]);

        if (empty($validated['product_image'])) {
            $validated['product_image'] = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop';
        }

        if (!empty($validated['specifications'])) {
            $specsArray = array_filter(array_map('trim', explode("\n", $validated['specifications'])));
            $validated['specifications'] = json_encode($specsArray);
        } else {
            $validated['specifications'] = null;
        }

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }

    public function clearAll()
    {
        Product::truncate();
        return redirect()->back()->with('success', 'All products deleted.');
    }
}
