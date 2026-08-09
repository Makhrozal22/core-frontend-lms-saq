Planning (Bisa berubah sesuai dengan kondisi dan kebutuhan)


src/modules/academic/
├── 📁 components/
│   ├── StudentCard.jsx       # Card profil singkat siswa
│   ├── GradeTable.jsx        # Tabel input & rekap nilai
│   └── ScheduleList.jsx      # Widget daftar jadwal harian
├── 📁 hooks/
│   ├── useStudent.js         # Custom hook fetching data siswa
│   └── useAcademicYear.js    # Custom hook filter tahun ajaran
├── 📁 pages/
│   ├── AcademicDashboardPage.jsx # Ringkasan statistik akademik
│   ├── StudentListPage.jsx       # Halaman direktori siswa
│   └── GradeRecapPage.jsx        # Halaman laporan & cetak nilai
└── 📁 services/
    └── academicService.js    # Endpoint Axios: /academic/students, /academic/grades