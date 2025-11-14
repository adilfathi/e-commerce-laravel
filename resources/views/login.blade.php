@extends('layouts.app')

@section('title', 'Login - E-Commerce')

@section('content')
<div class="max-w-md mx-auto px-4 py-16">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Log In</h1>
        
        <form action="{{ route('login') }}" method="POST">
            @csrf
            
            <div class="mb-4">
                <label for="email" class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Email Address</label>
                <input type="email" name="email" id="email" required
                       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                       placeholder="Enter Your E-Mail Address">
                @error('email')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-4">
                <label for="password" class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Password</label>
                <input type="password" name="password" id="password" required
                       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                       placeholder="Enter Your Password">
                @error('password')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-6">
                <label class="flex items-center">
                    <input type="checkbox" name="remember" class="rounded border-gray-300 text-red-600 focus:ring-red-600">
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Remember me</span>
                </label>
            </div>

            <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition mb-4">
                Log In
            </button>
        </form>

        <hr class="my-6 border-gray-300 dark:border-gray-600">

        <p class="text-center text-gray-700 dark:text-gray-300">
            Don't have an account? 
            <a href="{{ route('register') }}" class="text-red-600 hover:text-red-700 font-semibold">Sign Up</a>
        </p>
    </div>
</div>
@endsection

