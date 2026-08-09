import React from 'react';
import { Link } from 'react-router-dom';

export const SppDetailPage = () => {
  return (
    <div>
      {/* Blue Header with Back Button */}
      <div className="bg-[#2A3A5C] px-6 pt-3 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <Link to="/beranda" className="text-white active:text-slate-300 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-white">Detail Tagihan</h1>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 pt-5 space-y-4">
        {/* Total Tagihan Card */}
        <div className="bg-[#222738] border border-slate-700/50 rounded-2xl p-5 text-center">
          <p className="text-xs text-slate-400 mb-1">Total Tagihan</p>
          <p className="text-3xl font-bold text-[#5B7EB5]">Rp 850.000</p>
          <div className="mt-3 inline-block">
            <span className="text-xs font-semibold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full">
              Jatuh tempo: 20 Jul 2025
            </span>
          </div>

          {/* Rincian Tagihan */}
          <div className="mt-5 pt-4 border-t border-slate-700/40 text-left">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-[#5B7EB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <h3 className="text-sm font-bold text-white">Rincian tagihan</h3>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">SPP Bulanan</span>
                <span className="text-white font-semibold">Rp 600.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Kegiatan ekskul</span>
                <span className="text-white font-semibold">Rp 150.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Buku & LKS</span>
                <span className="text-white font-semibold">Rp 100.000</span>
              </div>
              <div className="border-t border-slate-700/40 pt-2.5 flex justify-between text-sm">
                <span className="text-white font-bold">Total</span>
                <span className="text-[#5B7EB5] font-bold">Rp 850.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Anak */}
        <div className="bg-[#222738] border border-slate-700/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-[#5B7EB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <h3 className="text-sm font-bold text-white">Informasi anak</h3>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Nama anak</span>
              <span className="text-white font-semibold">Budi Santoso</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Kelas</span>
              <span className="text-white font-semibold">TK B — Kelas Matahari</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Periode</span>
              <span className="text-white font-semibold">Juli 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pt-5 pb-4 space-y-3">
        <button className="w-full py-3.5 rounded-2xl bg-[#5B7EB5] active:bg-[#4A6FA5] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-[#5B7EB5]/20">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
          Bayar Sekarang
        </button>

        <button className="w-full py-3.5 rounded-2xl bg-transparent border border-slate-600/60 text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 active:bg-slate-700/30 transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Unduh Invoice
        </button>
      </div>

      {/* Pull indicator */}
      <div className="flex justify-center py-3">
        <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </div>
  );
};

export default SppDetailPage;
