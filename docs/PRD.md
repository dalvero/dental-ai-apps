# Product Requirements Document (PRD)
## Dental AI Apps

**Versi:** 0.1 (Draft)
**Tanggal:** 24 Juli 2026
**Status:** Draft — disusun berdasarkan penjelasan produk dan catatan meeting internal

---

## 1. Ringkasan Produk

**Dental AI** adalah Progressive Web App (PWA) untuk **deteksi dini kerusakan gigi anak berbasis AI**, ditujukan untuk membantu orang tua mengenali tanda-tanda awal kerusakan gigi sebelum berkembang menjadi masalah yang lebih serius.

**Arsitektur produk:**
- Dibangun full-stack dengan Next.js (App Router, Route Handler sebagai API).
- Bersifat PWA agar bisa **dibungkus di dalam aplikasi Flutter lewat WebView**.
- Tujuan strategis pendekatan ini: klien cukup update lewat web, tanpa perlu update ulang aplikasi native atau submit ulang ke Play Store.
- Model AI deteksi gigi dikembangkan secara terpisah oleh tim lain (di luar scope development aplikasi ini), akan diintegrasikan lewat API.

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
| **Parent** | Orang tua yang login, menambahkan profil anak, melakukan deteksi AI, mengakses edukasi & checklist harian | ✅ UI Login, Add Child, Dashboard Parent sudah dibuat. Backend/database belum terhubung sepenuhnya |
| **Admin** | Mengelola sistem, termasuk kemungkinan **konfirmasi checklist gigi** yang dilaporkan parent | ⚠️ Role sudah ada di database, halaman/dashboard **belum disentuh sama sekali** |

**[PERLU KONFIRMASI]** Apakah ada role terpisah untuk dokter gigi (dentist) yang melakukan verifikasi, atau verifikasi checklist tetap ditangani oleh Admin?

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
- **Fitur suara untuk hasil interpretasi AI** (seperti Google Translate — hasil dibacakan) — **[PERLU KONFIRMASI]** masih dalam tahap keputusan: pakai API suara (TTS) berbayar atau model lokal. Keputusan final untuk pemilihan ini ditunda ke bulan depan, kemungkinan tergantung budget.
- Model AI dikembangkan tim terpisah, diintegrasikan lewat API — kontrak/skema API antara frontend dan model **[PERLU KONFIRMASI]**, belum didefinisikan di dokumen ini.

### 4.2 Fitur Edukasi
- Konten edukasi **dipersonalisasi** (basis personalisasi — misal usia anak, hasil deteksi sebelumnya — **[PERLU KONFIRMASI]**).
- Setiap akhir materi edukasi ada **quiz**.
- Diakses harian oleh orang tua.

### 4.3 Fitur Checklist Gigi (Checklist Harian)
- Orang tua mengakses checklist rutinitas gigi anak **setiap hari**.
- Ada **notifikasi pengingat**.
- **Verifikasi checklist "beneran dilakukan atau belum"** — dua opsi yang masih dipertimbangkan:
  - Melalui **form/self-report** dari orang tua, atau
  - Melalui **konfirmasi Admin**
  - **[PERLU KONFIRMASI]** — mekanisme final belum diputuskan, kemungkinan bisa keduanya (form dulu, admin verifikasi kemudian)
- **Integrasi GIS** untuk membantu orang tua menemukan **praktik dokter gigi terdekat**.

### 4.4 Fitur Food Recall
- Mencatat makanan yang dikonsumsi anak **per hari** (misal: nasi, dll) — tujuannya melihat **pola konsumsi**, khususnya makanan tinggi gula.
- Menggunakan **API yang sudah tersedia** (bukan bangun database makanan dari nol) — **[PERLU KONFIRMASI]** API spesifik mana yang dimaksud belum disebutkan.
- Didesain **sederhana**, dicatat setiap hari.

### 4.5 Dashboard Admin
- **Belum dikerjakan sama sekali.**
- Kemungkinan mencakup: konfirmasi checklist gigi, manajemen data user/anak, monitoring lainnya — **[PERLU KONFIRMASI]** scope detail dashboard admin belum dibahas.

---

## 5. Prinsip Desain Produk

- **Behavior-first, bukan accuracy-first** — akurasi AI cukup "baik", tapi keberhasilan produk diukur dari **perubahan perilaku orang tua** dalam memeriksakan anak ke dokter gigi.
- Edukasi dan checklist dirancang untuk membangun **kebiasaan harian** (habit-forming), bukan sekadar fitur informasi satu arah.
- Deteksi AI berfungsi sebagai **pemicu (trigger) kesadaran**, bukan sebagai diagnosis medis final.

---

## 6. Tech Stack

| Layer | Teknologi |
|---|---|
| Runtime | Node.js 22 LTS |
| Frontend Framework | Next.js 15.3.5 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Form | react-hook-form + zod + @hookform/resolvers |
| State Management | Zustand |
| HTTP Client | Axios |
| Notifikasi UI | Sonner (toast) |
| Icon | Lucide React |
| Styling Util | clsx, tailwind-merge, class-variance-authority (CVA) |
| ORM | Prisma 7 (driver adapter `@prisma/adapter-pg`) |
| Database | PostgreSQL, hosted di Supabase (koneksi via Session Pooler) |
| Bahasa | TypeScript |
| Target Deployment | PWA → dibungkus Flutter WebView; rencana deploy ke VPS |

**Library yang direncanakan akan ditambahkan:**

| Library | Digunakan Saat |
|---|---|
| `next-pwa` | Setelah UI utama selesai, konversi ke PWA |
| `bcrypt` | Hashing password untuk autentikasi |
| `jose` | JWT Authentication |
| `pg` | Driver koneksi PostgreSQL (dipakai Prisma driver adapter) |
| `dayjs` | Pengolahan tanggal untuk history & streak (checklist, food recall) |
| `uploadthing` | Upload gambar (kemungkinan untuk foto gigi hasil deteksi) |

