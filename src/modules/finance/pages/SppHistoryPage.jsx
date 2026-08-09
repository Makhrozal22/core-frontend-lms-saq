import React from 'react';
import { Link } from 'react-router-dom';

export const SppHistoryPage = () => {
  const historyItems = [
    { bulan: 6, label: 'SPP Juni 2025', tanggal: '15 Jun 2025', status: 'Lunas' },
    { bulan: 5, label: 'SPP Mei 2025', tanggal: '10 Mei 2025', status: 'Lunas' },
    { bulan: 4, label: 'SPP April 2025', tanggal: '08 Apr 2025', status: 'Lunas' },
    { bulan: 3, label: 'SPP Maret 2025', tanggal: '05 Mar 2025', status: 'Lunas' },
    { bulan: 2, label: 'SPP Februari 2025', tanggal: '12 Feb 2025', status: 'Lunas' },
    { bulan: 1, label: 'SPP Januari 2025', tanggal: '07 Jan 2025', status: 'Lunas' },
  ];

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
          <h1 className="text-lg font-bold text-white">Riwayat Pembayaran</h1>
        </div>
      </div>

      {/* History List */}
      <div className="px-6 pt-5 pb-4">
        <div className="bg-[#222738] border border-slate-700/50 rounded-2xl p-4">
          {historyItems.map((item, index) => (
            <div key={item.bulan}>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5B7EB5]/20 border border-[#5B7EB5]/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#5B7EB5]">{item.bulan}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.tanggal}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#5B7EB5] bg-[#5B7EB5]/10 border border-[#5B7EB5]/30 px-2.5 py-1 rounded-lg">
                  {item.status}
                </span>
              </div>
              {index < historyItems.length - 1 && (
                <div className="border-t border-slate-700/40"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SppHistoryPage;
