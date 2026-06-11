# Modern E-Commerce Platform

A full-featured, modern e-commerce web application built with Laravel 12, React 19, Inertia.js, and Tailwind CSS 4. This project demonstrates a complete online shopping experience with product management, shopping cart, user authentication, order processing, and an admin panel.

## Features

| Category | Feature | Description |
|----------|---------|-------------|
| Core E-Commerce | Product Catalog | Browse products by category (Men, Women, Kids). |
| Core E-Commerce | Product Details | Detailed product pages with image galleries and descriptions. |
| Core E-Commerce | Shopping Cart | Add, update, and remove items with real-time quantity management. |
| Core E-Commerce | Order Management | Complete order processing with status tracking. |
| Core E-Commerce | New Collections | Showcase latest products. |
| Core E-Commerce | Product Reviews | Users can leave and read reviews on products. |
| Admin | Admin Dashboard | Manage products and view orders. |
| Admin | Product Management | Full CRUD operations for products. |
| Admin | Role-based Access | Secured routes exclusively for administrators. |
| User Management | User Authentication | Secure registration and login system. |
| User Management | Session Management | Persistent user sessions with remember me functionality. |
| User Management | Cart Persistence | Shopping cart items saved per user. |
| User Management | Order History | Track order status. |
| UI/UX | Responsive Design | Fully responsive layout for all devices. |
| UI/UX | Dark Mode | Toggle between light and dark themes with persistent preference. |
| UI/UX | Modern UI | Clean, modern interface built with Tailwind CSS 4. |
| UI/UX | Image Optimization | High-quality product images loaded from Unsplash CDN. |
| UI/UX | Smooth Animations | Interactive elements with smooth transitions. |
| Technical | Inertia.js Integration | Seamless SPA experience without building an API. |
| Technical | Database Migrations | Version-controlled database schema. |
| Technical | Eloquent ORM | Efficient database relationships and queries. |
| Technical | Asset Optimization | Vite-powered asset bundling. |

## Tech Stack

- Backend: Laravel 12 (PHP 8.2+)
- Frontend: React 19, Inertia.js, Tailwind CSS 4, DaisyUI
- Database: PostgreSQL
- Build Tool: Vite
- Image CDN: Unsplash
- Authentication: Laravel Sanctum

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- PostgreSQL database

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/e-commerce.git
   cd e-commerce
   ```

2. Install PHP dependencies
   ```bash
   composer install
   ```

3. Install Node dependencies
   ```bash
   npm install
   ```

4. Environment setup
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Configure database
   Update your `.env` file with your database credentials:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=your-database
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   ```

6. Run migrations and seeders
   ```bash
   php artisan migrate:fresh --seed
   ```

7. Build assets
   ```bash
   npm run build
   ```

8. Start the development server
   ```bash
   php artisan serve
   ```

   Visit `http://localhost:8000` in your browser.

### Running with Docker (Production Ready)

Alternatively, you can run the entire stack using Docker Compose. The configuration uses Nginx and PHP-FPM for high performance.

1. Ensure your `.env` file is configured with your database settings.
2. Build and start the containers:
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```
3. The Laravel application will be available at `http://localhost:8000` (or `http://localhost` depending on your port configuration).

## Default User

For testing purposes, a default user is created via seeders:
- Email: test@example.com
- Password: password

## Project Structure

```
e-commerce/
├── app/
│   ├── Console/Commands/     # Artisan commands
│   ├── Http/Controllers/     # Application controllers
│   └── Models/               # Eloquent models
├── database/
│   ├── migrations/           # Database migrations
│   └── seeders/              # Database seeders
├── resources/
│   ├── css/                  # Stylesheets
│   ├── js/                   # React components and Inertia pages
│   └── views/                # Initial Blade template (app.blade.php)
├── routes/
│   ├── web.php               # Web routes
│   └── console.php           # Console routes
├── public/                   # Public assets
└── Products.json             # Product data for seeding
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured products |
| `/category/{category}` | Category page (men, women, kids) |
| `/product/{id}` | Product details page |
| `/new-collections` | Latest products showcase |
| `/cart` | Shopping cart (authenticated) |
| `/login` | User login page |
| `/register` | User registration page |
| `/product/{id}/review` | Submit a product review (authenticated) |
| `/admin/products` | Admin product management (admin) |
| `/admin/orders` | Admin orders overview (admin) |

## Deployment

This application uses a multi-stage Docker build for production deployment. The setup includes:
- Nginx for serving static files and acting as a reverse proxy.
- PHP-FPM for executing application logic.
- Optimized multi-stage Dockerfile that builds Node assets and PHP dependencies cleanly.
- `trustProxies` configuration to seamlessly handle SSL/HTTPS when deployed behind a reverse proxy (e.g., Cloudflare, AWS ALB).

## Testing

Run the test suite:
```bash
php artisan test
```

## Configuration

Key environment variables to configure:

```env
APP_NAME="E-Commerce"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ecommerce
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## License

This project is open-sourced software licensed under the MIT license.
