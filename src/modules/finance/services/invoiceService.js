import api from '../../../config/axios';

const bulanNames = [
  '',
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const invoiceService = {
  /**
   * Mengambil daftar invoice berdasarkan student
   */
  getInvoicesByStudent: async (studentId) => {
    if (!studentId) return [];

    const response = await api.get('/finance/invoices', {
      params: { student_id: studentId },
    });

    const rawData = response.data?.data || [];

    return rawData.map((item, idx) => {
      const nominal = item.total_amount || 0;

      const namaBulan =
        bulanNames[item.period_month] ||
        `Bulan ${item.period_month}`;

      const title = `SPP ${namaBulan} ${item.period_year || ''} (${item.invoice_number || 'Invoice'})`;

      const isLunas =
        item.status === 'paid' ||
        item.status === 'LUNAS' ||
        item.status === true;

      return {
        id: item.id || idx,
        title,
        nominal: Number(nominal),
        isLunas,
        dueDate: item.due_date,
        invoiceNumber: item.invoice_number,

        // Simpan informasi periode
        periodMonth: item.period_month,
        periodYear: item.period_year,

        // Status asli dari backend
        status: item.status,
      };
    });
  },

  /**
   * Mengambil detail satu invoice
   *
   * GET /finance/invoices/{invoice}
   */
  getInvoiceDetail: async (invoiceId) => {
    if (!invoiceId) return null;

    const response = await api.get(
      `/finance/invoices/${invoiceId}`
    );

    const data = response.data?.data;

    if (!data) return null;

    return {
      id: data.id,
      invoiceNumber: data.invoice_number,

      periodMonth: data.period_month,
      periodYear: data.period_year,

      dueDate: data.due_date,

      totalAmount: Number(data.total_amount || 0),
      paidAmount: Number(data.paid_amount || 0),
      remainingAmount: Number(data.remaining_amount || 0),

      status: data.status,

      items: Array.isArray(data.items)
        ? data.items.map((item) => ({
            itemName: item.item_name,
            amount: Number(item.amount || 0),
          }))
        : [],
    };
  },
};

export default invoiceService;