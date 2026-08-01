# Progress Log Documentation

Dokumentasi Progres Log adalah catatan log untuk setiap progress yang dilakukan. Catatan berisi penjelasan singkat tentang apa-apa saja yang sudah dikerjakan.

# Format
1. Tanggal (Di push ke Branch mana? Merge atau tidak? Jika iya merge ke mana?)
2. Deskripsi Singkat
3. List fitur yang selesai (optional dan jika ada)
    - ✅ ...
    - ✅ ...
4. Kendala (Sertakan keterangan apakah solve?)
    - ✅ ... (Solve)
    - ❌ ... (Not Solve)
5. Next Progress
    - ...
    - ...

# Contoh

1. **Tanggal Log :** 16 Juli 2026. **(Frontend, Not Merged)**
2. Progress sampai pada pembuatan UI halaman login dan register.
3. List fitur yang selesai:
    - ✅ Fitur Login
    - ✅ Fitur Register
4. Kendala:
    - ✅ Logika pada fitur login dan register. (Solve)
    - ❌ Masih belum bisa register user. (Not Solve)
5. Next Progress
    - Fix masalah register.
    - Membuat halaman Add Child
    - Membuat Backend/API untuk fitur Add Child.

## Progress Log Start
1. **Tanggal Log :** 16 Juli 2026. **(Frontend, Not Merged)**
2. Progress sampai pada pembuatan UI halaman Welcome/Splash Screen awal aplikasi, Get Started, Login, Add Childs.
3. List fitur yang selesai:
    - ✅ Fitur Login
4. Kendala:
    - ✅ Mencari referensi ilustrasi. (Solve, menggunakan Google Stitch dan ChatGPT)
    - ❌ Halaman Add Childs masih belum berfungsi dan harus di update dari Frontend/UI maupun Backendnya. (Not Solve)
5. Next Progress
    - Menyelesaikan halaman Add Childs dari Frontend maupun Backendnya.
    - Membuat API untuk halaman Add Childs.
    - Setelah halaman Add Childs selesai, lanjut ke halaman Frontend Dashboard.
    - Coba setup database ke Supabase dulu.
    - Kalau database bisa, coba deploy ke vercel dulu.
#
1. **Tanggal Log :** 24 Juli 2026. **(Frontend, Not Merged)**
2. Progress sampai pada inisiasi integrase database Prisma PostgreSQL dan Supabase, mengintegrasikan API login, register, dan add child. Tabel User dan Child sudah terbentuk di Supabase, demo sampai dashboard sudah bisa dilakukan tapi belum sampai pada fitur yang ada di dashboard. Protection route juga sudah bekerja dengan membuat file middleware.ts, selain itu penyimpanan session menggunakan JWT yang sudah ada di .env. Saat ini user harus login dulu untuk bisa mengakses dashboard. **Semua rencana progress sebelumnya berhasil diselesaikan**
3. List fitur yang selesai:
    - ✅ Fitur Add Child
    - ✅ Fitur Register
    - ✅ Fitur Protection Route
4. Kendala:
    - ✅ Set Up Prisma yang susah karena salah versi, inisiasi awal jadi lebih lama dan memakan waktu. (Solve)
    - ✅ Integrasi Prisma dan Supabase yang lama dikarenakan Set Up Prisma yang salah langkah dan salah versi. (Solve)
5. Next Progress
    - Merapikan Code dan Komentar agar memudahkan untuk pengembangan kedepannya.
    - Menyesuaikan dan merapikan tampilan UI kembali agar telihat profesional untuk demo/prototype
    - Membuat tampilan dashboard Admin.
    - Mencoba memanggil data anak/parent ketika user dengan role parent masuk ke dashboard.
#
1. **Tanggal Log :** 29 Juli 2026. **(Frontend, Not Merged)**
2. Progress sampai pada pembuatan tampilan Admin Panel, seperti Admin Sidebar, Admin Header, Admin Stat Grid, User Management Table, Checklist Verification Card, dan Recent Detections Table. **Semua rencana progress sebelumnya berhasil diselesaikan**
3. List fitur yang selesai:
    - ✅ Fitur Admin Panel
    - ✅ Fitur Admin Sidebar
    - ✅ Fitur Admin Header
    - ✅ Fitur Admin Stat Grid
    - ✅ Fitur User Management Table
    - ✅ Fitur Checklist Verification Card
    - ✅ Fitur Recent Detections Table
    - ✅ Halaman Admin Login
