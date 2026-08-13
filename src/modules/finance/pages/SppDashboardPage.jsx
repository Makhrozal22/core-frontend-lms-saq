import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';

import { useAuth } from '../../../hooks/useAuth';
import { useStudents } from '../../finance/hooks/useStudents';
import { useInvoices } from '../../finance/hooks/useInvoices';

// Komponen
import { TotalTagihanCard } from '../components/TotalTagihanCard';
import { DashboardDetails } from '../components/DashboardDetails';
import { CustomModal } from '../../../components/CustomModal'; // Path modal kustom
import { islamicQuotes } from '../../../utils/constants';

const getGreeting = () => {
  const h = new Date().getHours();
  return h < 11 ? 'Pagi' : h < 15 ? 'Siang' : h < 18 ? 'Sore' : 'Malam';
};

export const SppDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const carouselRef = useRef(null);

  const { students = [], loading: loadingStudents, error: errorStudents, refetch: refetchStudents } = useStudents();
  const { invoicesByStudent, loading: loadingInvoices, error: errorInvoices, refetchInvoices } = useInvoices(students);

  const [selectedStudentId, setSelectedStudentId] = useState('ALL');
  const [quoteIdx] = useState(() => Math.floor(Math.random() * islamicQuotes.length));

  // State untuk Modal Kustom di Tengah Layar
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '' });

  const handleFeatureClick = (featureName) => {
    setModalConfig({
      isOpen: true,
      title: `${featureName} Segera Hadir`,
      message: `Mohon bersabar, modul ${featureName} saat ini sedang dalam tahap pengembangan dan integrasi sistem.`
    });
  };

  // Filter & Kalkulasi Tagihan
  const filteredStudents = useMemo(() => {
    return selectedStudentId === 'ALL' ? students : students.filter((s) => s.id === selectedStudentId);
  }, [students, selectedStudentId]);

  const { totalAmount, totalUnpaidCount, selectedStudentName } = useMemo(() => {
    let sum = 0, count = 0;
    filteredStudents.forEach((student) => {
      (invoicesByStudent[student.id] || []).forEach((item) => {
        if (!item.isLunas) { sum += Number(item.nominal || 0); count += 1; }
      });
    });
    const current = selectedStudentId !== 'ALL' ? students.find((s) => s.id === selectedStudentId) : null;
    return { 
      totalAmount: sum, 
      totalUnpaidCount: count, 
      selectedStudentName: current?.full_name || current?.name || current?.nama || '' 
    };
  }, [filteredStudents, invoicesByStudent, selectedStudentId, students]);

  const scrollToChild = (id, idx) => {
    setSelectedStudentId(id);
    carouselRef.current?.children[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  if (loadingStudents || loadingInvoices) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] p-6">
        <div className="w-9 h-9 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-xs text-slate-500 font-medium">Memuat data santri & tagihan...</p>
      </div>
    );
  }

  if (errorStudents || errorInvoices) {
    return (
      <div className="p-4 mx-4 my-6 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3">
        <p className="text-xs text-rose-600 font-medium">{errorStudents || errorInvoices}</p>
        <button onClick={() => { refetchStudents(); refetchInvoices(); }} className="px-4 py-2 text-xs font-semibold bg-rose-100 text-rose-700 rounded-xl">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24 text-slate-800 bg-slate-50 min-h-full">
      {/* 1. Header Banner Emerald */}
      <div className="bg-emerald-600 px-5 pt-6 pb-6 rounded-b-[2rem] shadow-lg text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-emerald-100 text-xs">Selamat {getGreeting()},</p>
            <h1 className="font-extrabold text-white text-lg leading-tight">
              {user?.name || user?.nama || 'Wali Santri'} 👋
            </h1>
          </div>
          <button onClick={() => navigate('/notifications')} className="relative w-10 h-10 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-colors">
            <Bell size={20} className="text-white" />
            <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>
        </div>
        <div className="bg-white/10 rounded-2xl px-4 py-2.5 backdrop-blur-sm">
          <p className="text-emerald-100 text-xs italic text-center leading-relaxed">{islamicQuotes[quoteIdx]}</p>
        </div>
      </div>

      <div className="px-4">
        {/* 2. CARD TOTAL TAGIHAN UTAMA */}
        <TotalTagihanCard
          totalAmount={totalAmount}
          totalUnpaidCount={totalUnpaidCount}
          selectedStudentName={selectedStudentName}
          onPayNow={() => handleFeatureClick("Payment Gateway")}
        />
      </div>

      {/* 3. Detail Dashboard */}
      <DashboardDetails
        students={students}
        invoicesByStudent={invoicesByStudent}
        selectedStudentId={selectedStudentId}
        setSelectedStudentId={setSelectedStudentId}
        carouselRef={carouselRef}
        scrollToChild={scrollToChild}
        totalAmount={totalAmount}
        totalUnpaidCount={totalUnpaidCount}
        onFeatureClick={handleFeatureClick}
      />

      {/* 4. Modal Dialog Kustom (Menggantikan alert browser) */}
      <CustomModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig({ isOpen: false, title: '', message: '' })}
      />
    </div>
  );
};

export default SppDashboardPage;