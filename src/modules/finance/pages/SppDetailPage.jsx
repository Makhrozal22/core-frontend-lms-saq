import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, CreditCard, Download, Receipt,
  User, CheckCircle2, ChevronRight, Wallet
} from 'lucide-react';

import { useStudents } from '../../finance/hooks/useStudents';
import { useInvoices } from '../../finance/hooks/useInvoices';

// Helper Format Rupiah
const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0);

// Data Dummy Rincian Item (Sambil menunggu endpoint detail spesifik dari backend Laravel)
const dummyItemizedBills = [
  { title: 'SPP Bulanan (Agustus)', amount: 350000 },
  { title: 'Kegiatan Ekstrakurikuler', amount: 100000 },
  { title: 'Buku & Modul Pembelajaran', amount: 150000 },
];

export const SppDetailPage = () => {
  // Mengambil data dari API yang sudah ada di modul finance
  const { students = [], loading: loadingStudents } = useStudents();
  const { invoicesByStudent, loading: loadingInvoices } = useInvoices(students);

  // State pilihan filter anak ('ALL' atau ID anak tertentu)
  const [selectedStudentId, setSelectedStudentId] = useState('ALL');

  // Kalkulasi Total Tagihan dari API (Invoices yang belum lunas)
  const { totalAmount, totalUnpaidCount, activeStudent } = useMemo(() => {
    let sum = 0;
    let count = 0;

    const targetStudents = selectedStudentId === 'ALL'
      ? students
      : students.filter(s => s.id === selectedStudentId);

    targetStudents.forEach((student) => {
      (invoicesByStudent[student.id] || []).forEach((item) => {
        if (!item.isLunas) {
          sum += Number(item.nominal || 0);
          count += 1;
        }
      });
    });

    const current = selectedStudentId !== 'ALL' ? students.find(s => s.id === selectedStudentId) : null;

    return {
      totalAmount: sum > 0 ? sum : (selectedStudentId === 'ALL' ? 850000 : 500000), // Fallback dummy jika data kosong
      totalUnpaidCount: count > 0 ? count : 3,
      activeStudent: current
    };
  }, [students, invoicesByStudent, selectedStudentId]);

  const handlePayAction = (targetName) => {
    alert(`Mengarahkan ke Payment Gateway untuk pembayaran: ${targetName} sebesar ${formatRupiah(totalAmount)}`);
  };

  if (loadingStudents || loadingInvoices) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-slate-50">
        <div className="w-9 h-9 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-xs text-slate-500 font-medium">Memuat rincian tagihan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-28 text-slate-800 bg-slate-50 min-h-full">
      {/* 1. Header Banner Emerald (Konsisten dengan SppDashboardPage) */}
      <div className="bg-emerald-600 px-5 pt-6 pb-6 rounded-b-[2rem] shadow-lg text-white">
        <div className="flex items-center gap-3 mb-2">
          <Link to="/beranda" className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-colors text-white">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-extrabold text-white text-lg leading-tight">Detail Tagihan SPP</h1>
        </div>
        <p className="text-emerald-100 text-xs ml-12">Kelola dan selesaikan kewajiban pembayaran santri</p>
      </div>

      <div className="px-4 space-y-4">
        {/* 2. Selector Pilih Anak (Bayar per Anak / Semua) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
          <label className="text-xs font-bold text-slate-500 block mb-2 px-1">Pilih Tagihan Santri</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedStudentId('ALL')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${selectedStudentId === 'ALL'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              Semua Santri (Total)
            </button>
            {students.map((student) => {
              const name = student.full_name || student.name || student.nama || 'Santri';
              const isSelected = student.id === selectedStudentId;
              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Card Total Tagihan Utama (Data dari API) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-400 mb-1">
            {selectedStudentId === 'ALL' ? 'Total Seluruh Tagihan Aktif' : `Tagihan atas nama: ${activeStudent?.full_name || activeStudent?.name || 'Santri'}`}
          </p>
          <p className="text-3xl font-extrabold text-emerald-600">{formatRupiah(totalAmount)}</p>

          <div className="mt-3 inline-block">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
              Jatuh Tempo: 20 Agustus 2026
            </span>
          </div>

          {/* Rincian Item (Menggunakan data dummy karena endpoint detail item belum ada) */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Receipt size={16} />
              </div>
              <h3 className="text-xs font-bold text-slate-800">Rincian Komponen Tagihan</h3>
            </div>

            <div className="space-y-2.5">
              {dummyItemizedBills.map((bill, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-slate-500">{bill.title}</span>
                  <span className="text-slate-800 font-bold">{formatRupiah(bill.amount)}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-2.5 flex justify-between text-xs">
                <span className="text-slate-800 font-extrabold">Total Tagihan</span>
                <span className="text-emerald-600 font-extrabold">{formatRupiah(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Informasi Santri / Anak */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={16} />
            </div>
            <h3 className="text-xs font-bold text-slate-800">Informasi Santri</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Nama Santri</span>
              <span className="text-slate-800 font-bold">
                {selectedStudentId === 'ALL' ? 'Semua Anak Terdaftar (' + students.length + ' Santri)' : (activeStudent?.full_name || activeStudent?.name || activeStudent?.nama || '-')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kelas / Jenjang</span>
              <span className="text-slate-800 font-bold">
                {selectedStudentId === 'ALL' ? 'Gabungan Kelas' : (activeStudent?.class_name || activeStudent?.kelas || 'Kelas Reguler')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Periode Pembayaran</span>
              <span className="text-slate-800 font-bold">Agustus 2026</span>
            </div>
          </div>
        </div>

        {/* 5. Action Buttons (Bayar & Unduh Invoice) */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => handlePayAction(selectedStudentId === 'ALL' ? 'Semua Santri' : (activeStudent?.full_name || 'Santri'))}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <CreditCard size={18} />
            Bayar Sekarang ({selectedStudentId === 'ALL' ? 'Total Semua' : 'Pilih Anak Ini'})
          </button>

          <button
            onClick={() => alert('Mengunduh dokumen invoice dalam format PDF...')}
            className="w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <Download size={18} className="text-emerald-600" />
            Unduh Invoice Tagihan (.PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SppDetailPage;