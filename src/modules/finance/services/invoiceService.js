import api from '../../../config/axios';

export const invoiceService = {
  getInvoicesByStudent: async (studentId) => {
    if (!studentId) return [];
    
    const response = await api.get('/finance/invoices', {
      params: { student_id: studentId },
    });
    
    // Karena response Laravel menggunakan pagination (ada format { data: [...], links: {...}, meta: {...} }),
    // maka list data aslinya berada di dalam response.data.data
    const rawData = response.data?.data || [];

    // Mapping agar sesuai dengan kebutuhan komponen UI Frontend
    return rawData.map((item, idx) => {
      // 1. Ambil nominal dari field 'total_amount'
      const nominal = item.total_amount || 0;

      // 2. Buat judul deskriptif dari invoice_number & bulan/tahun periode
      const bulanNames = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const namaBulan = bulanNames[item.period_month] || `Bulan ${item.period_month}`;
      const title = `SPP ${namaBulan} ${item.period_year || ''} (${item.invoice_number || 'Invoice'})`;

      // 3. Deteksi status lunas dari field 'status' ('unpaid' vs 'paid')
      const isLunas = item.status === 'paid' || item.status === 'LUNAS' || item.status === true;

      return {
        id: item.id || idx,
        title,
        nominal: Number(nominal),
        isLunas,
        dueDate: item.due_date,
        invoiceNumber: item.invoice_number,
      };
    });
  },
};

export default invoiceService;