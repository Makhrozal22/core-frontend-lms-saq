import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '../../../store/authStore';
import { useOtpTimer } from './useOtpTimer';

export const useAuthOtp = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.state?.setAuth || state.setAuth);

  const [step, setStep] = useState('REQUEST_OTP');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { timer, startTimer, resetTimer } = useOtpTimer(60);

  // Handler Request OTP
  const handleRequestOtp = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.requestOtp(phone);
      setStep('VERIFY_OTP');
      startTimer(60);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.phone_number?.[0] ||
        'Gagal mengirim OTP. Pastikan nomor HP terdaftar.'
      );
    } finally {
      setLoading(false);
    }
  }, [phone, startTimer]);

  // Handler Kirim Ulang OTP
  const handleResendOtp = useCallback(async () => {
    if (timer > 0 || loading) return;
    setOtpCode('');
    await handleRequestOtp();
  }, [timer, loading, handleRequestOtp]);

  // Handler Verifikasi OTP
  const handleVerifyOtp = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (loading) return;

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
  }, [loading, phone, otpCode, setAuth, navigate]);

  const handleBackToPhone = useCallback(() => {
    setStep('REQUEST_OTP');
    setOtpCode('');
    setError(null);
    resetTimer();
  }, [resetTimer]);

  return {
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
  };
};

export default useAuthOtp;