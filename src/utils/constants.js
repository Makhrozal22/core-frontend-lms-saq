// src/utils/constants.js
import {
    Bell, CreditCard, Wallet, Vault, BookOpen,
    Receipt, ArrowRight, ChevronRight, GraduationCap, Star,
    CheckCircle2, Clock
} from 'lucide-react';

export const islamicQuotes = [
    "\"Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya.\" (HR. Bukhari)",
    "\"Menuntut ilmu itu wajib atas setiap muslim.\" (HR. Ibnu Majah)",
    "\"Pendidikan anak adalah investasi terbaik dunia dan akhirat.\"",
];

export const quickActions = [
    { label: "Bayar SPP", icon: CreditCard, path: "/tagihan", color: "bg-emerald-100 text-emerald-600" },
    { label: "Isi Saldo Jajan", icon: Wallet, path: "/canteen", color: "bg-amber-100 text-amber-600" },
    { label: "Tabungan", icon: Vault, path: "/savings", color: "bg-blue-100 text-blue-600" },
    { label: "Rapor", icon: BookOpen, path: "/academic", color: "bg-purple-100 text-purple-600" },
    { label: "Riwayat", icon: Receipt, path: "/riwayat", color: "bg-rose-100 text-rose-600" },
    { label: "Notifikasi", icon: Bell, path: "/notifications", color: "bg-orange-100 text-orange-600" },
];

export const mockRecentTransactions = [
    { id: 'TX-101', title: 'Pembayaran SPP Bulan Agustus', date: '10 Aug 2026, 09:30', amount: 350000, status: 'Berhasil' },
    { id: 'TX-102', title: 'Topup Saldo Kantin', date: '08 Aug 2026, 14:15', amount: 50000, status: 'Berhasil' },
    { id: 'TX-103', title: 'Pembayaran Uang Gedung', date: '01 Aug 2026, 11:00', amount: 500000, status: 'Berhasil' },
];

