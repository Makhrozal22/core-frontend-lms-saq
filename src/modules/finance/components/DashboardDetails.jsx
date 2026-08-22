import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, GraduationCap, CreditCard, Wallet, Vault, Star, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { ChildSelector } from './ChildSelector';
import { quickActions, mockRecentTransactions } from '../../../utils/constants';

const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val || 0);

export const DashboardDetails = ({
    students,
    invoicesByStudent,
    selectedStudentId,
    setSelectedStudentId,
    carouselRef,
    scrollToChild,
    totalAmount,
    totalUnpaidCount,
    onFeatureClick 
}) => {
    const navigate = useNavigate();

    return (
        <div className="px-4 space-y-5">
            {/* 3. Carousel Profil Santri */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 shadow-sm border border-slate-200">
                        <GraduationCap size={16} className="text-emerald-600" />
                        <span className="text-xs font-bold text-slate-700">{students.length} Santri Terdaftar</span>
                    </div>
                    <button onClick={() => setSelectedStudentId('ALL')} className="flex items-center gap-1 text-emerald-600 text-xs font-bold hover:underline">
                        Tampilkan Semua <ChevronRight size={14} />
                    </button>
                </div>

                <div ref={carouselRef} className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
                    {students.map((student, idx) => {
                        const name = student.full_name || student.name || student.nama || 'Santri';
                        const unpaidSum = (invoicesByStudent[student.id] || []).filter(b => !b.isLunas).reduce((sum, b) => sum + Number(b.nominal || 0), 0);
                        const isSelected = student.id === selectedStudentId;

                        return (
                            <button
                                key={student.id}
                                onClick={() => scrollToChild(student.id, idx)}
                                className={`flex-shrink-0 w-56 rounded-3xl p-4 text-left border-2 shadow-sm ${isSelected ? "border-emerald-500 bg-white" : "border-slate-200 bg-white"}`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-base shrink-0">
                                        {name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-slate-800 text-sm leading-tight truncate">{name}</p>
                                        <p className="text-slate-400 text-xs">Kelas: {student.class_name || student.kelas || '-'}</p>
                                        <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full inline-block mt-0.5">Santri Aktif</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                                    <div onClick={(e) => { e.stopPropagation(); onFeatureClick && onFeatureClick("Saldo Jajan"); }}>
                                        <p className="text-slate-400 text-[10px]">Saldo Jajan</p>
                                        <p className="font-bold text-slate-800 text-xs">Rp 0</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-[10px]">Tagihan SPP</p>
                                        <p className={`font-bold text-xs ${unpaidSum > 0 ? "text-rose-500" : "text-emerald-600"}`}>
                                            {unpaidSum > 0 ? formatRupiah(unpaidSum) : "Lunas ✓"}
                                        </p>
                                    </div>
                                </div>
                                {isSelected && <div className="mt-2.5 w-6 h-1 bg-emerald-500 rounded-full" />}
                            </button>
                        );
                    })}
                </div>
            </div>


            {/* 4. Grid Ringkasan Finansial */}
            <div className="grid grid-cols-2 gap-3">
                <div onClick={() => navigate('/tagihan')} className={`rounded-3xl p-4 shadow-sm cursor-pointer ${totalUnpaidCount > 0 ? "bg-rose-50 border-2 border-rose-200" : "bg-white border border-slate-200"}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${totalUnpaidCount > 0 ? "bg-rose-100" : "bg-emerald-100"}`}>
                            <CreditCard size={18} className={totalUnpaidCount > 0 ? "text-rose-500" : "text-emerald-600"} />
                        </div>
                        <span className="text-slate-500 text-xs font-semibold">SPP</span>
                    </div>
                    <p className={`font-extrabold text-lg mb-1 ${totalUnpaidCount > 0 ? "text-rose-600" : "text-slate-800"}`}>{formatRupiah(totalAmount)}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${totalUnpaidCount > 0 ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-700"}`}>
                        {totalUnpaidCount > 0 ? `${totalUnpaidCount} Belum Lunas` : "Lunas ✓"}
                    </span>
                </div>

                <div onClick={() => onFeatureClick && onFeatureClick("Saldo Jajan")} className="rounded-3xl p-4 shadow-sm bg-white border border-slate-200 cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Wallet size={18} className="text-amber-600" />
                        </div>
                        <span className="text-slate-500 text-xs font-semibold">Saldo Jajan</span>
                    </div>
                    <p className="font-extrabold text-lg text-slate-800 mb-1">Rp 0</p>
                    <p className="text-emerald-600 text-[10px] font-bold flex items-center gap-1">Isi Saldo <ArrowRight size={12} /></p>
                </div>

                <div onClick={() => onFeatureClick && onFeatureClick("Tabungan")} className="rounded-3xl p-4 shadow-sm bg-white border border-slate-200 cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Vault size={18} className="text-blue-600" />
                        </div>
                        <span className="text-slate-500 text-xs font-semibold">Tabungan</span>
                    </div>
                    <p className="font-extrabold text-lg text-slate-800 mb-1">Rp 0</p>
                    <p className="text-blue-600 text-[10px] font-bold flex items-center gap-1">Lihat Detail <ArrowRight size={12} /></p>
                </div>

                <div onClick={() => onFeatureClick && onFeatureClick("Akademik / Rapor")} className="rounded-3xl p-4 shadow-sm bg-white border border-slate-200 cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Star size={18} className="text-purple-600" />
                        </div>
                        <span className="text-slate-500 text-xs font-semibold">Akademik</span>
                    </div>
                    <p className="font-extrabold text-lg text-slate-800 mb-1">88.5</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Sangat Baik</span>
                </div>
            </div>

            {/* 5. Akses Cepat */}
            <div>
                <h2 className="font-bold text-slate-800 text-sm mb-2.5 px-1">Akses Cepat</h2>
                <div className="grid grid-cols-3 gap-3">
                    {quickActions.map(({ label, icon: IconComponent, path, color }) => (
                        <button key={path} onClick={() => navigate(path)} className="flex flex-col items-center gap-2 bg-white rounded-2xl py-4 px-2 shadow-sm border border-slate-200 active:scale-95 transition-all">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color}`}>
                                <IconComponent size={20} />
                            </div>
                            <span className="text-slate-700 text-[11px] font-semibold text-center leading-tight">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 6. Aktivitas Terbaru */}
            <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center px-1">
                    <h2 className="font-bold text-slate-800 text-sm">Aktivitas Terbaru</h2>
                    <button onClick={() => navigate('/riwayat')} className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
                        <span>Lihat Semua</span>
                        <ChevronRight size={14} />
                    </button>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
                    {mockRecentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 last:pb-0 last:border-b-0">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <CheckCircle2 size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-slate-800 text-xs font-bold truncate">{tx.title}</p>
                                    <p className="text-slate-400 text-[10px] flex items-center gap-1 mt-0.5">
                                        <Clock size={11} />
                                        <span>{tx.date}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="text-right shrink-0">
                                <p className="font-extrabold text-slate-800 text-xs">{formatRupiah(tx.amount)}</p>
                                <span className="text-[10px] font-semibold text-emerald-600">{tx.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};