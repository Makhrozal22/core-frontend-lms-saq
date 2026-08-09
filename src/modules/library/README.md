src/modules/library/
├── 📁 components/
│   ├── BookCard.jsx          # Card sampul & status ketersediaan buku
│   ├── BorrowedStatusBadge.jsx # Badge indikator sisa hari pinjam
│   └── BookSearchInput.jsx   # Input pencarian dengan filter kategori
├── 📁 hooks/
│   ├── useBookSearch.js      # Hook pencarian buku ter-debounce
│   └── useBorrowing.js       # Hook kelola peminjaman aktif
├── 📁 pages/
│   ├── LibraryCatalogPage.jsx # Katalog utama perpustakaan
│   ├── BorrowedBooksPage.jsx  # Halaman buku yang sedang dipinjam
│   └── BookDetailPage.jsx     # Detail rincian & ketersediaan buku
└── 📁 services/
    └── libraryService.js     # Endpoint Axios: /library/books, /library/borrowings