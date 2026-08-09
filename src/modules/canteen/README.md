src/modules/canteen/
├── 📁 components/
│   ├── MenuCard.jsx          # Card item menu makanan/minuman
│   ├── WalletBalanceCard.jsx # Widget sisa saldo dompet digital
│   └── CartDrawer.jsx        # Drawer ringkasan keranjang belanja
├── 📁 hooks/
│   ├── useCanteenMenu.js     # Hook fetch menu & pencarian makanan
│   └── useWallet.js          # Hook riwayat saldo & instruksi top-up
├── 📁 pages/
│   ├── CanteenHomePage.jsx   # Halaman eksplorasi menu kantin
│   └── OrderHistoryPage.jsx  # Halaman histori jajan & belanja
└── 📁 services/
    └── canteenService.js     # Endpoint Axios: /canteen/menu, /canteen/orders, /canteen/wallet