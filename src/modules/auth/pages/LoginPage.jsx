import React from 'react';
import { useAuthOtp } from '../hooks/useAuthOtp';
import { RequestOtpForm } from '../components/RequestOtpForm';
import { VerifyOtpForm } from '../components/VerifyOtpForm';

export const LoginPage = () => {
  const {
    step,
    phone,
    setPhone,
    otpCode,
    setOtpCode,
    loading,
    error,
    timer,
    handleRequestOtp,
    handleVerifyOtp,
    handleResendOtp,
    handleBackToPhone,
  } = useAuthOtp();

  return (
    <div className="flex-1 flex flex-col justify-between pt-4">
      {/* Top Banner & Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-6 pb-8">
        {/* Logo Shield Emerald Custom */}
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-4 transform hover:scale-105 transition-transform">
          <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
            <path d="M26 4C26 4 8 12 8 26C8 38.15 16.28 48 26 48C35.72 48 44 38.15 44 26C44 12 26 4 26 4Z" fill="#059669" />
            <path d="M26 10C26 10 14 16.5 14 26C14 34.84 19.37 42 26 42C32.63 42 38 34.84 38 26C38 16.5 26 10 26 10Z" fill="#047857" />
            <path d="M26 16C26 16 19 20.5 19 26C19 31.52 22.13 36 26 36C29.87 36 33 31.52 33 26C33 20.5 26 16 26 16Z" fill="#d4a853" />
            <circle cx="26" cy="26" r="4" fill="white" />
          </svg>
        </div>

        <h1 className="font-bold text-white text-2xl text-center mb-0.5 tracking-tight">
          Assalamu'alaikum
        </h1>
        <p className="text-emerald-100 text-sm font-medium text-center mb-1">
          SAQ Arrahman
        </p>
        <p className="text-white/70 text-xs text-center italic tracking-wide">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>
      </div>

      {/* Bottom Sheet Card Form */}
      <div className="bg-white rounded-t-[2.5rem] px-6 pt-7 pb-8 shadow-2xl">
        {/* Banner Alert Error */}
        {error && (
          <div className="mb-4 p-3.5 text-xs rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-start gap-2.5 animate-shake">
            <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {/* Form OTP Step */}
        {step === 'REQUEST_OTP' ? (
          <RequestOtpForm
            phone={phone}
            setPhone={setPhone}
            onSubmit={handleRequestOtp}
            loading={loading}
          />
        ) : (
          <VerifyOtpForm
            phone={phone}
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            onSubmit={handleVerifyOtp}
            onBack={handleBackToPhone}
            onResend={handleResendOtp}
            timer={timer}
            loading={loading}
          />
        )}

        {/* Footer info & SSL */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-100" />
          <p className="text-slate-300 text-[11px] uppercase tracking-wider font-semibold">Diproteksi SSL</p>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <p className="text-center text-slate-400 text-xs mt-3">
          Learning Manajemen Sistem - LMS
        </p>
      </div>
    </div>
  );
};

export default LoginPage;