---

## 7. Struktur Folder Project

```text
dental-ai-apps/
│
├── app/
│   ├── (auth)/
│   │    ├──forgot-password
|   │    ├──login
│   │    └──register
|   ├── (main)/
│   │    ├──dashboard
│   │    ├──detection
│   │    ├──education
│   │    ├──history
│   │    ├──profile
|   │    └──layout.tsx
|   ├── (onboarding)/
│   │    ├──add-child
|   │    └──get-started
│   ├── admin/
│   ├── api/
│   │    ├──auth
│   │    │  ├──login
|   |    │  └──register
│   │    └──children
│   │       └──[id]
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
|
├── docs/
|
├── features/
|   ├── (onboarding)/
│   ├── auth/
│   │    ├──forgot-password
|   │    ├──login
│   │    └──register
│   ├── checklist/
│   ├── dashboard/
│   │    └──components
│   ├── detection/
│   ├── education/
│   ├── history/
│   ├── profile/
│   ├── streak/
|   └── welcome/
│
├── hooks/
│
├── lib/
│
├── prisma/
│
├── public/
│   ├── icons/
│   ├── images/
│   └── illustrations/
│
├── services/
│   ├── auth/
|   └── child/
│
├── store/
│
├── styles/
│
├── types/
│
├── utils/
│
├── middleware.ts
│
├── next.config.ts
├── package.json
└── tsconfig.json
```

**Fungsi folder:**

| Folder | Fungsi |
|---|---|
| `app/` | Routing utama (App Router) |
| `app/api/` | REST API via Route Handler |
| `components/` | Komponen UI reusable |
| `features/` | Kode dikelompokkan per fitur bisnis |
| `hooks/` | Custom React Hooks |
| `lib/` | Konfigurasi library & helper internal |
| `services/` | Layer komunikasi ke REST API |
| `store/` | Global state (Zustand) |
| `types/` | TypeScript interfaces/types |
| `utils/` | Helper function |
| `docs/` | Dokumentasi project |
| `prisma/` | Schema database Prisma |
| `middleware.ts` | Auth & authorization middleware |

Pendekatan arsitektur: **Next.js Fullstack** — frontend & backend satu project lewat Route Handler, tanpa backend terpisah di tahap awal. Bisa dipisah jadi service tersendiri nanti kalau kebutuhan berkembang, tanpa mengubah arsitektur frontend secara signifikan.

---

## 8. Data Model (Database — Prisma Schema, saat ini)

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

**Model yang kemungkinan besar perlu ditambahkan ke depan** (berdasarkan fitur di atas, belum ada di schema saat ini):
- Hasil deteksi AI (foto 4 sudut, hasil klasifikasi, confidence score, timestamp)
- Riwayat checklist harian gigi (per anak, per hari, status verifikasi)
- Entry food recall harian
- Progress edukasi & hasil quiz per user
- Data klinik/dokter gigi untuk fitur GIS

---

## 9. Roadmap & Status Saat Ini

**Pendekatan pengembangan:** Frontend dulu per fitur, lalu backend + database menyusul secara bertahap per fitur (bukan backend-first).

| Fitur | Frontend/UI | Backend/API | Database |
|---|---|---|---|
| Welcome/Splash Screen | ✅ | – | – |
| Get Started | ✅ | – | – |
| Login | ✅ | ✅ Dummy, belum ke DB | ✅ Seed sudah ada, belum terhubung |
| Add Child | ✅ | ✅ In-memory, belum ke DB | ✅ Schema sudah ada, belum terhubung |
| Dashboard Parent | ✅ | ❌ | ❌ |
| Dashboard Admin | ❌ | ❌ | ❌ |
| Fitur AI Deteksi | ❌ | ❌ | ❌ |
| Fitur Edukasi | ❌ | ❌ | ❌ |
| Fitur Checklist Gigi | ❌ | ❌ | ❌ |
| Fitur Food Recall | ❌ | ❌ | ❌ |

**Roadmap teknis (dari dokumentasi setup):**
- ✅ Setup Project & Struktur Folder
- ✅ Install Supporting Library
- ⏳ UI Development
- ⏳ Progressive Web App (PWA)
- ⏳ Database (Prisma + PostgreSQL)
- ⏳ Authentication
- ⏳ REST API
- ⏳ AI Integration
- ⏳ Dashboard Admin
- ⏳ Flutter WebView Integration
- ⏳ Deployment ke VPS

---

## 10. Keputusan Teknis yang Masih Terbuka (Open Decisions)

1. **Strategi session/auth** — cookie httpOnly, JWT di localStorage, atau NextAuth.js? *(dalam pembahasan)*
2. **API suara untuk hasil interpretasi AI** — pakai API TTS berbayar atau model lokal? Ditunda ke bulan depan, tergantung budget.
3. **Mekanisme verifikasi checklist gigi** — self-report form vs konfirmasi Admin, atau kombinasi keduanya?
4. **Kontrak API dengan model AI** tim lain — format request/response foto & hasil klasifikasi belum didefinisikan.
5. **Mapping gender** — `"boy"/"girl"` di frontend vs `MALE/FEMALE` di database.
6. **Age vs Birth Date** — form Add Child pakai umur, schema pakai tanggal lahir — perlu keputusan konversi.
7. **Password hashing di API login** — API saat ini masih compare plaintext ke dummy user, perlu diganti `bcrypt.compare()` setelah terhubung Prisma.
8. **API food recall** — API eksternal spesifik yang dimaksud di meeting belum disebutkan namanya.

---