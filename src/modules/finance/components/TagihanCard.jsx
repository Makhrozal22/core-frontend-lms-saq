import React from 'react';

export const TagihanCard = ({ student, bills = [] }) => {
  const name = student?.full_name || student?.name || student?.nama || 'Nama Santri';
  const nis = student?.nisn || student?.nis || '-';
  const kelas = student?.class_name || student?.kelas || '-';

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <div className="p-4 bg-slate-800/60 border border-slate-700/80 rounded-2xl space-y-3.5 shadow-lg transition-all hover:border-emerald-500/30">
      {/* Header Profile Santri */}
      <div className="flex items-center justify-between border-b border-slate-700/50 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-snug">{name}</h3>
            <p className="text-xs text-slate-400">NISN: {nis} • Kelas: {kelas}</p>
          </div>
        </div>
      </div>

      {/* Rincian Item Tagihan */}
      <div className="space-y-2">
        {bills.length > 0 ? (
          bills.map((item, idx) => (
            <div
              key={item?.id || idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.isLunas ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <span className="font-medium text-slate-200">{item.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className={`font-semibold ${item.isLunas ? 'text-slate-400 line-through' : 'text-rose-300'}`}>
                  {formatRupiah(item.nominal)}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    item.isLunas
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {item.isLunas ? 'Lunas' : 'Belum Bayar'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center bg-slate-900/30 rounded-xl border border-slate-800 text-xs text-emerald-400 font-medium">
            ✨ Alhamdulillah tidak ada tunggakan tagihan
          </div>
        )}
      </div>
    </div>
  );
};

export default TagihanCard;