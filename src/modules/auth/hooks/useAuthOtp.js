import { useState } from 'react';

export const useAuthOtp = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setStep(1);
    setPhone('');
    setOtp('');
    setLoading(false);
    setError(null);
  };

  return {
    step,
    setStep,
    phone,
    setPhone,
    otp,
    setOtp,
    loading,
    setLoading,
    error,
    setError,
    resetForm,
  };
};

export default useAuthOtp;
