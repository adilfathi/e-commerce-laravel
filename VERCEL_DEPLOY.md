# 🚀 Panduan Deploy ke Vercel

Panduan lengkap untuk deploy aplikasi Laravel E-Commerce ke Vercel.

## ⚠️ Catatan Penting

Vercel mendukung PHP, namun Laravel memerlukan beberapa konfigurasi khusus. Pastikan Anda memahami batasan berikut:

- **Database**: Vercel tidak menyediakan database. Anda perlu menggunakan database eksternal (Supabase, PlanetScale, dll)
- **Storage**: File storage harus menggunakan service eksternal (S3, Cloudinary, dll)
- **Queue & Scheduled Tasks**: Tidak didukung secara native di Vercel
- **Session**: Gunakan database atau Redis untuk session storage

## 📋 Prerequisites

1. Akun Vercel (gratis di [vercel.com](https://vercel.com))
2. Database PostgreSQL (disarankan Supabase)
3. Akun Midtrans untuk payment gateway
4. Git repository (GitHub, GitLab, atau Bitbucket)

## 🔧 Setup Database

Karena Vercel tidak menyediakan database, gunakan Supabase atau PostgreSQL eksternal:

### Menggunakan Supabase

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Salin connection string dari Settings > Database
4. Format connection string:
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
   ```

## 📝 Langkah-langkah Deploy

### 1. Persiapan Repository

Pastikan semua file sudah di-commit ke Git:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Install Vercel CLI (Opsional)

```bash
npm i -g vercel
```

### 3. Deploy via Vercel Dashboard

1. **Login ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan GitHub/GitLab/Bitbucket

2. **Import Project**
   - Klik "Add New Project"
   - Pilih repository Anda
   - Vercel akan otomatis mendeteksi konfigurasi

3. **Configure Project Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root project)
   - **Build Command**: 
     ```bash
     composer install --no-dev --optimize-autoloader && npm install && npm run build
     ```
   - **Output Directory**: `public`
   - **Install Command**: 
     ```bash
     composer install --no-dev --optimize-autoloader && npm install
     ```

### 4. Environment Variables

Tambahkan environment variables berikut di Vercel Dashboard (Settings > Environment Variables):

#### Database Configuration
```
DB_CONNECTION=pgsql
DB_HOST=your-supabase-host.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-password
```

#### Application Configuration
```
APP_NAME="E-Commerce"
APP_ENV=production
APP_KEY=your-generated-app-key
APP_DEBUG=false
APP_URL=https://your-project.vercel.app
```

#### Midtrans Configuration
```
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key
MIDTRANS_IS_PRODUCTION=true
MIDTRANS_IS_SANITIZED=true
MIDTRANS_IS_3DS=true
```

#### Session Configuration (Opsional)
```
SESSION_DRIVER=database
SESSION_LIFETIME=120
```

#### Cache Configuration
```
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

### 5. Generate APP_KEY

Sebelum deploy, generate APP_KEY:

```bash
php artisan key:generate --show
```

Salin hasilnya dan tambahkan sebagai `APP_KEY` di Vercel environment variables.

### 6. Run Migrations

Setelah deploy pertama, jalankan migrations via Vercel CLI atau buat script:

```bash
vercel env pull .env.production
php artisan migrate --force
```

Atau gunakan Vercel Functions untuk menjalankan migrations.

### 7. Seed Database (Opsional)

Jika perlu seed data:

```bash
php artisan db:seed --force
```

## 🔄 Deploy via CLI

Alternatif menggunakan Vercel CLI:

```bash
# Login ke Vercel
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

## 🛠️ Post-Deployment Setup

### 1. Run Migrations

Setelah deploy pertama, jalankan migrations. Anda bisa:

**Opsi A: Via Vercel CLI**
```bash
vercel env pull .env.production
php artisan migrate --force
```

**Opsi B: Via Vercel Function**
Buat file `api/migrate.php` (lihat contoh di bawah)

### 2. Seed Database

```bash
php artisan db:seed --force
```

### 3. Setup Storage Link

Jika menggunakan local storage, buat symlink:

```bash
php artisan storage:link
```

**Catatan**: Untuk production, gunakan cloud storage (S3, Cloudinary) daripada local storage.

## 📁 File Konfigurasi

### vercel.json
File ini sudah dibuat dan mengkonfigurasi:
- PHP runtime (8.2)
- Routing untuk Laravel
- Static asset handling

### .vercelignore
File ini mengabaikan file yang tidak perlu di-deploy:
- node_modules
- vendor (akan di-install saat build)
- Environment files
- Development files

## 🔍 Troubleshooting

### Error: "Class not found"
- Pastikan `composer install` dijalankan dengan `--optimize-autoloader`
- Pastikan `vendor/` tidak di-ignore

### Error: "Database connection failed"
- Periksa environment variables di Vercel
- Pastikan database accessible dari internet
- Periksa firewall settings di Supabase

### Error: "Storage not writable"
- Gunakan cloud storage (S3, Cloudinary) untuk production
- Atau setup storage link dengan benar

### Error: "Route not found"
- Pastikan `vercel.json` routing sudah benar
- Periksa `APP_URL` environment variable

### Error: "Session driver not supported"
- Gunakan `database` atau `redis` untuk session driver
- Jangan gunakan `file` session driver di Vercel

## 🚨 Batasan Vercel untuk Laravel

1. **No Persistent Storage**: File yang ditulis ke disk akan hilang setelah deployment
2. **No Background Jobs**: Queue workers tidak bisa berjalan
3. **No Scheduled Tasks**: Cron jobs tidak didukung
4. **Cold Starts**: Function mungkin lambat pada request pertama
5. **Memory Limits**: Function memiliki batas memory

## 💡 Rekomendasi untuk Production

1. **Database**: Gunakan Supabase atau managed PostgreSQL
2. **Storage**: Gunakan S3 atau Cloudinary untuk file uploads
3. **Cache**: Gunakan Redis (Upstash) untuk caching
4. **Queue**: Gunakan Laravel Horizon dengan Redis
5. **Scheduled Tasks**: Gunakan external cron service (EasyCron, cron-job.org)
6. **CDN**: Vercel sudah menyediakan CDN untuk static assets

## 🔐 Security Checklist

- [ ] `APP_DEBUG=false` di production
- [ ] `APP_ENV=production`
- [ ] Semua environment variables sudah di-set
- [ ] Database credentials aman
- [ ] Midtrans keys sudah di-set
- [ ] HTTPS enabled (otomatis di Vercel)
- [ ] CSRF protection enabled (default Laravel)

## 📚 Resources

- [Vercel PHP Documentation](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/php)
- [Laravel Deployment Guide](https://laravel.com/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)

## 🆘 Support

Jika mengalami masalah:
1. Periksa Vercel Function Logs
2. Periksa Laravel logs (jika menggunakan external logging)
3. Periksa environment variables
4. Pastikan semua dependencies ter-install

---

**Catatan**: Untuk aplikasi Laravel yang lebih kompleks, pertimbangkan menggunakan platform seperti Railway, Render, atau Fly.io yang lebih cocok untuk Laravel applications.

