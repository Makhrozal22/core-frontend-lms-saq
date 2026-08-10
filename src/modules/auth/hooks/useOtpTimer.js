import { useState, useEffect, useCallback } from 'react';

/**
 * Custom Hook internal modul Auth untuk mengelola hitung mundur timer OTP
 * @param {number} initialSeconds - Durasi timer awal dalam detik (default: 60)
 */
export const useOtpTimer = (initialSeconds = 60) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Jalankan timer
  const startTimer = useCallback((seconds = initialSeconds) => {
    setTimer(seconds);
  }, [initialSeconds]);

  // Reset timer ke 0
  const resetTimer = useCallback(() => {
    setTimer(0);
  }, []);

  return {
    timer,
    startTimer,
    resetTimer,
    isTimerActive: timer > 0,
  };
};

export default useOtpTimer;