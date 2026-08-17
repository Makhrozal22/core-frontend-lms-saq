import React from 'react';
import { Fingerprint } from 'lucide-react';

export const RequestOtpForm = ({ phone, setPhone, onSubmit, loading, showModal }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 animate-fadeIn">
      <div>
        <h2 className="font-bold text-slate-800 text-xl mb-1">Masuk</h2>
        <p className="text-slate-400 text-xs mb-5">
          Masukkan nomor HP WhatsApp yang terdaftar
        </p>

        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <input
            type="tel"
            placeholder="08123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-emerald-500 focus:outline-none text-slate-800 font-medium text-sm transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !phone}
        className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer shadow-lg shadow-emerald-600/25"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>Kirim Kode OTP</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-slate-300 text-[11px] font-semibold uppercase tracking-wider">atau</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* Biometric Button */}
      <button
        type="button"
        onClick={() => showModal('Keamanan & Biometrik', 'Fitur Biometrik / Fingerprint akan segera aktif pada pembaruan berikutnya!')}
        className="
    w-full
    flex items-center justify-center gap-3
    py-3.5
    rounded-2xl
    border-2 border-slate-100
    bg-white
    text-slate-500
    hover:border-emerald-200
    hover:bg-emerald-50/50
    hover:text-emerald-700
    font-semibold text-xs
    transition-all duration-200
    cursor-pointer
    group
  "
      >
        <Fingerprint
          size={22}
          strokeWidth={1.8}
          className="
      text-slate-400
      group-hover:text-emerald-600
      transition-colors duration-200
      flex-shrink-0
    "
        />

        <span>Masuk dengan Fingerprint</span>
      </button>
    </form>
  );
};

export default RequestOtpForm;