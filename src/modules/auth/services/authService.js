import api from '../../../config/api';

export const authService = {
  /**
   * Request OTP
   * @param {string} phoneNumber 
   * @param {string} actionType - 'login' | 'activation'
   */
  requestOtp: async (phoneNumber, actionType = 'login') => {
    try {
      const response = await api.post('/auth/otp/request', {
        phone_number: phoneNumber,
        action_type: actionType,
      });
      return response.data;
    } catch (error) {

      // Jika login gagal karena belum terdaftar, coba sekali saja via activation
      if (
        actionType === 'login' &&
        error.response?.data?.message?.toLowerCase().includes('belum terdaftar')
      ) {
        const responseActivation = await api.post('/auth/otp/request', {
          phone_number: phoneNumber,
          action_type: 'activation',
        });

        // Simpan flag agar verifyOtp tahu harus pakai 'activation'
        sessionStorage.setItem('otp_action_type', 'activation');
        return responseActivation.data;
      }

      sessionStorage.setItem('otp_action_type', 'login');
      throw error;
    }
  },

  /**
   * Verifikasi OTP
   * @param {string} phoneNumber 
   * @param {string} otpCode 
   */
  verifyOtp: async (phoneNumber, otpCode) => {
    
    // Ambil action_type yang sesuai dari hasil requestOtp (tanpa fallback ganda di catch)
    const actionType = sessionStorage.getItem('otp_action_type') || 'login';

    const response = await api.post('/auth/otp/verify', {
      phone_number: phoneNumber,
      otp_code: otpCode,
      action_type: actionType,
    });

    // Bersihkan session storage setelah berhasil
    sessionStorage.removeItem('otp_action_type');
    return response.data;
  },
};

export default authService;