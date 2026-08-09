# 🏗️ Dokumentasi Arsitektur Frontend React (Modular Pattern)

Dokumentasi ini menjelaskan standar struktur proyek, instalasi dasar, alur kerja antar-layer, serta panduan arsitektur berbasis modul pada repositori frontend aplikasi.

---

## 🚀 Panduan Instalasi & Inisialisasi Proyek

Proyek ini dibangun menggunakan **React** dengan build tool **Vite** serta **Tailwind CSS** untuk styling.

### 1. Inisialisasi Proyek (Vite + React)
```bash
# Via terminal, install baru
npm create vite@latest . core-frontend-lms-saq-- --template react

# Via clone git
1. Download/Clone repository ke komputer lokal
git clone https://github.com/Makhrozal22/core-frontend-lms-saq.git
2. Masuk ke folder proyek
cd core-frontend-lms-saq
3. Pindah ke branch develop
git checkout develop

# Router & State Management
npm install react-router-dom zustand

# HTTP Client & Utility
npm install axios

# Styling & Icon
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
npm run dev

Arsitektur aplikasi menggunakan Feature-Driven / Modular Architecture. Seluruh kode sumber utama berada di bawah direktori src

src/
├── 📁 assets/             # Asset statis global (Gambar, Logo, Font, Ilustrasi)
├── 📁 components/         # Component UI global/reusabel (Button, Modal, Input, Table)
├── 📁 config/             # Konfigurasi global (Axios instance, Constant, App Config)
├── 📁 hooks/              # Custom Hooks global (useDebounce, useMediaQuery, dll)
├── 📁 layouts/            # Layout Wrapper global (AuthLayout, DashboardLayout, AppLayout)
├── 📁 routes/             # Konfigurasi routing aplikasi (AppRoutes.jsx, ProtectedRoute)
├── 📁 store/              # State Management global (Zustand Global Store: authStore, themeStore)
├── 📁 utils/              # Helper functions (Currency formatter, Date parser, Validator)
└── 📁 modules/            # Domain Modules (Fitur-Fitur Utama Aplikasi)
    ├── 🔐 auth/           # Modul Autentikasi & Akun
    ├── 🎓 academic/       # Modul Akademik & Kesiswaan
    ├── 💰 finance/        # Modul Keuangan (SPP, Tagihan, Pembayaran)
    ├── 🍱 canteen/        # Modul Kantin & Transaksi Digital
    └── 📚 library/        # Modul Perpustakaan 

masing - masing detail penjelasan modul bisa dibaca pada MD masing masing modulenya
