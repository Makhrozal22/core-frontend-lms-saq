import React from 'react';

export const TotalTagihanCard = ({ totalAmount, totalUnpaidCount, selectedStudentName, onPayNow }) => {
  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <div className="relative overflow-hidden p-5 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-2xl shadow-xl space-y-4">
      {/* Background Glow */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-medium text-emerald-400/80">
            Total Tagihan {selectedStudentName ? `(${selectedStudentName})` : ''}
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight mt-1">
            {formatRupiah(totalAmount)}
          </h2>
        </div>
        
        {totalUnpaidCount > 0 ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            {totalUnpaidCount} Belum Lunas
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            Alhamdulillah Lunas ✨
          </span>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <p className="text-xs text-slate-400">
          {totalUnpaidCount > 0
            ? 'Silakan selesaikan pembayaran tagihan di bawah'
            : 'Semua kewajiban pembayaran telah terpenuhi.'}
        </p>

        {totalUnpaidCount > 0 && (
          <button
            type="button"
            onClick={onPayNow}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-900/40 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>Bayar Sekarang</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TotalTagihanCard;