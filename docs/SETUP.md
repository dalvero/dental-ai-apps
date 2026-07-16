# Dental AI Apps

> Progressive Web Application (PWA) untuk deteksi dini karies gigi menggunakan Artificial Intelligence.

---

# Setup Documentation

**Tanggal Setup :** 16 Juli 2026

Dokumentasi ini menjelaskan proses setup awal project, struktur folder, serta library yang digunakan selama proses pengembangan.

---

# Technology Stack

| Teknologi | Versi |
|------------|--------|
| Node.js | 22 LTS |
| Next.js | 15.3.5 |
| React | 19 |
| TypeScript | ✓ |
| Tailwind CSS | 4.x |
| App Router | ✓ |

---

# Membuat Project

```bash
npx create-next-app@15.3.5 dental-ai-apps
```

## Konfigurasi Instalasi

```text
✔ Would you like to use TypeScript? → Yes

✔ Would you like to use ESLint? → Yes

✔ Would you like to use Tailwind CSS? → Yes

✔ Would you like your code inside a src/ directory? → No

✔ Would you like to use App Router? → Yes

✔ Would you like to use Turbopack for next dev? → Yes

✔ Would you like to customize the import alias (@/* by default)? → No
```

---

# Project Structure

```text
dental-ai-apps/
│
├── app/
│   ├── (auth)/
│   ├── admin/
│   ├── dashboard/
│   ├── detection/
│   ├── education/
│   ├── history/
│   ├── profile/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
│
├── features/
│   ├── auth/
│   ├── checklist/
│   ├── dashboard/
│   ├── detection/
│   ├── education/
│   ├── history/
│   ├── profile/
│   └── streak/
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
│
├── store/
│
├── styles/
│
├── types/
│
├── utils/
│
├── docs/
│
├── middleware.ts
│
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

# Struktur Folder

| Folder | Fungsi |
|----------|---------|
| **app/** | Routing utama aplikasi menggunakan App Router Next.js. |
| **app/api/** | REST API menggunakan Route Handler Next.js. |
| **components/** | Komponen UI yang dapat digunakan kembali. |
| **features/** | Mengelompokkan kode berdasarkan fitur bisnis. |
| **hooks/** | Menyimpan seluruh Custom React Hooks. |
| **lib/** | Konfigurasi library, helper internal, dan konstanta aplikasi. |
| **services/** | Layer komunikasi dengan REST API. |
| **store/** | Global State Management menggunakan Zustand. |
| **types/** | Seluruh interface dan type TypeScript. |
| **utils/** | Helper Function. |
| **styles/** | File CSS tambahan. |
| **public/** | Asset statis (gambar, icon, ilustrasi, dll). |
| **docs/** | Dokumentasi project. |
| **prisma/** | Schema database menggunakan Prisma ORM. |
| **middleware.ts** | Middleware untuk Authentication & Authorization. |

---

# Install Supporting Libraries

```bash
npm install axios zustand react-hook-form zod @hookform/resolvers sonner lucide-react clsx tailwind-merge class-variance-authority
```

---

# Supporting Libraries

| Library | Fungsi | Alasan Digunakan |
|----------|---------|------------------|
| **axios** | HTTP Client | Komunikasi antara Frontend dengan REST API. Mendukung interceptor sehingga cocok untuk autentikasi. |
| **zustand** | State Management | Menyimpan state global seperti user login, tema aplikasi, dan status autentikasi. |
| **react-hook-form** | Form Management | Mengelola form dengan performa tinggi dan re-render minimal. |
| **zod** | Schema Validation | Memvalidasi data form maupun response API. |
| **@hookform/resolvers** | React Hook Form Integration | Menghubungkan React Hook Form dengan Zod. |
| **sonner** | Toast Notification | Menampilkan notifikasi sukses, gagal, maupun informasi. |
| **lucide-react** | Icon Library | Menyediakan icon SVG yang ringan dan mudah dikustomisasi. |
| **clsx** | Conditional Class | Menggabungkan className berdasarkan kondisi tertentu. |
| **tailwind-merge** | Tailwind Merge | Menghindari konflik antar class Tailwind. |
| **class-variance-authority (CVA)** | Component Variant | Membuat variasi komponen UI tanpa mengulang class Tailwind. |

---

# Contoh Penggunaan Library

| Library | Contoh Penggunaan |
|----------|-------------------|
| Axios | Login, mengambil riwayat deteksi, menyimpan checklist, memanggil AI API. |
| Zustand | Menyimpan informasi user login, dark mode, dan global state lainnya. |
| React Hook Form | Login Form, Register Form, Edit Profile. |
| Zod | Validasi Email, Password, Nomor Telepon, dan input lainnya. |
| Sonner | Menampilkan toast "Login Berhasil", "Prediksi Berhasil", maupun pesan error. |
| Lucide React | Icon Home, History, Profile, Dashboard, Camera, Logout, dan lainnya. |
| CVA | Button Primary, Secondary, Outline, Danger, Success, Badge, Card, dll. |

---

# Library yang Akan Di-install Selanjutnya

| Library | Digunakan Saat |
|----------|----------------|
| **Prisma** | Mulai membuat Backend dan Database. |
| **next-pwa** | Setelah UI utama selesai dan siap dijadikan Progressive Web App. |
| **bcrypt** | Implementasi Authentication. |
| **jose** | Implementasi JWT Authentication. |
| **pg** | Koneksi PostgreSQL. |
| **dayjs** | Pengolahan tanggal, history, dan streak. |
| **uploadthing** | Upload gambar ke server (jika diperlukan). |

---

# Roadmap Development

- ✅ Setup Project
- ✅ Struktur Folder
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

# Catatan

Project ini menggunakan pendekatan **Next.js Fullstack**.

Frontend dan Backend berada dalam satu project menggunakan **App Router** serta **Route Handler (`app/api`)** sehingga tidak diperlukan backend terpisah pada tahap awal pengembangan.

Apabila kebutuhan aplikasi berkembang di masa depan, backend dapat dipisahkan menjadi service tersendiri tanpa mengubah arsitektur frontend secara signifikan.