import api from '../../../config/api';

export const authService = {
  /**
   * Request OTP
   * @param {string} phoneNumber 
   * @param {string} actionType - 
   */
  requestOtp: async (phoneNumber, actionType = 'login') => {
    try {
      // 1. request dengan action_type 'login' 
      const response = await api.post('/auth/otp/request', {
        phone_number: phoneNumber,
        action_type: actionType,
      });
      return response.data;
    } catch (error) {
      // 2. Jika gagal karena belum terdaftar di users, otomatis sebagai 'activation'
      if (
        actionType === 'login' &&
        error.response?.data?.message?.toLowerCase().includes('belum terdaftar')
      ) {
        const responseActivation = await api.post('/auth/otp/request', {
          phone_number: phoneNumber,
          action_type: 'activation',
        });
        return responseActivation.data;
      }
      throw error;
    }
  },

  /**
   * Verifikasi OTP
   */
  verifyOtp: async (phoneNumber, otpCode, actionType = 'login') => {
    try {
      const response = await api.post('/auth/otp/verify', {
        phone_number: phoneNumber,
        otp_code: otpCode,
        action_type: actionType,
      });
      return response.data;
    } catch (error) {
      // Fallback ke activation jika login biasa gagal
      if (actionType === 'login') {
        const responseActivation = await api.post('/auth/otp/verify', {
          phone_number: phoneNumber,
          otp_code: otpCode,
          action_type: 'activation',
        });
        return responseActivation.data;
      }
      throw error;
    }
  },
};

export default authService;