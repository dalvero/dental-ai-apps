# Product Requirements Document (PRD)
## Dental AI Apps

**Versi:** 0.2 (Updated)  
**Tanggal:** 29 Juli 2026  
**Status:** In Progress — Diperbarui berdasarkan progress pembuatan Dashboard Admin & Integrasi User/Child Store  

---

## 1. Ringkasan Produk

**Dental AI** adalah Progressive Web App (PWA) untuk **deteksi dini kerusakan gigi anak berbasis AI**, ditujukan untuk membantu orang tua mengenali tanda-tanda awal kerusakan gigi sebelum berkembang menjadi masalah yang lebih serius.

**Arsitektur produk:**
- Dibangun full-stack dengan Next.js (App Router, Route Handler sebagai API).
- Bersifat PWA agar bisa **dibungkus di dalam aplikasi Flutter lewat WebView**.
- Tujuan strategis pendekatan ini: klien cukup update lewat web, tanpa perlu update ulang aplikasi native atau submit ulang ke Play Store.
- Model AI deteksi gigi dikembangkan secara terpisah oleh tim lain (di luar scope development aplikasi ini), akan diintegrasikan lewat API.
- Menyediakan interface khusus **Desktop Web untuk Panel Admin (`/admin`)** dan interface **Mobile-first PWA untuk Parent (`/dashboard`)**.

---

## 2. Latar Belakang & Masalah yang Diselesaikan

Berdasarkan catatan meeting:

- Orang tua cenderung **menunda pemeriksaan gigi anak ke dokter gigi**.
- Akar masalahnya bukan soal akses, tapi **persepsi** — kerusakan gigi awal (white spot/yellow spot, gigi berlubang tahap awal) dianggap remeh dan wajar terjadi pada anak-anak.
- Maka fokus produk **bukan cuma akurasi deteksi AI**, tapi **mendorong perubahan perilaku orang tua** agar lebih perhatian dan mau memeriksakan anak ke dokter gigi sejak tanda-tanda awal muncul.
- Sensitivitas AI ditargetkan cukup di level **~70%** — bukan prioritas utama produk. Yang jadi prioritas adalah bagaimana hasil deteksi ini berhasil **mendorong tindakan nyata** dari orang tua.

---

## 3. Target Pengguna

| Role | Deskripsi | Status Implementasi |
|---|---|---|
| **Parent** | Orang tua yang login, menambahkan profil anak, melakukan deteksi AI, mengakses edukasi & checklist harian | ✅ UI Login, Add Child, & Dashboard Parent terhubung ke API profil user/anak (`/api/auth/me` & `/api/children`) via Prisma PostgreSQL (Supabase) |
| **Admin** | Mengelola sistem, memantau user/anak, verifikasi **checklist gigi**, dan mengelola konten edukasi | ✅ UI Dashboard Admin (`/admin`) & Halaman Login Admin khusus (`/admin/login`) telah dibuat (Desktop Web Layout, Light Theme PWA) |

---

## 4. Fitur Utama (Core Scope)

Urutan prioritas sesuai catatan **"Yang Harus Dikerjain"**:

### 4.1 Fitur AI — Deteksi Kerusakan Gigi
- Deteksi **tahap sangat awal**: bukan gigi berlubang biasa, tapi identifikasi **spot-spot kecil** seperti *white spot* atau *yellow spot* pada permukaan gigi.
- **Alur pengambilan foto** (4 sudut foto per pemeriksaan):
  1. Foto bagian depan gigi
  2. Foto sisi samping kanan pinggir gigi depan
  3. Foto sisi samping kiri pinggir gigi depan
  4. Foto bagian belakang gigi
- Target sensitivitas model **~70%** (cukup, bukan prioritas maksimal).
- **Fitur suara untuk hasil interpretasi AI** (seperti Google Translate — hasil dibacakan) — keputusan pemilihan API TTS berbayar vs model lokal tergantung budget.
- Model AI dikembangkan tim terpisah, diintegrasikan lewat API.

### 4.2 Fitur Edukasi
- Konten edukasi **dipersonalisasi** berdasarkan profil anak/hasil deteksi.
- Setiap akhir materi edukasi ada **quiz**.
- Diakses harian oleh orang tua.

### 4.3 Fitur Checklist Gigi (Checklist Harian)
- Orang tua mengakses checklist rutinitas gigi anak **setiap hari**.
- Ada **notifikasi pengingat**.
- **Verifikasi checklist** melalui konfirmasi Admin (modul antrean verifikasi sudah tersedia di Admin Panel UI).
- **Integrasi GIS** untuk membantu orang tua menemukan **praktik dokter gigi terdekat**.

### 4.4 Fitur Food Recall
- Mencatat makanan yang dikonsumsi anak **per hari** (melihat pola konsumsi makanan tinggi gula).
- Menggunakan API eksternal yang tersedia.

