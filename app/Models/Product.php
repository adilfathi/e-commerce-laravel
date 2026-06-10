<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasUuids;
    protected $fillable = [
        'name',
        'description',
        'specifications',
        'category',
        'product_image',
        'product_sub_images',
        'old_price',
        'new_price',
        'seller_name',
        'rating',
        'stock',
    ];

    protected $casts = [
        'product_sub_images' => 'array',
        'specifications' => 'array',
        'old_price' => 'decimal:2',
        'new_price' => 'decimal:2',
    ];

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
