/**
 * Helper Format Rupiah
 * @param {number} val - Nominal angka
 * @returns {string} String format Rupiah (contoh: Rp 10.000)
 */
export const formatRupiah = (val) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val || 0);
};
