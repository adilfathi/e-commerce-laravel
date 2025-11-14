<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to view your cart');
        }

        $cartItems = CartItem::where('user_id', Auth::id())
            ->with('product')
            ->get();

        $totalPrice = $cartItems->sum(function ($item) {
            return $item->product->new_price * $item->quantity;
        });

        $totalOldPrice = $cartItems->sum(function ($item) {
            return $item->product->old_price * $item->quantity;
        });

        $discount = $totalOldPrice - $totalPrice;
        $netPrice = $totalPrice;

        return view('cart', compact('cartItems', 'totalPrice', 'discount', 'netPrice', 'totalOldPrice'));
    }

    public function add(Request $request, $productId)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to add items to cart');
        }

        $product = Product::findOrFail($productId);
        $quantity = $request->input('quantity', 1);

        $cartItem = CartItem::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'user_id' => Auth::id(),
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart!');
    }

    public function update(Request $request, $id)
    {
        $cartItem = CartItem::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $cartItem->quantity = $request->input('quantity', 1);
        $cartItem->save();

        return redirect()->back()->with('success', 'Cart updated!');
    }

    public function remove($id)
    {
        $cartItem = CartItem::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart!');
    }

    public function count()
    {
        if (!Auth::check()) {
            return response()->json(['count' => 0]);
        }

        $count = CartItem::where('user_id', Auth::id())->sum('quantity');
        return response()->json(['count' => $count]);
    }
}
