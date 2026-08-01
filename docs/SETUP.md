# Dental AI Apps

> Progressive Web Application (PWA) untuk deteksi dini karies gigi menggunakan Artificial Intelligence.

---

# Setup Documentation

**Tanggal Setup :** 16 Juli 2026  
**Terakhir Diperbarui :** 1 Agustus 2026  

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
└── tsconfig.json
```

---

# Deskripsi Struktur Folder

| Folder | Fungsi |
|----------|---------|
| **app/** | Routing utama aplikasi menggunakan App Router Next.js. |
| **app/admin/** | Routing khusus Panel Dashboard & Login Admin (Desktop Web Layout). |
| **app/api/** | REST API Route Handlers (`/api/auth`, `/api/admin/education`, `/api/admin/articles`, `/api/education`, `/api/articles`). |
| **components/** | Komponen UI reusable (`components/ui`, `components/layout`). |
| **features/** | Mengelompokkan kode berdasarkan fitur bisnis (`features/admin`, `features/dashboard`, `features/education`). |
| **features/admin/** | Modul komponen visual Dashboard Admin (Sidebar, Header, Stat Grid, Table Materi, Table Artikel, Table User, Quiz Editor). |
| **features/education/** | Modul Mobile PWA Edukasi (Kartu Vertikal Materi, Filter Tipe, Search Bar, Modal Kuis Interaktif). |
| **hooks/** | Custom React Hooks. |
| **lib/** | Helper internal (`auth.ts` JWT signer/verifier, `prisma.ts` instance singleton). |
| **services/** | Layer komunikasi dengan REST API menggunakan Axios (`services/admin/`, `services/education.service.ts`). |
| **store/** | Global State Management menggunakan Zustand (`store/useUserStore.ts`). |
| **types/** | Interface dan type TypeScript tersentralisasi (`education.ts`, `quiz.ts`, `user.ts`, `child.ts`, `api.ts`). |
| **public/** | Asset statis (icon, ilustrasi, avatar gender `boy_gender.png` & `girl_gender.png`). |
| **docs/** | Dokumentasi project (`PRD.md`, `PROGRESS_LOG.md`, `SETUP.md`, `FEATURES.md`). |
| **prisma/** | Schema database menggunakan Prisma ORM (`schema.prisma`) & file seeding (`seed.ts`). |
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
| **@prisma/client** | ORM Client | Query data PostgreSQL Supabase via `@prisma/adapter-pg`. |

---

# Development Status

- ✅ Setup Project & Struktur Folder
- ✅ Database Schema & Migration (User, Child, Education, QuizQuestion, Article)
- ✅ Admin Panel UI & Real-Time CRUD Management
- ✅ PWA Parent Education & Interactive Quiz Taker Module