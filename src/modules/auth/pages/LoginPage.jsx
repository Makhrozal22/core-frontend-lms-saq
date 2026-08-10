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
    <div className="flex-1 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Banner Alert Error */}
        {error && (
          <div className="p-3 text-xs rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-start gap-2 animate-shake">
            <svg className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Kondisional Render Form */}
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
      </div>

      {/* Footer Info */}
      <div className="mt-6 pb-2">
        <p className="text-center text-sm text-slate-400">
          Belum punya akun?{' '}
          <span className="text-[#5B7EB5] font-semibold cursor-pointer hover:underline">
            Hubungi admin sekolah
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;