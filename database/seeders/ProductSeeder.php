<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Fetching products from Platzi Fake Store API...');

        // Category 1 is Clothes, Category 4 is Shoes
        $response = Http::get('https://api.escuelajs.co/api/v1/products?limit=30&categoryId=1');
        $shoesResponse = Http::get('https://api.escuelajs.co/api/v1/products?limit=10&categoryId=4');

        $products = array_merge($response->json() ?? [], $shoesResponse->json() ?? []);

        if (empty($products)) {
            $this->command->error('Failed to fetch products or API returned empty array.');
            return;
        }

        $categories = ['men', 'women', 'kids'];

        foreach ($products as $index => $item) {
            // Some Platzi images have brackets around them like '["url"]' due to a bug in their DB.
            // Let's clean the image URL just in case.
            $images = $item['images'] ?? [];
            $mainImageUrl = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'; // Fallback
            $subImages = [];

            if (count($images) > 0) {
                // Fix for Platzi's weird array format sometimes containing serialized strings
                $firstImage = $images[0];
                if (is_string($firstImage) && str_starts_with($firstImage, '["')) {
                    $decoded = json_decode($firstImage, true);
                    if (is_array($decoded) && count($decoded) > 0) {
                        $images = $decoded;
                    }
                }
                $mainImageUrl = $images[0] ?? $mainImageUrl;
                $subImages = array_slice($images, 0, 5);
            }

            // Assign category based on index to ensure even distribution
            $category = $categories[$index % 3];

            Product::create([
                'name' => $item['title'] ?? 'Modern Product',
                'description' => $item['description'] ?? 'Premium quality item.',
                'category' => $category,
                'product_image' => $mainImageUrl,
                'product_sub_images' => $subImages,
                'old_price' => (float) ($item['price'] * 1.2), // Generate a fake old price
                'new_price' => (float) $item['price'],
                'seller_name' => 'Platzi Premium',
                'rating' => rand(3, 5),
                'stock' => rand(10, 50),
            ]);
        }

        $this->command->info('Products seeded successfully from Platzi API!');
    }
}

