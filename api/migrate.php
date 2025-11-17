<?php
/**
 * Vercel Function untuk menjalankan migrations
 * 
 * Akses: POST https://your-project.vercel.app/api/migrate
 * 
 * WARNING: Hanya gunakan untuk development atau dengan authentication yang kuat!
 * Jangan expose endpoint ini di production tanpa protection.
 */

// Set header untuk JSON response
header('Content-Type: application/json');

// Simple authentication (GANTI DENGAN AUTHENTICATION YANG LEBIH AMAN!)
$authToken = $_ENV['MIGRATE_AUTH_TOKEN'] ?? null;
$providedToken = $_SERVER['HTTP_AUTHORIZATION'] ?? $_GET['token'] ?? null;

if ($authToken && $providedToken !== $authToken) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Load Laravel
define('LARAVEL_START', microtime(true));
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

try {
    // Run migrations
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
    
    $exitCode = $kernel->call('migrate', ['--force' => true]);
    $output = $kernel->output();
    
    if ($exitCode === 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Migrations completed successfully',
            'output' => $output
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Migration failed',
            'output' => $output
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}

