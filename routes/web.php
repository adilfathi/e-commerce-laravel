<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MidtransController;

// Home
Route::get('/', [ProductController::class, 'index'])->name('home');

// Products
Route::get('/category/{category}', [ProductController::class, 'show'])->name('category');
Route::get('/product/{id}', [ProductController::class, 'details'])->name('product.details');
Route::get('/new-collections', [ProductController::class, 'newCollections'])->name('new-collections');

// Reviews
use App\Http\Controllers\ReviewController;
Route::post('/product/{id}/review', [ReviewController::class, 'store'])->name('product.review')->middleware('auth');

// Authentication
Route::get('/login', [AuthController::class, 'showLogin'])->name('login')->middleware('guest');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register')->middleware('guest');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart')->middleware('auth');
Route::post('/cart/add/{productId}', [CartController::class, 'add'])->name('cart.add')->middleware('auth');
Route::put('/cart/update/{id}', [CartController::class, 'update'])->name('cart.update')->middleware('auth');
Route::delete('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove')->middleware('auth');
Route::get('/cart/count', [CartController::class, 'count'])->name('cart.count');

// Orders
Route::post('/order', [OrderController::class, 'store'])->name('order.store')->middleware('auth');
Route::get('/payment/{orderId}', [OrderController::class, 'payment'])->name('payment')->middleware('auth');
Route::post('/payment/{orderId}/complete', [OrderController::class, 'completePayment'])->name('payment.complete')->middleware('auth');

// Midtrans Payment Gateway
Route::post('/midtrans/snap-token/{orderId}', [MidtransController::class, 'createSnapToken'])->name('midtrans.snap-token')->middleware('auth');
Route::post('/midtrans/mark-failed/{orderId}', [MidtransController::class, 'markFailed'])->name('midtrans.mark-failed')->middleware('auth');
Route::post('/midtrans/notification', [MidtransController::class, 'notification'])->name('midtrans.notification');
Route::get('/midtrans/success', [MidtransController::class, 'success'])->name('midtrans.success');
Route::get('/midtrans/failure', [MidtransController::class, 'failure'])->name('midtrans.failure');

// Admin Routes
use App\Http\Controllers\AdminController;
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/products', [AdminController::class, 'index'])->name('admin.products.index');
    Route::post('/products', [AdminController::class, 'store'])->name('admin.products.store');
    Route::delete('/products/{id}', [AdminController::class, 'destroy'])->name('admin.products.destroy');
    Route::post('/products/clear', [AdminController::class, 'clearAll'])->name('admin.products.clear');
});
