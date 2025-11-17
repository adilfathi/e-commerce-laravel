# 🛍️ Modern E-Commerce Platform

A full-featured, modern e-commerce web application built with Laravel 12 and Tailwind CSS 4. This project demonstrates a complete online shopping experience with product management, shopping cart, user authentication, order processing, and integrated payment gateway.

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat-square&logo=php)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-316192?style=flat-square&logo=postgresql)

## ✨ Features

### 🛒 Core E-Commerce Features
- **Product Catalog**: Browse products by category (Men, Women, Kids)
- **Product Details**: Detailed product pages with image galleries and descriptions
- **Shopping Cart**: Add, update, and remove items with real-time quantity management
- **Order Management**: Complete order processing with status tracking
- **Payment Integration**: Seamless payment processing via Midtrans payment gateway
- **New Collections**: Showcase latest products

### 👤 User Features
- **User Authentication**: Secure registration and login system
- **Session Management**: Persistent user sessions with remember me functionality
- **Cart Persistence**: Shopping cart items saved per user
- **Order History**: Track order status and payment information

### 🎨 UI/UX Features
- **Responsive Design**: Fully responsive layout for all devices
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Modern UI**: Clean, modern interface built with Tailwind CSS 4
- **Image Optimization**: High-quality product images loaded from Unsplash CDN
- **Smooth Animations**: Interactive elements with smooth transitions

### 💳 Payment Features
- **Midtrans Integration**: Secure payment processing with Snap payment
- **Payment Expiration**: Automatic order cancellation for unpaid orders (24-hour expiry)
- **Payment Status Tracking**: Real-time payment status updates via webhooks
- **Multiple Payment Methods**: Support for various payment options through Midtrans

### 🔧 Technical Features
- **RESTful API Design**: Clean, organized route structure
- **Database Migrations**: Version-controlled database schema
- **Eloquent ORM**: Efficient database relationships and queries
- **Scheduled Tasks**: Automated order expiration checking
- **CSRF Protection**: Built-in security features
- **Asset Optimization**: Vite-powered asset bundling

## 🚀 Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: Tailwind CSS 4, Blade Templates
- **Database**: PostgreSQL (Supabase)
- **Payment Gateway**: Midtrans
- **Build Tool**: Vite
- **Image CDN**: Unsplash
- **Authentication**: Laravel Sanctum (built-in)

## 📋 Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- PostgreSQL database (or Supabase)
- Midtrans account (for payment processing)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/e-commerce.git
   cd e-commerce
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database**
   Update your `.env` file with your database credentials:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=your-host
   DB_PORT=5432
   DB_DATABASE=your-database
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   ```

6. **Configure Midtrans** (see [MIDTRANS_SETUP.md](./MIDTRANS_SETUP.md))
   ```env
   MIDTRANS_SERVER_KEY=your-server-key
   MIDTRANS_CLIENT_KEY=your-client-key
   MIDTRANS_IS_PRODUCTION=false
   ```

7. **Run migrations and seeders**
   ```bash
   php artisan migrate:fresh --seed
   ```

8. **Build assets**
   ```bash
   npm run build
   ```

9. **Start the development server**
   ```bash
   php artisan serve
   ```

   Visit `http://localhost:8000` in your browser.

## 👤 Default User

For testing purposes, a default user is created:
- **Email**: `test@example.com`
- **Password**: `password`

## 📁 Project Structure

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
│   ├── js/                   # JavaScript files
│   └── views/                # Blade templates
├── routes/
│   ├── web.php               # Web routes
│   └── console.php           # Console routes
├── public/                   # Public assets
└── Products.json             # Product data for seeding
```

## 🛣️ Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured products |
| `/category/{category}` | Category page (men, women, kids) |
| `/product/{id}` | Product details page |
| `/new-collections` | Latest products showcase |
| `/cart` | Shopping cart (authenticated) |
| `/login` | User login page |
| `/register` | User registration page |
| `/payment/{orderId}` | Payment page (authenticated) |

## 🔐 Payment Integration

This application uses Midtrans for payment processing. The integration includes:

- **Snap Payment**: Embedded payment popup
- **Webhook Handling**: Automatic payment status updates
- **Payment Expiration**: Orders expire after 24 hours if unpaid
- **Status Management**: Automatic order status updates based on payment

See [MIDTRANS_SETUP.md](./MIDTRANS_SETUP.md) for detailed setup instructions.

## 🎨 Features in Detail

### Dark Mode
The application includes a fully functional dark mode toggle that:
- Persists user preference in localStorage
- Applies to all pages and components
- Includes proper contrast and accessibility

### Image Management
- All product images are loaded from Unsplash CDN
- Automatic image optimization and resizing
- Fast loading times with CDN delivery
- High-quality images for all products

### Order Management
- Automatic order expiration (24 hours)
- Scheduled task to check expired orders
- Payment status tracking
- Order cancellation for failed payments

## 🚀 Deployment

This Laravel application can be deployed to various platforms:

- **Railway**: Great for Laravel apps with built-in PostgreSQL
- **Render**: Easy deployment with automatic SSL
- **Fly.io**: Global edge deployment
- **Traditional Hosting**: Shared hosting or VPS
- **Cloud Platforms**: AWS, Google Cloud, Azure

## 🧪 Testing

Run the test suite:
```bash
php artisan test
```

## 📝 Configuration

### Environment Variables

Key environment variables to configure:

```env
APP_NAME="E-Commerce"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ecommerce
DB_USERNAME=your_username
DB_PASSWORD=your_password

MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_IS_PRODUCTION=false
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🙏 Acknowledgments

- [Laravel](https://laravel.com) - The PHP Framework
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Midtrans](https://midtrans.com) - Payment gateway
- [Unsplash](https://unsplash.com) - Beautiful free images
- [Supabase](https://supabase.com) - Open source Firebase alternative

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

⭐ If you find this project helpful, please consider giving it a star!
