@extends('layouts.app')

@section('title', 'Register - E-Commerce')

@section('content')
<div class="max-w-md mx-auto px-4 py-16">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Sign Up</h1>
        
        <form action="{{ route('register') }}" method="POST">
            @csrf
            
            <div class="mb-4">
                <label for="name" class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Name</label>
                <input type="text" name="name" id="name" required
                       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                       placeholder="Enter Your Name">
                @error('name')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

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
                <label for="password_confirmation" class="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Confirm Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation" required
                       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                       placeholder="Confirm Your Password">
            </div>

            <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition mb-4">
                Sign Up
            </button>
        </form>

        <hr class="my-6 border-gray-300 dark:border-gray-600">

        <p class="text-center text-gray-700 dark:text-gray-300">
            Already have an account? 
            <a href="{{ route('login') }}" class="text-red-600 hover:text-red-700 font-semibold">Log In</a>
        </p>
    </div>
</div>
@endsection

