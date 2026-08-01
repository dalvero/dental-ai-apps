# Dokumentasi Fitur & Pembagian Kerja (FEATURES.md)
## Dental AI Apps

**Versi:** 1.2 (Updated - Pending AI Model Adjustment)  
**Tanggal:** 1 Agustus 2026  
**Status:** In Progress — Penyesuaian Tugas Developer 1 (Persiapan Database Model & Mobile PWA AI UI selama Model AI Pending) & Developer 2 (Mobile PWA & Admin Dashboard Portal)  

---

## 1. Status Fitur Terperinci

### 🟢 A. Fitur yang Sudah Dikerjakan (Selesai)

#### 1. Backend Core, Authentication & Database
- **Next.js Fullstack Architecture**: Menggunakan App Router, Turbopack, dan Route Handlers (`/api`).
- **Database PostgreSQL via Supabase & Prisma ORM 7**:
  - Model `User` (Role: `ADMIN`, `PARENT`).
  - Model `Child` (Nama, tanggal lahir, gender, relasi `userId`).
- **Autentikasi & Keamanan Session**:
  - Endpoint REST API: Register (`/api/auth/register`), Login (`/api/auth/login`), Logout (`/api/auth/logout`), dan Get Profile (`/api/auth/me`).
  - Password hashing dengan `bcryptjs`.
  - Token JWT verification dengan library `jose`.
  - Middleware Route Protection (`middleware.ts`) untuk memproteksi halaman `/dashboard`, `/add-child`, `/admin`, serta proteksi authorization role (`PARENT` vs `ADMIN`).
- **State Management (Zustand)**:
  - Store global (`store/useUserStore.ts`) untuk mengelola data user login, daftar anak, dan profil anak aktif secara *real-time*.

#### 2. Mobile-First Parent PWA (Frontend UI & API Auth)
- **Welcome / Splash Screen (`/`)**: Tampilan awal pengenalan aplikasi.
- **Get Started Page (`/get-started`)**: Panduan langkah awal penggunaan aplikasi.
- **Halaman Login Parent (`/login`)**: Terhubung ke API Auth & Database Supabase.
- **Halaman Register Parent (`/register`)**: Terhubung ke API Auth & Database Supabase.
- **Halaman Tambah Profil Anak (`/add-child`)**: Terhubung ke REST API `/api/children`.
- **Dashboard Parent (`/dashboard`)**:
  - *Child Selector*: Pemilih profil anak aktif yang terhubung *real-time* ke Zustand store.
  - *Hero Card*: Salam hangat dan indikator kesehatan gigi anak aktif.
  - *Feature Grid*: Navigasi cepat ke Deteksi AI, Kuis & Edukasi, Checklist Rutin, dan Riwayat.
  - *Reminder Card & Dental Visit Card*: Pengingat rutinitas harian dan jadwal periksa ke dokter gigi.
  - *Article Card & Weekly Progress*: Ringkasan materi edukasi dan progres mingguan.

#### 3. Desktop Web Admin Console (`/admin`)
- **Halaman Login Admin Dedicated (`/admin/login`)**: Tampilan desktop khusus login Admin dengan verifikasi role `ADMIN`.
- **Layout & Navigasi Admin (`AdminSidebar` & `AdminHeader`)**: Sidebar navigasi tab interaktif dan Topbar header dinamis.
- **Tab Dashboard Overview**:
  - 4 Card Ringkasan Statistik (*Total Parent, Total Anak, Total Materi, Total Artikel*) — khusus tampil di tab Overview.
  - Grafik Pertumbuhan & Widget Demografi Usia Anak (*Balita, Usia Dini, Anak*) terhubung ke REST API real-time (`/api/admin/dashboard`).
- **Tab Manajemen User (`UserManagementTable`)**: Tabel akun terdaftar dari database Supabase dengan filter role, pencarian nama/email, dan *whitespace layout protection*.
- **Tab Manajemen Edukasi (`EducationManagement`)**:
  - Filter materi (*Video vs PDF/Docs*).
  - Modal Tambah/Edit Materi Edukasi.
  - **Halaman Khusus Kelola Kuis (Dedicated Quiz Editor View)**: Halaman terpisah lengkap dengan editor pertanyaan kuis, opsi A-D, dan penanda jawaban benar.
- **Tab Manajemen Artikel (`ArticleManagementTable`)**:
  - Tabel daftar artikel edukasi gigi yang rapi (anti-overlap).
  - Modal Tambah/Edit Artikel Baru dengan status publikasi (*Terbit / Draft*).

---

### 🔴 B. Fitur yang Belum Dikerjakan (Pending / Backlog)

#### 1. Modul AI & Diagnosis (Alokasi Dev 1 - Tahap Persiapan UI & DB)
- ⏳ **Skema Database Prisma & Model AI (`Detection`)**:
  - Perancangan tabel Prisma `Detection` & `DetectionSpot` untuk menyimpan data 4 foto, hasil analisis AI, dan riwayat.
