import React, { useRef, useEffect } from 'react';

export const VerifyOtpForm = ({
  phone,
  otpCode,
  setOtpCode,
  onSubmit,
  onBack,
  onResend,
  timer,
  loading,
}) => {
  const inputRefs = useRef([]);
  const lastSubmittedOtp = useRef('');

  useEffect(() => {
    if (
      otpCode.length === 6 && 
      !loading && 
      lastSubmittedOtp.current !== otpCode
    ) {
      lastSubmittedOtp.current = otpCode; 
      onSubmit();
    }
  }, [otpCode, loading, onSubmit]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    lastSubmittedOtp.current = '';
    const newOtp = otpCode.split('');
    newOtp[index] = value.substring(value.length - 1);
    const combinedOtp = newOtp.join('');
    setOtpCode(combinedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      lastSubmittedOtp.current = '';
      if (!otpCode[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 animate-fadeIn">
      <div>
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-bold text-slate-800 text-xl">Verifikasi OTP</h2>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1 transition-colors cursor-pointer"
          >
            Ubah No HP
          </button>
        </div>
        <p className="text-slate-400 text-xs mb-4">
          Kode telah dikirim melalui WhatsApp ke <span className="font-semibold text-slate-700">{phone}</span>
        </p>

        {/* 6 Digit OTP Input Box */}
        <div className="flex justify-between gap-1.5 my-3">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otpCode[index] || ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={loading}
              className="w-11 h-12 text-center text-lg font-bold bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white disabled:opacity-50 transition-all"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="mt-3 text-center">
          {timer > 0 ? (
            <p className="text-xs text-slate-400">
              Kirim ulang kode dalam{' '}
              <span className="font-semibold text-emerald-600">{formatTime(timer)}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={loading}
              className="text-xs font-semibold text-emerald-600 hover:underline disabled:opacity-50 cursor-pointer transition-colors"
            >
              Tidak terima kode? Kirim Ulang OTP
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || otpCode.length < 6}
        className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-600/25 cursor-pointer"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
        ) : (
          <span>Verifikasi & Masuk</span>
        )}
      </button>
    </form>
  );
};

export default VerifyOtpForm;