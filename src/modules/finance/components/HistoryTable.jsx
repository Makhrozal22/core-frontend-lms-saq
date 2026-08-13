import React from 'react';
import { CheckCircle2, Clock, XCircle, FileText, ArrowUpRight } from 'lucide-react';

const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0);

export const HistoryTable = ({ transactions = [], onSelectTransaction }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-2 shadow-sm">
        <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-2">
          <FileText size={24} />
        </div>
        <p className="text-slate-800 font-bold text-sm">Belum Ada Riwayat Transaksi</p>
        <p className="text-slate-400 text-xs">Transaksi pembayaran SPP atau top-up akan muncul di sini.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
      {transactions.map((tx) => {
        const isSuccess = tx.status === 'Berhasil' || tx.status === 'SUCCESS' || tx.status === 'paid';
        
        return (
          <div 
            key={tx.id || tx.trx_id} 
            onClick={() => onSelectTransaction && onSelectTransaction(tx)}
            className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                isSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {isSuccess ? <CheckCircle2 size={18} /> : <Clock size={18} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-slate-800 text-xs font-bold truncate">{tx.title || tx.description || 'Pembayaran SPP'}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-slate-400 text-[10px] flex items-center gap-1">
                    <Clock size={11} />
                    {tx.date || tx.created_at || 'Hari ini'}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 text-[10px] font-medium">{tx.student_name || 'Santri'}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="font-extrabold text-slate-800 text-xs">{formatRupiah(tx.amount || tx.nominal)}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {tx.status || 'Berhasil'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};