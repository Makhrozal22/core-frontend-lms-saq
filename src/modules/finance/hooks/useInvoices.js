import { useState, useEffect, useCallback } from 'react';
import { invoiceService } from '../services/invoiceService';

export const useInvoices = (students = []) => {
  const [invoicesByStudent, setInvoicesByStudent] = useState({});
  const [invoiceDetailsById, setInvoiceDetailsById] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [error, setError] = useState(null);
  const [detailError, setDetailError] = useState(null);

  /**
   * Mengambil daftar invoice semua student
   */
  const fetchAllInvoices = useCallback(async () => {
    if (!students || students.length === 0) {
      setInvoicesByStudent({});
      setInvoiceDetailsById({});
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const requests = students.map((student) =>
        invoiceService
          .getInvoicesByStudent(student.id)
          .then((bills) => ({
            studentId: student.id,
            bills,
          }))
      );

      const results = await Promise.all(requests);

      const invoiceMap = {};

      results.forEach(({ studentId, bills }) => {
        invoiceMap[studentId] = bills;
      });

      setInvoicesByStudent(invoiceMap);

      /**
       * Ambil semua invoice unik
       */
      const allInvoices = results.flatMap(
        ({ bills }) => bills
      );

      const uniqueInvoices = Array.from(
        new Map(
          allInvoices.map((invoice) => [
            invoice.id,
            invoice,
          ])
        ).values()
      );

      /**
       * Ambil detail masing-masing invoice
       */
      if (uniqueInvoices.length > 0) {
        setLoadingDetails(true);
        setDetailError(null);

        try {
          const detailResults = await Promise.all(
            uniqueInvoices.map(async (invoice) => {
              const detail =
                await invoiceService.getInvoiceDetail(
                  invoice.id
                );

              return {
                id: invoice.id,
                detail,
              };
            })
          );

          const detailMap = {};

          detailResults.forEach(({ id, detail }) => {
            if (detail) {
              detailMap[id] = detail;
            }
          });

          setInvoiceDetailsById(detailMap);
        } catch (err) {
          console.error(
            'Error fetching invoice details:',
            err
          );

          setDetailError(
            err.response?.data?.message ||
              'Gagal memuat rincian invoice.'
          );
        } finally {
          setLoadingDetails(false);
        }
      } else {
        setInvoiceDetailsById({});
      }
    } catch (err) {
      console.error('Error fetching invoices:', err);

      setError(
        err.response?.data?.message ||
          'Gagal memuat rincian tagihan anak.'
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

    // Detail invoice berdasarkan ID
    invoiceDetailsById,

    loading,
    loadingDetails,

    error,
    detailError,

    refetchInvoices: fetchAllInvoices,
  };
};

export default useInvoices;