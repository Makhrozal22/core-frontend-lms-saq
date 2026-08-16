import React from 'react';
import { useAuthOtp } from '../hooks/useAuthOtp';
import { RequestOtpForm } from '../components/RequestOtpForm';
import { VerifyOtpForm } from '../components/VerifyOtpForm';
import logoImg from '@/assets/aic.png';

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
        {/* Logo */}
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-4 transform hover:scale-105 transition-transform overflow-hidden">
          <img
            src={logoImg}
            alt="Logo SAQ Arrahman"
            className="w-14 h-14 object-contain"
          />
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

        <p className="text-center text-slate-400 text-xs mt-3">
          Belum punya akun? 
          <a href="#" className="text-emerald-500 hover:text-emerald-600 font-semibold"> Hubungi pihak sekolah</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;