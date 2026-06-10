<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasUuids;
    protected $fillable = [
        'user_id',
        'total_price',
        'discount',
        'net_price',
        'status',
        'payment_status',
        'transaction_id',
        'payment_expires_at',
        'shipping_address',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
        'discount' => 'decimal:2',
        'net_price' => 'decimal:2',
        'payment_expires_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
