import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

export const SppDashboardPage = () => {
  const { user } = useOutletContext();
  const userName = user?.name || 'Wali Santri';

  return (
    <div>
      {/* Blue Header Area */}
      <div className="bg-[#2A3A5C] px-6 pt-3 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-slate-300">Selamat datang,</p>
            <h1 className="text-xl font-bold text-white">{userName} 👋</h1>
          </div>
          {/* Notification Bell */}
          <div className="relative">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#2A3A5C]"></span>
          </div>
        </div>

        {/* Tagihan Bulan Ini Card */}
        <div className="bg-[#3A5080] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-300">Tagihan bulan ini</p>
              <p className="text-2xl font-bold text-white mt-0.5">Rp 850.000</p>
            </div>
            <span className="text-xs font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2.5 py-1 rounded-lg">
              Belum lunas
            </span>
          </div>
          <Link
            to="/tagihan"
            className="w-full py-2.5 rounded-xl bg-white/15 backdrop-blur-sm text-white text-sm font-semibold flex items-center justify-center gap-2 active:bg-white/25 transition-colors"
          >
            {/* Payment icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
            Bayar Sekarang
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 -mt-0">
        <div className="grid grid-cols-2 gap-3 pt-4">
          <div className="bg-[#222738] border border-slate-700/50 rounded-2xl p-4">
            <p className="text-2xl font-bold text-[#5B7EB5]">3</p>
            <div className="flex items-center gap-1.5 mt-1">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span className="text-xs text-slate-400">Tagihan aktif</span>
            </div>
          </div>
          <div className="bg-[#222738] border border-slate-700/50 rounded-2xl p-4">
            <p className="text-2xl font-bold text-[#5B7EB5]">12</p>
            <div className="flex items-center gap-1.5 mt-1">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-xs text-slate-400">Sudah dibayar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pengumuman Terbaru */}
      <div className="px-6 pt-5">
        <div className="bg-[#222738] border border-slate-700/50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-[#5B7EB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
            </svg>
            <h2 className="text-sm font-bold text-white">Pengumuman terbaru</h2>
          </div>

          {/* Pengumuman Item 1 */}
          <div className="flex items-start gap-3 py-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">SPP Juli 2025 sudah dapat dibayar</p>
              <p className="text-xs text-slate-400 mt-0.5">2 hari lalu</p>
            </div>
          </div>

          <div className="border-t border-slate-700/40"></div>

          {/* Pengumuman Item 2 */}
          <div className="flex items-start gap-3 py-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Tagihan kegiatan akhir tahun</p>
              <p className="text-xs text-slate-400 mt-0.5">5 hari lalu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Riwayat Pembayaran */}
      <div className="px-6 pt-5 pb-4">
        <div className="bg-[#222738] border border-slate-700/50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-[#5B7EB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h2 className="text-sm font-bold text-white">Riwayat pembayaran</h2>
          </div>

          {/* Riwayat Item 1 */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#5B7EB5]/20 border border-[#5B7EB5]/30 flex items-center justify-center">
                <span className="text-xs font-bold text-[#5B7EB5]">6</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">SPP Juni 2025</p>
                <p className="text-xs text-slate-400">15 Jun 2025</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#5B7EB5] bg-[#5B7EB5]/10 border border-[#5B7EB5]/30 px-2.5 py-1 rounded-lg">
              Lunas
            </span>
          </div>

          <div className="border-t border-slate-700/40"></div>

          {/* Riwayat Item 2 */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#5B7EB5]/20 border border-[#5B7EB5]/30 flex items-center justify-center">
                <span className="text-xs font-bold text-[#5B7EB5]">5</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">SPP Mei 2025</p>
                <p className="text-xs text-slate-400">10 Mei 2025</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#5B7EB5] bg-[#5B7EB5]/10 border border-[#5B7EB5]/30 px-2.5 py-1 rounded-lg">
              Lunas
            </span>
          </div>

          {/* Lihat Semua Riwayat */}
          <Link
            to="/riwayat"
            className="mt-2 w-full py-2.5 rounded-xl border border-slate-600/60 text-slate-300 text-sm font-medium flex items-center justify-center gap-2 active:bg-slate-700/30 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            Lihat semua riwayat
          </Link>
        </div>
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

export default SppDashboardPage;
