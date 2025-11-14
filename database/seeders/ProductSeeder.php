<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProductSeeder extends Seeder
{
    /**
     * Unsplash image IDs for different categories (real photo IDs)
     */
    private array $menImages = [
        '1463453091185-61582044d556', '1515889109617-4c8b2c0a88a3', '1507003211169-0a1dd7228f2d',
        '1506794778202-cad84cf45f1d', '1500648767791-00dcc994a43e', '1519085360753-af7119f542e2',
        '1507003211169-0a1dd7228f2d', '1506794778202-cad84cf45f1d', '1500648767791-00dcc994a43e',
        '1519085360753-af7119f542e2', '1463453091185-61582044d556', '1515889109617-4c8b2c0a88a3',
        '1507003211169-0a1dd7228f2d', '1506794778202-cad84cf45f1d', '1500648767791-00dcc994a43e',
        '1519085360753-af7119f542e2', '1463453091185-61582044d556', '1515889109617-4c8b2c0a88a3',
    ];

    private array $womenImages = [
        '1490578474895-699cd4e2cf59', '1515889109617-4c8b2c0a88c0', '1494790108377-be9c29b29330',
        '1508214751196-bcfd4ca60f91', '1517841905240-472988babdf9', '1500648767791-00dcc994a43e',
        '1494790108377-be9c29b29330', '1508214751196-bcfd4ca60f91', '1517841905240-472988babdf9',
        '1500648767791-00dcc994a43e', '1490578474895-699cd4e2cf59', '1515889109617-4c8b2c0a88c0',
        '1494790108377-be9c29b29330', '1508214751196-bcfd4ca60f91', '1517841905240-472988babdf9',
        '1500648767791-00dcc994a43e', '1490578474895-699cd4e2cf59', '1515889109617-4c8b2c0a88c0',
    ];

    private array $kidsImages = [
        '1503454537195-1dcabb7ffcd9', '1515889109617-4c8b2c0a88e0', '1503454537195-1dcabb7ffcd9',
        '1515889109617-4c8b2c0a88e0', '1503454537195-1dcabb7ffcd9', '1515889109617-4c8b2c0a88e0',
        '1503454537195-1dcabb7ffcd9', '1515889109617-4c8b2c0a88e0', '1503454537195-1dcabb7ffcd9',
        '1515889109617-4c8b2c0a88e0', '1503454537195-1dcabb7ffcd9', '1515889109617-4c8b2c0a88e0',
        '1503454537195-1dcabb7ffcd9', '1515889109617-4c8b2c0a88e0', '1503454537195-1dcabb7ffcd9',
        '1515889109617-4c8b2c0a88e0', '1503454537195-1dcabb7ffcd9', '1515889109617-4c8b2c0a88e0',
    ];

    /**
     * Generate Unsplash URL from image ID
     */
    private function getUnsplashUrl(string $imageId, int $width = 800, int $height = 800): string
    {
        return "https://images.unsplash.com/photo-{$imageId}?w={$width}&h={$height}&fit=crop&auto=format";
    }

    /**
     * Get random image IDs for a category
     */
    private function getRandomImages(string $category, int $count = 5): array
    {
        $pool = match($category) {
            'men' => $this->menImages,
            'women' => $this->womenImages,
            'kids' => $this->kidsImages,
            default => $this->menImages,
        };

        shuffle($pool);
        return array_slice($pool, 0, min($count, count($pool)));
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = base_path('Products.json');
        
        if (!File::exists($jsonPath)) {
            $this->command->error('Products.json file not found!');
            return;
        }

        $products = json_decode(File::get($jsonPath), true);
        $imageIndex = 0;

        foreach ($products as $product) {
            $category = $product['category'] ?? 'men';
            $imagePool = match($category) {
                'men' => $this->menImages,
                'women' => $this->womenImages,
                'kids' => $this->kidsImages,
                default => $this->menImages,
            };

            // Get main image
            $mainImageId = $imagePool[$imageIndex % count($imagePool)];
            $mainImageUrl = $this->getUnsplashUrl($mainImageId);

            // Generate sub images (5 variations)
            $subImageIds = $this->getRandomImages($category, 5);
            $subImages = array_map(fn($id) => $this->getUnsplashUrl($id), $subImageIds);

            Product::create([
                'name' => $product['product_name'] ?? 'Product',
                'description' => $product['product_description'] ?? '',
                'category' => $category,
                'product_image' => $mainImageUrl,
                'product_sub_images' => $subImages,
                'old_price' => (float) str_replace([' USD', 'USD', '$'], '', $product['old_price'] ?? '0'),
                'new_price' => (float) str_replace([' USD', 'USD', '$'], '', $product['new_price'] ?? '0'),
                'seller_name' => $product['seller_name'] ?? null,
                'rating' => !empty($product['ratings']) ? 5 : 0,
                'stock' => (int) ($product['quantity'] ?? 10),
            ]);

            $imageIndex++;
        }

        $this->command->info('Products seeded successfully with Unsplash images!');
    }
}
