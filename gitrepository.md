
[ main / master ]  ◄── (Hanya berisi kode produksi / rilis resmi yang sudah stabil)
        ▲
        │  (Merged via Pull Request oleh Lead)
[ develop ]        ◄── (Pusat integrasi harian seluruh developer)
        ▲
        ├── fitur/s1-auth-otp-login     ◄── (Branch tugas Developer A)
        ├── fitur/s1-layout-dashboard    ◄── (Branch tugas Developer B)
        └── fix/s1-resend-otp-timer      ◄── (Branch perbaikan bug)

📋 2. STANDAR PENAMAAN BRANCH & COMMIT PER SPRINT
A. Format Penamaan Branch
Jenis Tugas,Format Nama Branch,Contoh Riil
Fitur Baru (Sprint 1),fitur/s1-[nama],fitur/s1-auth-otp-login
Fitur Baru (Sprint 2),fitur/s2-[nama],fitur/s2-dashboard-spp-card
Fitur Baru (Sprint 3),fitur/s3-[nama],fitur/s3-finpay-snap-popup
Perbaikan Bug,fix/s[no]-[nama],fix/s1-otp-countdown-timer
Refactoring Kode,refactor/s[no]-[nama],refactor/s2-spp-table-component

B. Format Pesan Commit (Commit Message)
Format commit WAJIB menyertakan identitas Sprint di bagian paling depan agar dapat dilacak dengan cepat pada riwayat Git.
Format: [SX] Kategori: Deskripsi detail perubahan
Contoh Commit per Sprint:
Sprint 1 (Auth OTP & Setup):
[S1] Fitur: Setup Axios Interceptor dan Base URL Laravel API
[S1] Fitur: Membuat UI form input nomor WhatsApp santri
[S1] Fix: Memperbaiki penanganan error 422 saat OTP salah
Sprint 2 (Core SPP Dashboard):
[S2] Fitur: Membuat komponen TagihanCard dan simulasi data
[S2] Fitur: Menambahkan tabel histori pembayaran SPP
Sprint 3 (Payment Gateway Sync):
[S3] Fitur: Menambahkan custom hook usePayment untuk panggil Finpay Snap
[S3] Fix: Callback handler ketika transaksi dibatalkan user

🔄 3. ALUR KERJA DETAIL (STEP-BY-STEP COMMAND)
🚀 Langkah 1: Clone Repository (Hanya Dilakukan 1x di Awal)
Buka terminal/command prompt di laptop Anda, lalu jalankan:
# 1. Download/Clone repository ke komputer lokal
git clone https://github.com/organisasi/spp-lms-frontend.git

# 2. Masuk ke folder proyek
cd spp-lms-frontend

# 3. Pindah ke branch develop
git checkout develop

🌿 Langkah 2: Memulai Tugas Baru (Pindah & Buat Branch)
Sebelum mulai koding fitur baru, selalu pastikan Anda mengambil kode terbaru dari branch develop.

# 1. Pastikan Anda berada di branch develop
git checkout develop

# 2. Ambil perubahan terbaru dari server
git pull origin develop

# 3. Buat dan langsung pindah ke branch fitur baru Anda
git checkout -b fitur/s1-auth-otp-login

💾 Langkah 3: Simpan Pekerjaan Berkala (Commit Local)
Lakukan commit secara rutin tiap selesai menyelesaikan sub-fungsi kecil. Jangan menunggu kodingan menumpuk banyak baru di-commit!

# 1. Cek file mana saja yang telah diubah/ditambah
git status

# 2. Tandai semua file yang diubah untuk siap disimpan
git add .

# 3. Simpan perubahan dengan pesan standar
git commit -m "[S1] Fitur: Membuat komponen OtpForm dan integrasi timer resend"

🔄 Langkah 4: Sinkronisasi Sebelum Push (Penting untuk Mencegah Conflict!)
Sebelum Anda mengunggah (push) branch Anda ke server, cek apakah ada teman satu tim yang sudah melakukan merge fitur mereka ke develop.

# 1. Ambil update dari branch develop server tanpa mengubah branch lokal Anda saat ini
git fetch origin develop

# 2. Gabungkan perubahan dari develop server ke branch fitur Anda
git merge origin/develop

# 3. (Opsional) Jika terjadi conflict, selesaikan dulu file yang bermasalah, lalu jalankan:
git add .
git commit -m "[S1] Fix: Merge conflict saat integrasi OTP"

📨 Langkah 5: Mengirim Pekerjaan ke GitHub (Push to Remote)
Setelah sinkronisasi berhasil tanpa conflict, sekarang aman untuk mendorong (push) hasil kerja Anda ke server GitHub.

# Kirim branch fitur Anda ke GitHub
git push -u origin fitur/s1-auth-otp-login

🎯 6. PEMBERSIHAN DAN PENGGABUNGAN (PR & DELETE BRANCH)
Setelah PR disetujui dan digabungkan (merged) ke branch develop oleh Lead Dev atau Admin Repo, lakukan langkah berikut di laptop Anda:

# 1. Pindah kembali ke branch develop
git checkout develop

# 2. Ambil perubahan terbaru (termasuk merge dari branch Anda yang sudah masuk develop)
git pull origin develop

# 3. Hapus branch fitur lokal yang sudah selesai agar rapi
git branch -d fitur/s1-auth-otp-login

# 4. (Opsional) Hapus juga branch dari server GitHub jika sudah tidak diperlukan
# Perhatikan tanda '-' di depan 'origin...' artinya menghapus (delete)
git push origin --delete fitur/s1-auth-otp-login

🔀 Langkah 6: Membuat Pull Request (PR) & Code Review
Buka browser dan masuk ke repository GitHub / GitLab.

Anda akan melihat tombol "Compare & Pull Request". Klik tombol tersebut.

Atur arah penggabungan:

Base branch: develop ◄── Compare branch: fitur/s1-auth-otp-login

Isi judul PR: [S1] Fitur Login Nomor HP & OTP WhatsApp

Berikan deskripsi ringkas apa saja yang Anda kerjakan/ubah.

Masukkan Lead Front-End sebagai Reviewer.

Tunggu peninjauan kode (Code Review). Jika disetujui (Approved), Lead akan melakukan Merge ke develop.

┌─────────────────┬─────────────────────────────────────────────────────────┐
│ Perintah Git    │ Kapan Harus Digunakan?                                  │
├─────────────────┼─────────────────────────────────────────────────────────┤
│ git clone       │ Hanya 1x saat pertama kali mengunduh proyek ke laptop.  │
│ git checkout    │ Saat ingin PINDAH branch yang sudah ada.                │
│ git checkout -b │ Saat ingin MEMBUAT branch BARU sekaligus pindah ke sana.│
│ git pull        │ MENGUNDUH & LANGSUNG MENGGABUNGKAN kode terbaru server. │
│ git fetch       │ MENGECEK / MENGUNDUH update server TANPA mengubah kode. │
│ git merge       │ MENGGABUNGKAN kode dari branch lain ke branch kita.     │
│ git add .       │ Menandai seluruh file hasil edit agar masuk daftar simpan│
│ git commit -m   │ Menyimpan checkpoint riwayat kodingan di komputer lokal. │
│ git push        │ Mengirim hasil commit lokal ke repository GitHub/GitLab. │
│ git status      │ Cek file apa saja yang diubah, ditambah, atau dihapus.   │
│ git log         │ Melihat riwayat commit terdahulu.                       │
│ git stash       │ MENYIMPAN SEMENTARA kodingan yang belum siap di-commit. │
└─────────────────┴─────────────────────────────────────────────────────────┘