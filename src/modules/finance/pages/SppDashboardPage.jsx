import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useSppDashboardData } from '../hooks/useSppDashboardData';

// Komponen UI
import { HeaderBanner } from '../components/HeaderBanner';
import { TotalTagihanCard } from '../components/TotalTagihanCard';
import { DashboardDetails } from '../components/DashboardDetails';
import { CustomModal } from '../../../components/CustomModal';

export const SppDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mengambil seluruh state & handler dari Custom Hook
  const {
    students,
    invoicesByStudent,
    totalAmount,
    totalUnpaidCount,
    selectedStudentName,
    quote,
    loading,
    error,
    selectedStudentId,
    setSelectedStudentId,
    modalConfig,
    carouselRef,
    refetch,
    handleFeatureClick,
    closeModal,
    scrollToChild,
  } = useSppDashboardData();

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] p-6">
        <div className="w-9 h-9 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-xs text-slate-500 font-medium">Memuat data santri & tagihan...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="p-4 mx-4 my-6 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3">
        <p className="text-xs text-rose-600 font-medium">{error}</p>
        <button 
          onClick={refetch} 
          className="px-4 py-2 text-xs font-semibold bg-rose-100 text-rose-700 rounded-xl"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // 3. Main View Render
  return (
    <div className="space-y-4 pb-24 text-slate-800 bg-slate-50 min-h-full">
      {/* Header Banner Emerald */}
      <HeaderBanner 
        user={user} 
        quote={quote} 
        onNotificationClick={() => navigate('/notifications')} 
      />

      <div className="px-4">
        {/* Card Total Tagihan Utama */}
        <TotalTagihanCard
          totalAmount={totalAmount}
          totalUnpaidCount={totalUnpaidCount}
          selectedStudentName={selectedStudentName}
          onPayNow={() => handleFeatureClick("Payment Gateway")}
        />
      </div>

      {/* Detail Dashboard */}
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

      {/* Modal Dialog Kustom */}
      <CustomModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={closeModal}
      />
    </div>
  );
};

export default SppDashboardPage;