### 4.5 Dashboard Admin
- ✅ **Selesai secara Frontend / UI Layout (Desktop Web Layout)**:
  - Admin Sidebar Navigasi (`AdminSidebar.tsx`)
  - Admin Topbar Header (`AdminHeader.tsx`)
  - Admin Stat Grid / Ringkasan Metrik (`AdminStatGrid.tsx`)
  - User & Child Management Table (`UserManagementTable.tsx`)
  - Modul Antrean Verifikasi Checklist (`ChecklistVerificationCard.tsx`)
  - Tabel Riwayat Scan AI Terbaru (`RecentDetectionsTable.tsx`)
  - Halaman Login Dedicated Admin (`/admin/login` & `AdminLoginPage.tsx`)

---

## 5. Prinsip Desain Produk

- **Behavior-first, bukan accuracy-first** — akurasi AI cukup "baik", tapi keberhasilan produk diukur dari **perubahan perilaku orang tua** dalam memeriksakan anak ke dokter gigi.
- Edukasi dan checklist dirancang untuk membangun **kebiasaan harian** (habit-forming).
- Deteksi AI berfungsi sebagai **pemicu (trigger) kesadaran**, bukan sebagai diagnosis medis final.
- **Dual-Platform Responsive Design**: Mobile-First PWA untuk Parent (`/dashboard`) dan Desktop Website Portal untuk Admin (`/admin`).

---

## 6. Tech Stack

| Layer | Teknologi |
|---|---|
| Runtime | Node.js 22 LTS |
| Frontend Framework | Next.js 15.3.5 (App Router, Turbopack) |
| UI & Icons | React 19, Tailwind CSS v4, Lucide React |
| Form & Validasi | react-hook-form + zod + @hookform/resolvers |
| State Management | Zustand (`store/useUserStore.ts`) |
| HTTP Client | Axios |
| Notifikasi UI | Sonner (toast) |
| Styling Util | clsx, tailwind-merge, class-variance-authority (CVA) |
| ORM | Prisma 7 (`@prisma/adapter-pg`) |
| Database | PostgreSQL, hosted di Supabase (koneksi via Session Pooler) |
| Auth & Protection | JWT (`jose`), bcryptjs, Custom Middleware (`middleware.ts`) |
| Bahasa | TypeScript |
| Target Deployment | PWA → dibungkus Flutter WebView; rencana deploy ke VPS |

---

## 7. Struktur Folder Project

```text
dental-ai-apps/
│
├── app/
│   ├── (auth)/
│   │    ├── forgot-password
│   │    ├── login
│   │    └── register
│   ├── (main)/
│   │    ├── dashboard
│   │    ├── detection
│   │    ├── education
│   │    │    └── page.tsx
│   │    ├── history
│   │    ├── profile
│   │    └── layout.tsx
│   ├── (onboarding)/
│   │    ├── add-child
│   │    └── get-started
│   ├── admin/
│   │    ├── login/
│   │    │    └── page.tsx
│   │    ├── layout.tsx
│   │    └── page.tsx
│   ├── api/
│   │    ├── admin/
│   │    │    ├── articles/
│   │    │    │    ├── [id]/route.ts
│   │    │    │    └── route.ts
│   │    │    └── education/
│   │    │         ├── [id]/route.ts
│   │    │         └── route.ts
│   │    ├── articles/
│   │    │    └── route.ts
│   │    ├── auth/
│   │    │    ├── login/route.ts
│   │    │    ├── register/route.ts
│   │    │    └── me/route.ts
│   │    ├── children/
│   │    │    ├── [id]/route.ts
│   │    │    └── route.ts
│   │    └── education/
│   │         └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── layout/
│   │    ├── app-header.tsx
│   │    └── bot-navbar.tsx
│   └── ui/
│
├── docs/
│   ├── FEATURES.md
│   ├── PRD.md
│   ├── PROGRESS_LOG.md
│   └── SETUP.md
│
├── features/
│   ├── (onboarding)/
│   ├── admin/
│   │    ├── components/
│   │    │    ├── AdminHeader.tsx
│   │    │    ├── AdminOverviewAnalytics.tsx
│   │    │    ├── AdminSidebar.tsx
│   │    │    ├── AdminStatGrid.tsx
│   │    │    ├── ArticleManagementTable.tsx
│   │    │    ├── ChecklistVerificationCard.tsx
│   │    │    ├── EducationManagement.tsx
│   │    │    ├── EducationQuizEditor.tsx
│   │    │    ├── RecentDetectionsTable.tsx
│   │    │    └── UserManagementTable.tsx
│   │    ├── login/
│   │    │    └── AdminLoginPage.tsx
│   │    └── AdminDashboardPage.tsx
│   ├── auth/
│   ├── checklist/
│   ├── dashboard/
│   │    ├── components/
│   │    │    ├── ChildSelector.tsx
│   │    │    ├── DentalVisitCard.tsx
│   │    │    ├── EducationCard.tsx
│   │    │    ├── FeatureGrid.tsx
│   │    │    ├── HeroCard.tsx
│   │    │    ├── ReminderCard.tsx
│   │    │    └── WeeklyProgress.tsx
│   │    └── DashboardPage.tsx
│   ├── detection/
│   ├── education/
│   │    ├── components/
│   │    │    └── InteractiveQuizModal.tsx
│   │    └── EducationPage.tsx
│   ├── history/
│   ├── profile/
│   ├── streak/
│   └── welcome/
│
├── hooks/
│
├── lib/
│   ├── auth.ts
│   └── prisma.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   ├── icons/
│   ├── images/
│   │    ├── boy_gender.png
│   │    └── girl_gender.png
│   └── illustrations/
│
├── services/
│   ├── admin/
│   │    ├── article.service.ts
│   │    └── education.service.ts
│   ├── auth/
│   │    ├── auth.service.ts
│   │    ├── login.service.ts
│   │    └── register.service.ts
│   ├── child/
│   │    └── child.service.ts
│   └── education.service.ts
│
├── store/
│   └── useUserStore.ts
│
├── types/
│   ├── api.ts
│   ├── child.ts
│   ├── education.ts
│   ├── index.ts
│   ├── quiz.ts
│   └── user.ts
│
├── middleware.ts
├── next.config.ts
├── package.json
```

