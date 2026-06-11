# Stage 1: Build Frontend Assets
FROM node:20 AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Install PHP Dependencies
FROM composer:latest AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --ignore-platform-reqs --no-scripts

# Stage 3: Production PHP-FPM Image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Set working directory
WORKDIR /var/www

# Copy application files (we don't need to copy node_modules if they exist locally, but COPY . copies everything except .dockerignore)
COPY . /var/www

# Overwrite with clean vendor folder from composer stage
COPY --from=vendor /app/vendor /var/www/vendor

# Copy built frontend assets from frontend stage
COPY --from=frontend /app/public/build /var/www/public/build

# Clean up host dev folders and development caches that might cause errors
RUN rm -rf /var/www/node_modules \
    && rm -f /var/www/bootstrap/cache/*.php \
    && rm -f /var/www/public/hot

# Set appropriate permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage \
    && chmod -R 775 /var/www/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