4. Kendala:
    - ✅ 502 error saat mengakses halaman admin. (Solve)
5. Next Progress
    - Memperbaiki UI Admin Panel.
    - Membersihkan komentar yang tidak perlu
    - Membuat Backend Admin dashboard agar terhubung ke halaman Mobile PWA
    - Jika Backend Admin sudah selesai, lanjut ke halaman Mobile PWA yang masih tersisa.
    - Memastikan data yang tampil di Mobile PWA sudah bisa dimanajemen oleh Admin
#
1. **Tanggal Log :** 1 Agustus 2026 - Sesi 2. **(Fullstack, Branch: main)**
2. Progress sampai pada pengintegrasian real-time database Supabase ke halaman Mobile PWA Parent (`/education` & Dashboard `EducationCard`), pembuatan modal pengerjaan kuis interaktif dengan penentuan skor otomatis & kunci jawaban, penyempurnaan desain kartu vertikal lapang (sesuai spesifikasi UI), otomatisasi pembersihan kuis terhapus pada API Admin, penyembunyi scrollbar cross-browser `.no-scrollbar`, serta sentralisasi tipe domain TypeScript di `@/types`.
3. List fitur yang selesai:
    - ✅ Integrasi Data Real Database Edukasi ke Mobile PWA (`/api/education` & `/api/articles`)
    - ✅ Halaman PWA Edukasi & Kuis Parent (`app/(main)/education/page.tsx` & `EducationPage.tsx`)
    - ✅ Komponen Modal Kuis Interaktif PWA (`InteractiveQuizModal.tsx`) dengan Perhitungan Skor & Pembahasan Kunci Jawaban
    - ✅ Redesain Kartu Materi Edukasi Vertikal Lapang (Banner Image Overlay, Category Badge, Meta Type & Duration, Button Buka Materi & Ikuti Kuis)
    - ✅ Widget Dashboard PWA Real-Time (`EducationCard.tsx`)
    - ✅ Modal Konfirmasi Hapus Kustom (Ganti `confirm()` browser dengan pop-up animated modal)
    - ✅ Pemisahan Komponen Modular (`EducationQuizEditor.tsx`, `InteractiveQuizModal.tsx`, `EducationCard.tsx`)
    - ✅ Sentralisasi Tipe Domain TypeScript (`types/quiz.ts`, `types/education.ts`, `types/index.ts`)
    - ✅ Utility Cross-Browser Scrollbar Hiding (`.no-scrollbar`) & Eliminasi Border Layout Shift pada Filter Pills
    - ✅ Penanganan Atomis Hapus Kuis pada API Admin (`PUT /api/admin/education/[id]`)
4. Kendala:
    - ✅ Tombol kuis interaktif tidak langsung muncul saat admin membuat kuis. (Solve, mengotomatiskan `hasQuiz: true` di server API & menyederhanakan perbandingan larik `quizQuestions`)
    - ✅ Tombol kuis masih muncul saat kuis dihapus dari admin. (Solve, menambahkan query `deleteMany` atomis pada tabel `QuizQuestion` di route PUT admin saat `hasQuiz: false`)
    - ✅ Pergeseran kecil 2px pada tombol filter saat diklik. (Solve, menyelaraskan 1px `border` pada seluruh state tombol aktif & non-aktif)
5. Next Progress (Developer 2):
    1. Merapikan halaman/tab Manajemen Artikel pada dashboard admin.
    2. Memastikan data yang tampil di halaman/tab Manajemen Artikel diambil dari database.
    3. Membuat CRUD di halaman/tab Manajemen Artikel.
    4. Menghubungkan artikel pada halaman mobile pwa.
    5. Membuat halaman kuis interaktif, materi edukasi pdf/video, di tampilan Mobile PWA.