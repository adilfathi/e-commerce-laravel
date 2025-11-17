#!/bin/bash
# Build script untuk Vercel deployment

set -e

echo "🚀 Starting Vercel build process..."

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install

# Build assets
echo "🔨 Building assets..."
npm run build

# Optimize Laravel
echo "⚡ Optimizing Laravel..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "✅ Build completed successfully!"

