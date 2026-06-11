<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;


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
Route::get('/orders', [OrderController::class, 'index'])->name('orders.index')->middleware('auth');
Route::post('/order', [OrderController::class, 'store'])->name('order.store')->middleware('auth');
Route::get('/payment/{orderId}', [OrderController::class, 'payment'])->name('payment')->middleware('auth');
Route::post('/payment/{orderId}/complete', [OrderController::class, 'completePayment'])->name('payment.complete')->middleware('auth');

// Custom Payment Simulator Gateway
use App\Http\Controllers\PaymentSimulatorController;
Route::get('/simulator/success', [PaymentSimulatorController::class, 'success'])->name('simulator.success');
Route::get('/simulator/failure', [PaymentSimulatorController::class, 'failure'])->name('simulator.failure');
Route::get('/simulator/{orderId}', [PaymentSimulatorController::class, 'show'])->name('simulator.show')->middleware('auth');
Route::post('/simulator/{orderId}/process', [PaymentSimulatorController::class, 'process'])->name('simulator.process')->middleware('auth');

// Admin Routes
use App\Http\Controllers\AdminController;
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/orders', [AdminController::class, 'orders'])->name('admin.orders.index');
    Route::get('/products', [AdminController::class, 'index'])->name('admin.products.index');
    Route::post('/products', [AdminController::class, 'store'])->name('admin.products.store');
    Route::put('/products/{id}', [AdminController::class, 'update'])->name('admin.products.update');
    Route::delete('/products/{id}', [AdminController::class, 'destroy'])->name('admin.products.destroy');
    Route::post('/products/clear', [AdminController::class, 'clearAll'])->name('admin.products.clear');
});
