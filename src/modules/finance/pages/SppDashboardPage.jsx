import React, { useState, useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useStudents } from '../../finance/hooks/useStudents';
import { useInvoices } from '../../finance/hooks/useInvoices';

// Komponen modular yang sudah dipisah
import { ChildSelector } from '../components/ChildSelector';
import { TotalTagihanCard } from '../components/TotalTagihanCard';
import { TagihanCard } from '../components/TagihanCard';

export const SppDashboardPage = () => {
  const { user } = useAuth();

  // 1. Ambil data daftar anak & tagihan
  const { students = [], loading: loadingStudents, error: errorStudents, refetch: refetchStudents } = useStudents();
  const { invoicesByStudent, loading: loadingInvoices, error: errorInvoices, refetchInvoices } = useInvoices(students);

  const [selectedStudentId, setSelectedStudentId] = useState('ALL');

  // Filter Anak berdasarkan tab yang dipilih
  const filteredStudents = useMemo(() => {
    if (selectedStudentId === 'ALL') return students;
    return students.filter((s) => s.id === selectedStudentId);
  }, [students, selectedStudentId]);

  // Kalkulasi Total Tagihan Belum Lunas
  const { totalAmount, totalUnpaidCount, selectedStudentName } = useMemo(() => {
    let sum = 0;
    let count = 0;

    filteredStudents.forEach((student) => {
      const studentBills = invoicesByStudent[student.id] || [];
      studentBills.forEach((item) => {
        if (!item.isLunas) {
          sum += Number(item.nominal || 0);
          count += 1;
        }
      });
    });

    let name = '';
    if (selectedStudentId !== 'ALL') {
      const current = students.find((s) => s.id === selectedStudentId);
      name = current?.full_name || current?.name || current?.nama || '';
    }

    return { totalAmount: sum, totalUnpaidCount: count, selectedStudentName: name };
  }, [filteredStudents, invoicesByStudent, selectedStudentId, students]);

  const isLoading = loadingStudents || loadingInvoices;
  const isError = errorStudents || errorInvoices;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] p-6">
        <div className="w-9 h-9 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-xs text-slate-400 font-medium">Memuat data santri & tagihan...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 mx-4 my-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-center space-y-3">
        <p className="text-xs text-rose-300">{errorStudents || errorInvoices}</p>
        <button
          onClick={() => { refetchStudents(); refetchInvoices(); }}
          className="px-4 py-2 text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 rounded-xl transition-colors cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4 max-w-md mx-auto pb-20">
      {/* 1. Header Orang Tua */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-emerald-400/80 font-medium">Assalamu'alaikum 👋</span>
          <h1 className="text-lg font-bold text-white leading-tight">
            {user?.name || user?.nama || 'Wali Santri'}
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold text-sm shadow-sm">
          {(user?.name || user?.nama || 'W').charAt(0).toUpperCase()}
        </div>
      </div>

      {/* 2. Filter Tab Anak */}
      <ChildSelector
        students={students}
        selectedId={selectedStudentId}
        onSelect={setSelectedStudentId}
      />

      {/* 3. Card Ringkasan Total Tagihan */}
      <TotalTagihanCard
        totalAmount={totalAmount}
        totalUnpaidCount={totalUnpaidCount}
        selectedStudentName={selectedStudentName}
        onPayNow={() => alert('Fitur pembayaran gateway akan segera aktif!')}
      />

      {/* 4. List Tagihan Per Anak */}
      <div className="space-y-3.5 pt-2">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Rincian Tagihan Santri
          </h2>
          <span className="text-[11px] text-slate-400">
            Menampilkan {filteredStudents.length} Anak
          </span>
        </div>

        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <TagihanCard 
              key={student.id} 
              student={student} 
              bills={invoicesByStudent[student.id] || []} 
            />
          ))
        ) : (
          <div className="p-6 text-center bg-slate-800/40 border border-slate-700/60 rounded-2xl text-slate-400 text-xs">
            Belum ada data santri terhubung dengan akun Anda.
          </div>
        )}
      </div>
    </div>
  );
};

export default SppDashboardPage;