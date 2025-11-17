# ⚡ Quick Deploy Guide - Vercel

Panduan cepat untuk deploy ke Vercel dalam 5 menit.

## 🚀 Langkah Cepat

### 1. Push ke Git
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy via Vercel Dashboard

1. Buka [vercel.com](https://vercel.com) dan login
2. Klik **"Add New Project"**
3. Pilih repository Anda
4. Vercel akan auto-detect konfigurasi dari `vercel.json`

### 3. Set Environment Variables

Di Vercel Dashboard → Settings → Environment Variables, tambahkan:

#### Database (Supabase)
```
DB_CONNECTION=pgsql
DB_HOST=xxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your-password
```

#### App Config
```
APP_NAME="E-Commerce"
APP_ENV=production
APP_KEY=base64:xxxxx  # Generate dengan: php artisan key:generate --show
APP_DEBUG=false
APP_URL=https://your-project.vercel.app
```

#### Midtrans
```
MIDTRANS_SERVER_KEY=your-server-key
MIDTRANS_CLIENT_KEY=your-client-key
MIDTRANS_IS_PRODUCTION=true
```

#### Session & Cache
```
SESSION_DRIVER=database
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

### 4. Deploy!

Klik **"Deploy"** dan tunggu build selesai.

### 5. Run Migrations

Setelah deploy pertama, jalankan migrations:

**Via Vercel CLI:**
```bash
vercel env pull .env.production
php artisan migrate --force
```

**Atau via API endpoint** (jika sudah setup):
```bash
curl -X POST https://your-project.vercel.app/api/migrate?token=YOUR_AUTH_TOKEN
```

### 6. Seed Database (Opsional)
```bash
php artisan db:seed --force
```

## ✅ Checklist Sebelum Deploy

- [ ] Semua environment variables sudah di-set
- [ ] Database sudah dibuat dan accessible
- [ ] `APP_KEY` sudah di-generate
- [ ] Midtrans credentials sudah valid
- [ ] Code sudah di-push ke Git

## 🔗 Links Penting

- **Full Guide**: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)
- **Midtrans Setup**: [MIDTRANS_SETUP.md](./MIDTRANS_SETUP.md)

## 🆘 Troubleshooting

**Build Error?**
- Periksa build logs di Vercel dashboard
- Pastikan semua dependencies ter-install

**Database Error?**
- Periksa connection string
- Pastikan database accessible dari internet
- Periksa firewall settings

**Route 404?**
- Pastikan `vercel.json` routing sudah benar
- Periksa `APP_URL` environment variable

---

**Selamat!** 🎉 Aplikasi Anda sudah live di Vercel!

