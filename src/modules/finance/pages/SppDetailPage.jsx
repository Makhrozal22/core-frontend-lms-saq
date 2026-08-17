import React from 'react';
import { Link } from 'react-router-dom';
import { formatTanggalIndonesia } from '../../../utils/formatDate';
import { formatRupiah } from '../../../utils/formatRupiah';
import {
  ArrowLeft, CreditCard, Download, Receipt,
  User, CheckCircle2
} from 'lucide-react';

import { useSppDetail } from '../hooks/useSppDetail';

export const SppDetailPage = () => {
  const {
    students,
    loadingStudents,
    loadingInvoices,
    loadingDetails,
    selectedStudentId,
    setSelectedStudentId,
    nextDueDate,
    totalAmount,
    activeStudent,
    targetInvoices,
    invoiceDetailsById,
    handlePayAction,
    handleDownloadInvoice,
  } = useSppDetail();

  if (loadingStudents || loadingInvoices) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-slate-50">
        <div className="w-9 h-9 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-xs text-slate-500 font-medium">Memuat rincian tagihan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-28 text-slate-800 bg-slate-50 min-h-full">
      {/* 1. Header Banner Emerald (Konsisten dengan SppDashboardPage) */}
      <div className="bg-emerald-600 px-5 pt-6 pb-6 rounded-b-[2rem] shadow-lg text-white">
        <div className="flex items-center gap-3 mb-2">
          <Link to="/beranda" className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-colors text-white">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-extrabold text-white text-lg leading-tight">Detail Tagihan SPP</h1>
        </div>
        <p className="text-emerald-100 text-xs ml-12">Kelola dan selesaikan kewajiban pembayaran santri</p>
      </div>

      <div className="px-4 space-y-4">
        {/* 2. Selector Pilih Anak (Bayar per Anak / Semua) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
          <label className="text-xs font-bold text-slate-500 block mb-2 px-1">Pilih Tagihan Santri</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedStudentId('ALL')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${selectedStudentId === 'ALL'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              Semua Santri (Total)
            </button>
            {students.map((student) => {
              const name = student.full_name || student.name || student.nama || 'Santri';
              const isSelected = student.id === selectedStudentId;
              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudentId(student.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Card Total Tagihan Utama (Data dari API) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-400 mb-1">
            {selectedStudentId === 'ALL' ? 'Total Seluruh Tagihan Aktif' : `Tagihan atas nama: ${activeStudent?.full_name || activeStudent?.name || 'Santri'}`}
          </p>
          <p className="text-3xl font-extrabold text-emerald-600">{formatRupiah(totalAmount)}</p>

          {/* Ambil data tanggal dari api dan Utils */}
          <span className="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full">
            Jatuh Tempo:{' '}
            {nextDueDate
              ? formatTanggalIndonesia(nextDueDate)
              : 'Tidak ada'}
          </span>

          {/* Rincian Komponen Tagihan */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Receipt size={16} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  Rincian Komponen Tagihan
                </h3>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  Detail berdasarkan invoice dari sistem
                </p>
              </div>
            </div>

            {loadingDetails ? (
              <div className="flex items-center gap-2 py-4 text-xs text-slate-400">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                Memuat rincian...
              </div>
            ) : (
              targetInvoices.length === 0 ? (
                <div className="py-5 text-center">
                  <CheckCircle2
                    size={28}
                    className="mx-auto text-emerald-500 mb-2"
                  />

                  <p className="text-xs font-bold text-slate-700">
                    Tidak ada tagihan aktif
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1">
                    Semua tagihan sudah lunas.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {targetInvoices.map((invoice) => {
                    const detail =
                      invoiceDetailsById[invoice.id];

                    const studentName =
                      invoice.student?.full_name ||
                      invoice.student?.name ||
                      invoice.student?.nama ||
                      'Santri';

                    const items = detail?.items || [];

                    return (
                      <div
                        key={invoice.id}
                        className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
                      >
                        {/* Header Invoice */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <p className="text-[10px] text-slate-400">
                              Invoice
                            </p>

                            <p className="text-[11px] font-bold text-slate-700 break-all">
                              {detail?.invoiceNumber ||
                                invoice.invoiceNumber ||
                                '-'}
                            </p>

                            {selectedStudentId === 'ALL' && (
                              <p className="text-[10px] text-emerald-600 font-semibold mt-1">
                                {studentName}
                              </p>
                            )}
                          </div>

                          <span className="shrink-0 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold">
                            Belum Lunas
                          </span>
                        </div>

                        {/* Item Invoice */}
                        {items.length > 0 ? (
                          <div className="space-y-2">
                            {items.map((item, index) => (
                              <div
                                key={`${invoice.id}-${index}`}
                                className="flex justify-between items-start gap-3 text-xs"
                              >
                                <div className="flex items-start gap-2 min-w-0">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />

                                  <span className="text-slate-500 leading-relaxed">
                                    {item.itemName}
                                  </span>
                                </div>

                                <span className="text-slate-800 font-bold whitespace-nowrap">
                                  {formatRupiah(item.amount)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-400 py-2">
                            Rincian komponen belum tersedia.
                          </p>
                        )}

                        {/* Total Invoice */}
                        <div className="border-t border-slate-200 mt-3 pt-2.5 flex justify-between items-center">
                          <span className="text-[11px] text-slate-600 font-bold">
                            Total Invoice
                          </span>

                          <span className="text-sm text-emerald-600 font-extrabold">
                            {formatRupiah(
                              detail?.totalAmount ??
                              invoice.nominal
                            )}
                          </span>
                        </div>

                        {/* Sisa */}
                        {detail && (
                          <div className="flex justify-between mt-1">
                            <span className="text-[10px] text-slate-400">
                              Sisa pembayaran
                            </span>

                            <span className="text-[10px] text-red-500 font-bold">
                              {formatRupiah(
                                detail.remainingAmount
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>

        {/* 4. Informasi Santri / Anak */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={16} />
            </div>
            <h3 className="text-xs font-bold text-slate-800">Informasi Santri</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Nama Santri</span>
              <span className="text-slate-800 font-bold">
                {selectedStudentId === 'ALL' ? 'Semua Anak Terdaftar (' + students.length + ' Santri)' : (activeStudent?.full_name || activeStudent?.name || activeStudent?.nama || '-')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kelas / Jenjang</span>
              <span className="text-slate-800 font-bold">
                {selectedStudentId === 'ALL' ? 'Gabungan Kelas' : (activeStudent?.class_name || activeStudent?.kelas || 'Kelas Reguler')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Periode Pembayaran</span>
              <span className="text-slate-800 font-bold">Agustus 2026</span>
            </div>
          </div>
        </div>

        {/* 5. Action Buttons (Bayar & Unduh Invoice) */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => handlePayAction(selectedStudentId === 'ALL' ? 'Semua Santri' : (activeStudent?.full_name || 'Santri'))}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <CreditCard size={18} />
            Bayar Sekarang ({selectedStudentId === 'ALL' ? 'Total Semua' : 'Pilih Anak Ini'})
          </button>

          <button
            onClick={handleDownloadInvoice}
            className="w-full py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <Download size={18} className="text-emerald-600" />
            Unduh Invoice Tagihan (.PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SppDetailPage;