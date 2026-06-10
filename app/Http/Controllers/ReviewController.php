<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $product = Product::findOrFail($id);

        // Check if user actually bought the product
        $hasBought = auth()->user()->orders()->whereHas('orderItems', function ($query) use ($id) {
            $query->where('product_id', $id);
        })->exists();

        if (!$hasBought) {
            return back()->with('error', 'You can only review products you have purchased.');
        }

        // Check if user already reviewed
        $existingReview = Review::where('user_id', auth()->id())
                                ->where('product_id', $id)
                                ->first();
        if ($existingReview) {
            return back()->with('error', 'You have already reviewed this product.');
        }

        Review::create([
            'user_id' => auth()->id(),
            'product_id' => $id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Thank you for your review!');
    }
}
