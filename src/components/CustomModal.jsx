import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export const CustomModal = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-all animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 relative scale-100 animate-scaleUp">
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

        {/* Ikon Peringatan / Info */}
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <AlertCircle size={28} />
        </div>

        {/* Teks Konten */}
        <div className="space-y-1.5">
          <h3 className="text-base font-extrabold text-slate-800">{title || "Informasi Fitur"}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {message || "Fitur ini sedang dalam tahap pengembangan dan akan segera aktif pada pembaruan berikutnya."}
          </p>
        </div>

        {/* Tombol Aksi */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-emerald-600/20"
        >
          Baik, Mengerti
        </button>
      </div>
    </div>
  );
};