import { useState, useEffect, useCallback } from 'react';
import { invoiceService } from '../services/invoiceService';

export const useInvoices = (students = []) => {
  // Map untuk menyimpan tagihan per studentId: { 1: [bill1, bill2], 2: [bill3] }
  const [invoicesByStudent, setInvoicesByStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllInvoices = useCallback(async () => {
    if (!students || students.length === 0) {
      setInvoicesByStudent({});
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Ambil tagihan untuk setiap anak secara bersamaan
      const requests = students.map((student) =>
        invoiceService.getInvoicesByStudent(student.id).then((bills) => ({
          studentId: student.id,
          bills,
        }))
      );

      const results = await Promise.all(requests);

      // Susun data menjadi object dictionary berdasarkan studentId
      const invoiceMap = {};
      results.forEach(({ studentId, bills }) => {
        invoiceMap[studentId] = bills;
      });

      setInvoicesByStudent(invoiceMap);
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError(
        err.response?.data?.message || 'Gagal memuat rincian tagihan anak.'
      );
    } finally {
      setLoading(false);
    }
  }, [students]);

  useEffect(() => {
    fetchAllInvoices();
  }, [fetchAllInvoices]);

  return {
    invoicesByStudent,
    loading,
    error,
    refetchInvoices: fetchAllInvoices,
  };
};

export default useInvoices;