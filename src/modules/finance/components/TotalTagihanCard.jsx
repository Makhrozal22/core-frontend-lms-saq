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
    <div className="relative overflow-hidden p-5 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-3xl shadow-lg shadow-emerald-700/20 space-y-4">
      {/* Decorative Light Effect */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="text-xs font-medium text-emerald-100">
            Total Kewajiban Tagihan {selectedStudentName ? `(${selectedStudentName})` : ''}
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight mt-1">
            {formatRupiah(totalAmount)}
          </h2>
        </div>

        {totalUnpaidCount > 0 ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-200 border border-amber-300/30 backdrop-blur-sm">
            {totalUnpaidCount} Tagihan Belum Lunas
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 text-emerald-100 border border-white/30 backdrop-blur-sm">
            Lunas Semua ✨
          </span>
        )}
      </div>

      <div className="pt-3 flex items-center justify-between border-t border-white/15 relative z-10">
        <p className="text-xs text-emerald-100/90 font-medium max-w-[200px] leading-tight">
          {totalUnpaidCount > 0
            ? 'Selesaikan pembayaran secara online melalui payment gateway'
            : 'Seluruh tagihan santri periode ini telah lunas.'}
        </p>

        {totalUnpaidCount > 0 && (
          <button
            type="button"
            onClick={onPayNow}
            className="px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <span>Bayar Sekarang</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default TotalTagihanCard;