**Fungsi folder:**

| Folder | Fungsi |
|---|---|
| `app/` | Routing utama aplikasi (App Router Next.js). |
| `app/admin/` | Routing khusus Halaman Panel & Login Admin Desktop Web. |
| `app/api/` | REST API via Route Handler Next.js (`/api/auth/me`, `/api/children`, dll). |
| `components/` | Komponen UI reusable. |
| `features/` | Kode dikelompokkan per modul bisnis (`features/admin`, `features/dashboard`). |
| `features/admin/` | Komponen modular tampilan Admin Desktop Website. |
| `hooks/` | Custom React Hooks. |
| `lib/` | Konfigurasi library internal (`auth.ts` JWT, `prisma.ts`). |
| `services/` | Layer komunikasi ke REST API (Axios client). |
| `store/` | Global state management berbasis Zustand (`useUserStore.ts`). |
| `types/` | Interface & TypeScript types definition. |
| `public/` | Asset statis (gambar avatar `boy_gender.png`/`girl_gender.png`, icon, ilustrasi). |
| `docs/` | Dokumentasi project (`PRD.md`, `PROGRESS_LOG.md`, `SETUP.md`). |
| `prisma/` | Schema database Prisma & konfigurasi ORM. |
| `middleware.ts` | Auth & authorization middleware (Route protection & role checks). |

---

## 8. Data Model (Database — Prisma Schema)

```prisma
enum Role {
  ADMIN
  PARENT
}

enum Gender {
  MALE
  FEMALE
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(PARENT)
  children  Child[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Child {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name      String
  birthDate DateTime
  gender    Gender
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
}
```

---

## 9. Roadmap & Status Saat Ini

| Fitur | Frontend/UI | Backend/API | Database |
|---|---|---|---|
| Welcome/Splash Screen | ✅ | – | – |
| Get Started | ✅ | – | – |
| Login Parent (`/login`) | ✅ | ✅ Terhubung DB | ✅ Terhubung Supabase |
| Register Parent (`/register`) | ✅ | ✅ Terhubung DB | ✅ Terhubung Supabase |
| Add Child (`/add-child`) | ✅ | ✅ Terhubung DB | ✅ Terhubung Supabase |
| Dashboard Parent (`/dashboard`) | ✅ (Child Selector & User Greeting) | ✅ Terhubung `/api/auth/me` | ✅ Terhubung Supabase |
| Halaman Admin Login (`/admin/login`) | ✅ Web Desktop Light | ✅ Terhubung Auth API | ✅ Verifikasi `Role.ADMIN` |
| Dashboard Admin (`/admin`) | ✅ Web Desktop Layout | ❌ Pending Next Phase | ✅ Schema `Role.ADMIN` ada |
| Fitur AI Deteksi | ❌ | ❌ | ❌ |
| Fitur Edukasi | ❌ | ❌ | ❌ |
| Fitur Checklist Gigi | ❌ | ❌ | ❌ |
| Fitur Food Recall | ❌ | ❌ | ❌ |

**Roadmap Teknis:**
- ✅ Setup Project & Struktur Folder
- ✅ Install Supporting Library
- ✅ Database (Prisma + PostgreSQL / Supabase)
- ✅ Authentication (JWT + Session Cookie + Middleware Route Protection)
- ✅ REST API (`/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/children`)
- ✅ Integrasi Data Parent & Anak di Dashboard Parent (`useUserStore.ts` & `ChildSelector.tsx`)
- ✅ Admin Panel UI & Admin Login Page (Desktop Web Layout, Light PWA Theme)
- ⏳ Integrasi Backend Admin Dashboard ke DB
- ⏳ Progressive Web App (PWA)
- ⏳ AI Integration
- ⏳ Flutter WebView Integration
- ⏳ Deployment ke VPS