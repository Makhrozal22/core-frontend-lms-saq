import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '../../../store/authStore';
import { RequestOtpForm } from '../components/RequestOtpForm';
import { VerifyOtpForm } from '../components/VerifyOtpForm';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.state?.setAuth || state.setAuth);

  const [step, setStep] = useState('REQUEST_OTP');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.requestOtp(phone);
      setStep('VERIFY_OTP');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.phone_number?.[0] ||
        'Gagal mengirim OTP. Pastikan nomor HP terdaftar.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await authService.verifyOtp(phone, otpCode);
      const token = res.token || res.access_token || res.data?.token || res.data?.access_token;
      const user = res.user || res.data?.user || res.data || { phone_number: phone };

      if (!token) throw new Error('Token tidak ditemukan dari server.');

      setAuth(token, user);
      navigate('/beranda', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.otp_code?.[0] ||
        'Verifikasi OTP gagal. Kode salah atau kadaluarsa.'
      );
    } finally {
      setLoading(false);
    }
  };

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
            onBack={() => {
              setStep('REQUEST_OTP');
              setError(null);
            }}
            loading={loading}
          />
        )}
      </div>

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