- ⏳ **Fitur Mobile PWA AI Deteksi Kerusakan Gigi (`/detection`)**:
  - Form UI pengunduhan/pengambilan 4 sudut foto gigi anak (Depan, Samping Kanan, Samping Kiri, Belakang).
  - Web Speech API (TTS) audio pembacaan hasil diagnosis & UI pemutar suara.
- ⏳ **Halaman Riwayat Scan AI & Progress Tracker (`/history`)**:
  - Histori hasil scan AI anak & grafik perkembangan kesehatan enamel gigi.
- ⏳ **Mock REST API AI Endpoint**:
  - Penyediaan endpoint mock `/api/detection/analyze` untuk memfasilitasi pengujian alur penuh tanpa tergantung model AI eksternal.

#### 2. Modul Mobile PWA & Admin Dashboard (Alokasi Dev 2)
- ⏳ **Halaman Edukasi & Kuis Interaktif Parent (`/education`)**:
  - Pembaca materi video/PDF & pengerjaan kuis interaktif harian.
- ⏳ **Fitur Checklist Rutinitas Sikat Gigi & Admin Verification**:
  - Checklist harian orang tua & antrean verifikasi foto oleh Admin.
- ⏳ **GIS Lokasi Dokter Gigi Terdekat**:
  - Integrasi Leaflet / Google Maps API berbasis GPS user.
- ⏳ **Fitur Food Recall**:
  - Pencatatan konsumsi makanan tinggi gula & kalkulator risiko karies.
- ⏳ **Halaman Profile Parent & Child Management (`/profile`)**:
  - Kelola akun parent & ubah data anak terdaftar.
- ⏳ **Streak & Gamifikasi**:
  - Perhitungan *streak* harian kebiasaan sikat gigi anak.
- ⏳ **Backend API Admin & Deployment**:
  - REST API CRUD Admin (`Education`, `Quiz`, `Article`, `Checklist`).
  - PWA Manifest, Service Worker offline, Flutter WebView testing, & Deployment server.

---

## 2. Pembagian Kerja Fitur untuk 2 Developer (Spesifik & Adaptif)

Pembagian kerja ini disesuaikan dengan kondisi di mana **Model AI eksternal dari Klien masih pending**, sehingga **Developer 1 berfokus penuh menyiapkan seluruh infrastruktur UI PWA, Skema Database Prisma, dan Mock REST API AI**.

```text
                               ┌─────────────────────────────────────────┐
                               │            DENTAL AI APPS               │
                               └────────────────────┬────────────────────┘
                                                    │
                 ┌──────────────────────────────────┴──────────────────────────────────┐
                 ▼                                                                     ▼
    ┌─────────────────────────┐                                           ┌─────────────────────────┐
    │       DEVELOPER 1       │                                           │       DEVELOPER 2       │
    │  (AI UI PWA, DB Schema, │                                           │  (Mobile PWA Parent &   │
    │   & Mock API Specialist)│                                           │ Admin Dashboard Portal) │
    └─────────────────────────┘                                           └─────────────────────────┘
```

---

### 🤖 DEVELOPER 1: AI Specialist (Persiapan Mobile PWA UI & Skema DB AI)

**Fokus Utama:** Menyiapkan **seluruh komponen UI Mobile PWA terkait AI**, **rancangan skema database Prisma untuk AI**, serta **Mock REST API AI**, sehingga saat Model AI resmi dari Klien siap, integrasi dapat dilakukan secara instan.

| No | Modul / Fitur AI | Deskripsi Detail Tugas (Persiapan AI) | Output / Target Files |
|---|---|---|---|
| 1 | **Skema Database Prisma & Model AI** | - Merancang & membuat Model Prisma `Detection` & `DetectionSpot` di `schema.prisma`.<br>- Menyiapkan tipe data TypeScript (`types/detection.ts`) untuk payload 4 foto, hasil klasifikasi risk level, spot lokasi, & audio URL.<br>- Menjalankan migration ke Supabase database. | `prisma/schema.prisma`<br>`types/detection.ts`<br>`prisma/migrations/*` |
| 2 | **UI Mobile PWA Scan 4 Sudut Foto (`/detection`)** | - Membuat antarmuka Mobile PWA untuk alur 4 foto gigi (Depan, Kanan, Kiri, Belakang).<br>- Menambahkan bingkai panduan posisi kamera (*Angle Guide*), kontrol *retake*, dan indikator progres kelengkapan foto. | `app/(main)/detection/page.tsx`<br>`features/detection/components/PhotoCaptureStep.tsx`<br>`features/detection/components/AngleGuide.tsx` |
| 3 | **UI Hasil Diagnosis AI & Audio TTS Widget** | - Membuat komponen kartu hasil diagnosis AI (Risk Level: *Rendah, Sedang, Tinggi*, rincian *White Spot/Yellow Spot*, & rekomendasi dokter gigi).<br>- Mengintegrasikan Web Speech API (Browser TTS) & UI pemutar suara narasi (*Play, Pause, Replay*). | `features/detection/components/DetectionResultCard.tsx`<br>`features/detection/components/AudioPlayerWidget.tsx`<br>`hooks/useSpeechSynthesis.ts` |
| 4 | **UI Mobile PWA Riwayat AI & Health Chart (`/history`)** | - Halaman riwayat hasil scan AI anak berbasis data dari Supabase/Mock.<br>- Grafik statistik visual tren kesehatan enamel & perkembangan spot gigi anak dari waktu ke waktu. | `app/(main)/history/page.tsx`<br>`features/history/components/DetectionHistoryList.tsx`<br>`features/history/components/DentalHealthChart.tsx` |
| 5 | **Mock REST API AI Endpoint** | - Membuat Mock Route Handler `/api/detection/analyze` & `/api/detection/history` yang mengembalikan respon AI dummy berstruktur real.<br>- Memungkinkan aplikasi berjalan & diuji penuh tanpa terhambat pending model AI dari Klien. | `app/api/detection/analyze/route.ts`<br>`app/api/detection/history/route.ts`<br>`services/detection.service.ts` |

