# 🔐 Modul Autentikasi (OTP)

Modul ini menangani autentikasi pengguna berbasis nomor handphone (WhatsApp/SMS) dengan One-Time Password (OTP).

src/modules/auth/
├── 📁 components/
│   ├── RequestOtpForm.jsx    # UI Form input nomor HP
│   └── VerifyOtpForm.jsx     # UI Form input 6-digit OTP
├── 📁 hooks/
│   ├── useAuthOtp.js         # Hook pengelola state & proses login
│   └── useOtpTimer.js        # Hook hitung mundur jeda re-send OTP
├── 📁 pages/
│   ├── LoginPage.jsx         # Entry point halaman Login/Aktivasi
│   └── ProfilePage.jsx       # Halaman profil & pengaturan akun
└── 📁 services/
    └── authService.js        # Endpoint Axios: /auth/otp/request, /auth/otp/verify, /auth/logout

## 🚀 Fitur Utama
- [x] Input Nomor WhatsApp / HP
- [x] Request Kode OTP via Endpoint Backend Laravel
- [x] Verifikasi OTP & Penyimpanan JWT Token ke LocalStorage/Cookies
- [x] Auto Re-send OTP Timer 

## 📌 Endpoint API (Laravel)
- `POST /api/auth/otp/request` - Param: `{ phone_number: string }`
- `POST /api/auth/otp/verify` - Param: `{ phone_number: string, otp_code: string }`

## 👥 Penanggung Jawab / Task Team
- **Frontend Dev:** [Mizan & Alya]
- **Status Modul:** `Stable / In Progress`