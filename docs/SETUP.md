# Dental AI Apps

> Progressive Web Application (PWA) untuk deteksi dini karies gigi menggunakan Artificial Intelligence.

---

# Setup Documentation

**Tanggal Setup :** 16 Juli 2026  
**Terakhir Diperbarui :** 29 Juli 2026  

Dokumentasi ini menjelaskan proses setup awal project, struktur folder terbaru, serta library yang digunakan selama proses pengembangan.

---

# Technology Stack

| Teknologi | Versi / Detail |
|------------|--------|
| Node.js | 22 LTS |
| Next.js | 15.3.5 (App Router & Route Handler) |
| React | 19 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Prisma ORM | 7.x (`@prisma/adapter-pg`) |
| Database | PostgreSQL (Hosted di Supabase via Session Pooler) |
| Authentication | JWT (`jose`), `bcryptjs`, HttpOnly Cookies |
| State Management | Zustand (`store/useUserStore.ts`) |

---

# Project Structure

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
│   │    ├── auth/
│   │    │    ├── login/route.ts
│   │    │    ├── register/route.ts
│   │    │    └── me/route.ts
│   │    └── children/
│   │         ├── [id]/route.ts
│   │         └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── layout/
│   │    └── app-header.tsx
│   └── ui/
│
├── docs/
│   ├── PRD.md
│   ├── PROGRESS_LOG.md
│   └── SETUP.md
│
├── features/
│   ├── (onboarding)/
│   ├── admin/
│   │    ├── components/
│   │    │    ├── AdminHeader.tsx
│   │    │    ├── AdminSidebar.tsx
│   │    │    ├── AdminStatGrid.tsx
│   │    │    ├── ChecklistVerificationCard.tsx
│   │    │    ├── RecentDetectionsTable.tsx
│   │    │    └── UserManagementTable.tsx
│   │    ├── login/
│   │    │    └── AdminLoginPage.tsx
│   │    └── AdminDashboardPage.tsx
│   ├── auth/
│   ├── checklist/
│   ├── dashboard/
│   │    ├── components/
│   │    │    ├── ArticleCard.tsx
│   │    │    ├── ChildSelector.tsx
│   │    │    ├── DentalVisitCard.tsx
│   │    │    ├── FeatureGrid.tsx
│   │    │    ├── HeroCard.tsx
│   │    │    ├── ReminderCard.tsx
│   │    │    └── WeeklyProgress.tsx
│   │    └── DashboardPage.tsx
│   ├── detection/
│   ├── education/
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
│   └── schema.prisma
│
├── public/
│   ├── icons/
│   ├── images/
│   │    ├── boy_gender.png
│   │    └── girl_gender.png
│   └── illustrations/
│
├── services/
│   ├── auth/
│   │    ├── auth.service.ts
│   │    ├── login.service.ts
│   │    └── register.service.ts
│   └── child/
│        └── child.service.ts
│
├── store/
│   └── useUserStore.ts
│
├── styles/
│
├── types/
│   ├── api.ts
│   ├── child.ts
│   ├── index.ts
│   └── user.ts
│
├── utils/
│
├── middleware.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

# Deskripsi Struktur Folder

| Folder | Fungsi |
|----------|---------|
| **app/** | Routing utama aplikasi menggunakan App Router Next.js. |
| **app/admin/** | Routing khusus Panel Dashboard & Login Admin (Desktop Web Layout). |
| **app/api/** | REST API menggunakan Route Handler Next.js (`/api/auth/login`, `/api/auth/me`, `/api/children`). |
| **components/** | Komponen UI reusable (`components/ui`, `components/layout`). |
| **features/** | Mengelompokkan kode berdasarkan fitur bisnis (`features/admin`, `features/dashboard`, `features/auth`). |
| **features/admin/** | Modul komponen visual untuk Dashboard Admin (Sidebar, Header, Stat Grid, Tables). |
| **hooks/** | Custom React Hooks. |
| **lib/** | Helper internal (`auth.ts` JWT signer/verifier, `prisma.ts` instance). |
| **services/** | Layer komunikasi dengan REST API menggunakan Axios. |
| **store/** | Global State Management menggunakan Zustand (`store/useUserStore.ts`). |
| **types/** | Interface dan type TypeScript (`user.ts`, `child.ts`, `api.ts`). |
| **public/** | Asset statis (icon, ilustrasi, avatar gender `boy_gender.png` & `girl_gender.png`). |
| **docs/** | Dokumentasi project (`PRD.md`, `PROGRESS_LOG.md`, `SETUP.md`). |
| **prisma/** | Schema database menggunakan Prisma ORM. |
| **middleware.ts** | Middleware untuk Authentication, Authorization & Route Protection. |

---

# Supporting Libraries

| Library | Fungsi | Alasan Digunakan |
|----------|---------|------------------|
| **axios** | HTTP Client | Komunikasi antara Frontend dengan REST API. |
| **zustand** | State Management | Menyimpan state profil user login, daftar anak, dan anak aktif di `store/useUserStore.ts`. |
| **react-hook-form** | Form Management | Mengelola form dengan performa tinggi dan re-render minimal. |
| **zod** | Schema Validation | Memvalidasi data form maupun response API. |
| **@hookform/resolvers** | React Hook Form Integration | Menghubungkan React Hook Form dengan Zod. |
| **sonner** | Toast Notification | Menampilkan notifikasi sukses/gagal di UI. |
| **lucide-react** | Icon Library | Menyediakan icon SVG yang ringan dan mudah dikustomisasi. |
| **clsx** | Conditional Class | Menggabungkan className berdasarkan kondisi. |
| **tailwind-merge** | Tailwind Merge | Menghindari konflik antar class Tailwind. |
| **class-variance-authority (CVA)** | Component Variant | Membuat variasi komponen UI. |
| **jose** | JWT Management | Sign dan verify token JWT untuk session authentication. |
| **bcryptjs** | Password Hashing | Enkripsi & verifikasi password di database. |
| **@prisma/client** | ORM Client | Query data PostgreSQL Supabase. |

---

# Development Status

- ✅ Setup Project & Struktur Folder
- ✅ Install Supporting Libraries
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

---

# Catatan Arsitektur

Project ini menggunakan pendekatan **Next.js Fullstack**.

Frontend dan Backend berada dalam satu project menggunakan **App Router** serta **Route Handler (`app/api`)** sehingga tidak diperlukan backend terpisah pada tahap awal pengembangan.

Aplikasi mendukung dua tampilan utama:
1. **Mobile-first PWA (`/dashboard`)**: Diperuntukkan bagi pengguna Parent.
2. **Desktop Web Console (`/admin`)**: Diperuntukkan bagi Administrator.