---

### 📱💻 DEVELOPER 2: Mobile PWA App & Admin Dashboard Specialist

**Fokus Utama:** Mengembangkan seluruh fitur aplikasi **Mobile PWA (Pengguna Parent)** dan **Desktop Admin Dashboard Portal**, termasuk integrasi API CRUD backend admin, rutinitas harian, GIS, dan deployment.

| No | Modul / Fitur | Deskripsi Detail Tugas | Output / Target Files |
|---|---|---|---|
| 1 | **Modul Edukasi & Kuis (Parent & Admin)** | - **Admin:** Integrasi API DB untuk `EducationManagement.tsx` & Halaman Kelola Kuis.<br>- **Mobile Parent:** Halaman pembaca materi video/PDF & interface pengerjaan Kuis Interaktif harian. | `app/(main)/education/page.tsx`<br>`features/education/*`<br>`app/api/admin/education/route.ts` |
| 2 | **Modul Artikel Edukasi (Parent & Admin)** | - **Admin:** Integrasi API DB untuk `ArticleManagementTable.tsx`.<br>- **Mobile Parent:** Halaman daftar & pembaca artikel kesehatan gigi anak. | `features/dashboard/components/ArticleCard.tsx`<br>`app/api/admin/articles/route.ts` |
| 3 | **Modul Checklist Rutinitas & Admin Verification** | - **Mobile Parent:** Form checklist harian sikat gigi (pagi & malam) & uploader foto bukti.<br>- **Admin:** Integrasi modul `ChecklistVerificationCard.tsx` untuk verifikasi foto. | `features/checklist/*`<br>`app/api/checklist/route.ts`<br>`app/api/admin/checklist/route.ts` |
| 4 | **GIS Lokasi Dokter Gigi Terdekat** | - Integrasi Leaflet / Google Maps API di Mobile Parent PWA.<br>- Pencarian lokasi praktik dokter gigi & klinik terdekat berbasis GPS posisi user. | `features/gis/*` atau `components/gis/*`<br>`services/gis.service.ts` |
| 5 | **Food Recall Nutrisi Gigi** | - Form pencatatan konsumsi makanan harian anak (makanan/minuman tinggi gula).<br>- Kalkulator analisis tingkat risiko karies berdasarkan konsumsi gula harian. | `features/food-recall/*`<br>`services/food.service.ts` |
| 6 | **Parent Profile & Child Management (`/profile`)** | - Halaman kelola akun Parent (edit nama, email, ubah password).<br>- Halaman edit, tambah, dan hapus profil anak terdaftar. | `app/(main)/profile/page.tsx`<br>`features/profile/*` |
| 7 | **Streak Harian & Gamifikasi** | - Perhitungan *streak* harian kebiasaan sikat gigi anak berturut-turut.<br>- Tampilan badge motivasi & animasi apresiasi anak. | `features/streak/*`<br>`components/ui/StreakBadge.tsx` |
| 8 | **PWA Manifest, WebView & Deployment** | - Konfigurasi `manifest.json` & Service Worker PWA offline.<br>- Pengujian aplikasi di dalam WebView Flutter.<br>- Setup deployment server (VPS / Vercel). | `public/manifest.json`<br>`public/sw.js` |

---

### 🔄 Catatan Strategi Pengerjaan:
1. **Zero-Blocking Architecture:** Dengan pembuatan Mock REST API AI & Prisma DB Schema oleh Developer 1, tidak ada fitur yang tertunda (*blocked*) meskipun Model AI eksternal belum diserahkan oleh Klien.
2. **Siap Diintegrasikan Kapan Saja:** Saat API Model AI Klien sudah siap, Developer 1 hanya perlu mengganti logika internal di `services/detection.service.ts` dan `app/api/detection/analyze/route.ts` tanpa perlu merombak UI PWA maupun skema DB.
