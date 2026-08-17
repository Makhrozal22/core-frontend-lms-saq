import { useState, useMemo } from 'react';
import { useStudents } from './useStudents';
import { useInvoices } from './useInvoices';
import { formatRupiah } from '../../../utils/formatRupiah';

export const useSppDetail = () => {
  const { students = [], loading: loadingStudents } = useStudents();
  const { invoicesByStudent, invoiceDetailsById, loading: loadingInvoices, loadingDetails } = useInvoices(students);

  const [selectedStudentId, setSelectedStudentId] = useState('ALL');

  const nextDueDate = useMemo(() => {
    const targetStudents =
      selectedStudentId === 'ALL'
        ? students
        : students.filter((s) => s.id === selectedStudentId);

    const dates = targetStudents
      .flatMap((student) => invoicesByStudent[student.id] || [])
      .filter((invoice) => !invoice.isLunas)
      .map((invoice) => invoice.dueDate)
      .filter(Boolean)
      .sort();

    return dates[0] || null;
  }, [students, invoicesByStudent, selectedStudentId]);

  const { totalAmount, totalUnpaidCount, activeStudent } = useMemo(() => {
    let sum = 0;
    let count = 0;

    const targetStudents =
      selectedStudentId === 'ALL'
        ? students
        : students.filter((s) => s.id === selectedStudentId);

    targetStudents.forEach((student) => {
      (invoicesByStudent[student.id] || []).forEach((item) => {
        if (!item.isLunas) {
          sum += Number(item.nominal || 0);
          count += 1;
        }
      });
    });

    const current = selectedStudentId !== 'ALL' ? students.find((s) => s.id === selectedStudentId) : null;

    return {
      totalAmount: sum > 0 ? sum : selectedStudentId === 'ALL' ? 850000 : 500000,
      totalUnpaidCount: count > 0 ? count : 3,
      activeStudent: current,
    };
  }, [students, invoicesByStudent, selectedStudentId]);

  const targetInvoices = useMemo(() => {
    const targetStudents =
      selectedStudentId === 'ALL'
        ? students
        : students.filter((s) => s.id === selectedStudentId);

    return targetStudents.flatMap((student) =>
      (invoicesByStudent[student.id] || [])
        .filter((invoice) => !invoice.isLunas)
        .map((invoice) => ({
          ...invoice,
          student,
        }))
    );
  }, [students, invoicesByStudent, selectedStudentId]);

  const handlePayAction = (targetName) => {
    alert(`Mengarahkan ke Payment Gateway untuk pembayaran: ${targetName} sebesar ${formatRupiah(totalAmount)}`);
  };

  const handleDownloadInvoice = () => {
    alert('Mengunduh dokumen invoice dalam format PDF...');
  };

  return {
    students,
    loadingStudents,
    loadingInvoices,
    loadingDetails,
    selectedStudentId,
    setSelectedStudentId,
    nextDueDate,
    totalAmount,
    totalUnpaidCount,
    activeStudent,
    targetInvoices,
    invoiceDetailsById,
    handlePayAction,
    handleDownloadInvoice,
  };
};
