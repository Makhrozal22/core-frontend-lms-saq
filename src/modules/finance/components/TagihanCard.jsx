import React from 'react';
import { User, GraduationCap } from 'lucide-react';

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
    <div className="p-4 bg-white border border-slate-100 rounded-3xl space-y-3.5 shadow-sm transition-all hover:border-emerald-200">
      {/* Header Profile Santri */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold text-sm flex items-center justify-center shrink-0">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 leading-snug">{name}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <span>NISN: {nis}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-slate-500 font-medium">
                <GraduationCap size={12} className="text-emerald-600" /> Kelas: {kelas}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Rincian Item Tagihan */}
      <div className="space-y-2">
        {bills.length > 0 ? (
          bills.map((item, idx) => (
            <div
              key={item?.id || idx}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.isLunas ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span className="font-semibold text-slate-700">{item.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className={`font-bold ${item.isLunas ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {formatRupiah(item.nominal)}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    item.isLunas
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-600'
                  }`}
                >
                  {item.isLunas ? 'Lunas ✓' : 'Belum Bayar'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs text-emerald-700 font-semibold">
            ✨ Alhamdulillah, tidak ada tunggakan tagihan untuk santri ini.
          </div>
        )}
      </div>
    </div>
  );
};

export default TagihanCard;