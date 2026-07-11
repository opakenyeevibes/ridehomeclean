# Ride Home Care

Platform layanan care panggilan berbahasa Indonesia. Ride Home Care menghadirkan home care, outdoor care, auto care, office care, dan premium care langsung ke lokasi pelanggan.

Tagline: **Home care datang ke lokasi kamu.**

## Menjalankan lokal

```bash
npm install
npm run dev
```

Atau dengan pnpm:

```bash
pnpm install
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000).

Jika port 3000 sedang dipakai, Next.js biasanya menawarkan port berikutnya, misalnya [http://localhost:3001](http://localhost:3001) atau [http://localhost:3002](http://localhost:3002).

## Auth dan role

Production foundation sudah tersedia melalui Supabase Postgres + Prisma:

- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/auth/me`

Default admin dari seed:

```text
email: admin@ridehomecare.local
password: Admin12345!
```

## Mengaktifkan role mock lokal

Quick role berbasis `localStorage` masih tersedia sebagai fallback demo lokal saat database tidak aktif. Production login memakai user dari Supabase Postgres melalui Prisma.

1. Buka `/login`.
2. Pilih salah satu role:
   - Customer/User → masuk ke `/`
   - Admin → masuk ke `/admin`
   - Worker → masuk ke `/worker`
3. Klik tombol logout di profil/settings untuk memilih role lain.

Kalau ingin reset manual dari browser console:

```js
localStorage.removeItem("selectedRole")
location.href = "/login"
```

## Rute utama

- `/` — dashboard pelanggan
- `/login` — pilih role Customer, Admin, atau Worker
- `/services` — katalog layanan
- `/services/home-cleaning` — detail layanan
- `/booking/home-cleaning` — booking enam langkah
- `/orders` dan `/orders/ORD-001` — daftar serta tracking
- `/profile` — profil pelanggan
- `/promos`, `/help`, `/profile/addresses`, `/profile/payments` — halaman pendukung customer
- `/admin` — dashboard operasional
- `/admin/orders` — status pesanan yang dapat diubah lokal
- `/admin/content` — pusat pengelolaan konten
- `/admin/content/banners` — Banner Management untuk homepage
- `/admin/content/banners/new` — membuat banner baru
- `/admin/content/banners/BNR-001` — contoh halaman edit banner
- `/admin/customers`, `/admin/workers`, `/admin/services`, `/admin/packages`, `/admin/promos`, `/admin/payments`, `/admin/reports`, `/admin/settings` — modul admin mock
- `/worker` — dashboard worker
- `/worker/jobs`, `/worker/jobs/ORD-001`, `/worker/schedule`, `/worker/earnings`, `/worker/profile` — modul worker
- `/partner` dan `/partner/jobs` — redirect legacy ke route worker

## Database Supabase Postgres production

Project ini disiapkan untuk Hostinger Business Managed Node.js Web Apps + Supabase Postgres menggunakan Prisma ORM.

File penting:

- `prisma/schema.prisma` — schema database PostgreSQL/Supabase.
- `prisma/migrations/0001_init/migration.sql` — migration lama MySQL, jangan dipakai untuk Supabase. Untuk MVP gunakan `db:push`.
- `prisma/seed.ts` — seed admin, customer, worker, layanan, paket, add-ons, banners, promos, sample order.
- `.env.example` — contoh environment variable production.

Script database:

```bash
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:seed
```

Untuk development cepat tanpa migration history, gunakan:

```bash
npm run db:push
npm run db:seed
```

Untuk production MVP Supabase gunakan:

```bash
npm run db:push
npm run db:seed
```

Catatan: `db:migrate` sementara diarahkan ke `prisma db push` sampai migration PostgreSQL final dibuat.

## API production

API utama yang sudah tersedia:

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- Services: `GET /api/services`, `GET /api/services/[id]`
- Admin services: `GET/POST /api/admin/services`, `PUT/DELETE /api/admin/services/[id]`
- Packages: `GET /api/services/[id]/packages`, `POST /api/admin/packages`, `PUT/DELETE /api/admin/packages/[id]`
- Orders: `GET/POST /api/orders`, `GET /api/orders/[id]`, `PUT /api/orders/[id]/status`
- Admin order assignment: `PUT /api/admin/orders/[id]/assign-worker`
- Workers: `GET /api/admin/workers`, `GET /api/worker/jobs`, worker accept/reject/status endpoints
- Banners: `GET /api/banners/active`, `GET/POST /api/admin/banners`, `PUT/DELETE /api/admin/banners/[id]`
- Uploads: `POST /api/admin/uploads/banner`, `POST /api/admin/uploads/service`, `POST /api/users/avatar`
- Promos: `GET /api/promos`, `GET/POST /api/admin/promos`, `PUT/DELETE /api/admin/promos/[id]`

Admin/worker/customer API routes punya server-side role checks.

## Upload Hostinger

Upload file disimpan ke:

```text
public/uploads
```

Banner upload:

```text
public/uploads/banners
```

Service upload:

```text
public/uploads/services
```

Avatar upload:

```text
public/uploads/avatars
```

Format yang didukung:

- PNG/JPG/JPEG/WEBP maksimal 5 MB.
- SVG maksimal 2 MB dengan validasi sederhana untuk menolak script berbahaya.

## Deploying Ride Home Care to Hostinger Business with Supabase

1. Buat project Supabase.
2. Ambil pooled connection string dan direct connection string dari Supabase Database settings.
3. Tambahkan environment variables di Hostinger Node.js app:

```env
NEXT_PUBLIC_APP_NAME="Ride Home Care"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_xxx"
DATABASE_URL="postgresql://postgres.PROJECT_REF:DB_PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.PROJECT_REF:DB_PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres"
UPLOAD_DIR="public/uploads"
NEXT_PUBLIC_UPLOAD_URL="/uploads"
AUTH_SECRET="isi-secret-panjang-random"
```

4. Deploy project sebagai Hostinger Managed Node.js Web App.
5. Install command:

```bash
npm install
```

6. Build command:

```bash
npm run build
```

7. Start command:

```bash
npm run start
```

8. Sinkronkan schema Supabase:

```bash
npm run db:push
```

9. Jalankan seed:

```bash
npm run db:seed
```

10. Cek app logs di Hostinger.
11. Restart app setelah mengubah environment variables.

## Struktur data lama

Data mock masih ada di `src/data` sebagai fallback UI/demo lokal. Production flow utama sekarang mencoba API Prisma + Supabase lebih dulu, lalu fallback prototype jika database/session belum tersedia.

## Banner Management

Admin dapat mengelola promo banner homepage dari `/admin/content/banners`.

Fitur yang tersedia:

- Main banner dan side banner.
- Template mode untuk banner cepat tanpa upload gambar.
- Image mode untuk upload banner lokal berbasis data URL.
- Preview desktop/mobile.
- Active/nonactive toggle.
- Sort order, tanggal mulai, dan tanggal selesai.
- Duplicate, edit, dan delete.
- Homepage otomatis mengambil banner aktif dari `localStorage`.

Storage mock memakai key `ride-n-care-banners`. Kalau data banner ingin di-reset:

```js
localStorage.removeItem("ride-n-care-banners")
location.reload()
```

Catatan: UI admin banner lama masih mendukung preview lokal, sementara API production sudah menyediakan upload file server ke `public/uploads/banners` dan field URL di Supabase Postgres.
