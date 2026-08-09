💰 Modul Finance (src/modules/finance/)
Mengelola administrasi keuangan sekolah, tagihan SPP, biaya kegiatan, serta riwayat transaksi/pembayaran siswa.

Fitur Utama:

Dashboard kewajiban tagihan SPP & iuran bulanan.

Riwayat pembayaran lunas & tunggakan.

Cetak kuitansi / bukti pembayaran (PDF).

Planning (Bisa berubah sesuai dengan kondisi dan kebutuhan)

src/modules/finance/
├── 📁 components/
│   ├── SppCard.jsx           # Card status tagihan SPP bulan berjalan
│   ├── PaymentHistoryTable.jsx # Tabel riwayat transaksi pembayaran
│   └── BillSummaryModal.jsx  # Modal rinci rincian pembayaran
├── 📁 hooks/
│   ├── useSpp.js             # Hook penarik tagihan SPP & kalkulasi total
│   └── usePayment.js         # Hook pembantu transaksi pembayaran
├── 📁 pages/
│   ├── SppDashboardPage.jsx  # Ringkasan status SPP & tagihan siswa
│   ├── SppDetailPage.jsx     # Rincian komponen tagihan bulanan
│   └── SppHistoryPage.jsx    # Halaman riwayat histori pembayaran
└── 📁 services/
    └── financeService.js     # Endpoint Axios: /finance/bills, /finance/payments