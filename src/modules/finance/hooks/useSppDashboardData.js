import { useState, useMemo, useRef } from 'react';
import { useStudents } from '../../finance/hooks/useStudents';
import { useInvoices } from '../../finance/hooks/useInvoices';
import { islamicQuotes } from '../../../utils/constants';

export const useSppDashboardData = () => {
  const carouselRef = useRef(null);

  // 1. Menggunakan Hook Data Fetching Bawaan Anda
  const { 
    students = [], 
    loading: loadingStudents, 
    error: errorStudents, 
    refetch: refetchStudents 
  } = useStudents();

  const { 
    invoicesByStudent = {}, 
    loading: loadingInvoices, 
    error: errorInvoices, 
    refetchInvoices 
  } = useInvoices(students);

  // 2. UI Local State
  const [selectedStudentId, setSelectedStudentId] = useState('ALL');
  const [quoteIdx] = useState(() => Math.floor(Math.random() * (islamicQuotes?.length || 1)));
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '' });

  // 3. Normalisasi Data Students (Mencegah Crash jika Data berupa Object)
  const studentList = useMemo(() => {
    return Array.isArray(students) ? students : (students?.data || []);
  }, [students]);

  // 4. Filtering Santri Berdasarkan Tab
  const filteredStudents = useMemo(() => {
    return selectedStudentId === 'ALL' 
      ? studentList 
      : studentList.filter((s) => s.id === selectedStudentId);
  }, [studentList, selectedStudentId]);

  // 5. Kalkulasi Total Nominal Tagihan & Nama Santri
  const { totalAmount, totalUnpaidCount, selectedStudentName } = useMemo(() => {
    let sum = 0;
    let count = 0;

    filteredStudents.forEach((student) => {
      const invoices = invoicesByStudent[student.id] || [];
      if (Array.isArray(invoices)) {
        invoices.forEach((item) => {
          if (!item.isLunas) { 
            sum += Number(item.nominal || 0); 
            count += 1; 
          }
        });
      }
    });

    const current = selectedStudentId !== 'ALL' 
      ? studentList.find((s) => s.id === selectedStudentId) 
      : null;

    return { 
      totalAmount: sum, 
      totalUnpaidCount: count, 
      selectedStudentName: current?.full_name || current?.name || current?.nama || '' 
    };
  }, [filteredStudents, invoicesByStudent, selectedStudentId, studentList]);

  // 6. Handlers
  const handleFeatureClick = (featureName) => {
    setModalConfig({
      isOpen: true,
      title: `${featureName} Segera Hadir`,
      message: `Mohon bersabar, modul ${featureName} saat ini sedang dalam tahap pengembangan dan integrasi sistem.`
    });
  };

  const closeModal = () => setModalConfig({ isOpen: false, title: '', message: '' });

  const scrollToChild = (id, idx) => {
    setSelectedStudentId(id);
    carouselRef.current?.children[idx]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest', 
      inline: 'center' 
    });
  };

  const handleRefetch = () => {
    if (typeof refetchStudents === 'function') refetchStudents();
    if (typeof refetchInvoices === 'function') refetchInvoices();
  };

  return {
    // Data & Calculations
    students: studentList,
    invoicesByStudent,
    filteredStudents,
    totalAmount,
    totalUnpaidCount,
    selectedStudentName,
    quote: islamicQuotes ? islamicQuotes[quoteIdx] : '',
    loading: loadingStudents || loadingInvoices,
    error: errorStudents || errorInvoices,

    // UI State & Handlers
    selectedStudentId,
    setSelectedStudentId,
    modalConfig,
    carouselRef,
    refetch: handleRefetch,
    handleFeatureClick,
    closeModal,
    scrollToChild,
  };
};

export default useSppDashboardData;