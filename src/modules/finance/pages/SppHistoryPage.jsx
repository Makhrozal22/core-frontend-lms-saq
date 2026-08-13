import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Receipt } from 'lucide-react';
import { HistoryTable } from '../components/HistoryTable';

// Dummy data riwayat transaksi (Siap diganti integrasi API)
const mockHistoryData = [
  { id: 'TX-101', title: 'Pembayaran SPP Bulan Agustus 2026', date: '10 Aug 2026, 09:30', amount: 350000, status: 'Berhasil', student_name: 'Budi Santoso' },
  { id: 'TX-102', title: 'Topup Saldo Jajan Kantin', date: '08 Aug 2026, 14:15', amount: 50000, status: 'Berhasil', student_name: 'Budi Santoso' },
  { id: 'TX-103', title: 'Pembayaran Uang Gedung / Masuk', date: '01 Aug 2026, 11:00', amount: 500000, status: 'Berhasil', student_name: 'Siti Aminah' },
  { id: 'TX-104', title: 'Pembayaran SPP Bulan Juli 2026', date: '05 Jul 2026, 10:20', amount: 350000, status: 'Berhasil', student_name: 'Budi Santoso' },
];

export const SppHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Filter transaksi berdasarkan pencarian judul/nama santri
  const filteredTransactions = useMemo(() => {
    return mockHistoryData.filter((tx) => {
      const matchQuery = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tx.student_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === 'ALL' || tx.status === filterStatus;
      return matchQuery && matchStatus;
    });
  }, [searchQuery, filterStatus]);

  const handleSelectTransaction = (tx) => {
    alert(`Menampilkan detail struk transaksi: ${tx.id} - ${tx.title}`);
  };

  return (
    <div className="space-y-4 pb-28 text-slate-800 bg-slate-50 min-h-full">
      {/* 1. Header Banner Emerald (Konsisten dengan halaman lain) */}
      <div className="bg-emerald-600 px-5 pt-6 pb-6 rounded-b-[2rem] shadow-lg text-white">
        <div className="flex items-center gap-3 mb-2">
          <Link to="/beranda" className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-colors text-white">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-extrabold text-white text-lg leading-tight">Riwayat Transaksi</h1>
        </div>
        <p className="text-emerald-100 text-xs ml-12">Catatan seluruh pembayaran dan mutasi dana santri</p>
      </div>

      <div className="px-4 space-y-4">
        {/* 2. Filter & Search Bar */}
        <div className="space-y-2.5">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari transaksi atau nama santri..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 shadow-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['ALL', 'Berhasil', 'Pending'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {status === 'ALL' ? 'Semua Status' : status}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Daftar Histori Menggunakan Komponen HistoryTable */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-slate-500">Daftar Mutasi ({filteredTransactions.length})</span>
          </div>

          <HistoryTable 
            transactions={filteredTransactions} 
            onSelectTransaction={handleSelectTransaction} 
          />
        </div>
      </div>
    </div>
  );
};

export default SppHistoryPage;