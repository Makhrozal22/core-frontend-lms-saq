import React from "react";
import { X, Users, GraduationCap, Hash, UserCircle, Calendar } from "lucide-react";

// ── Helper ──────────────────────────────────────────────────────────
const getInitial = (name = "") => name.charAt(0).toUpperCase();

const GENDER_LABEL = { L: "Laki-laki", P: "Perempuan", male: "Laki-laki", female: "Perempuan" };

// ── Sub-komponen: Kartu satu anak ───────────────────────────────────
const ChildCard = ({ child, index }) => {
  const name = child.full_name || child.name || child.nama || "Santri";
  const kelas = child.class_name || child.kelas || child.grade || null;
  const nis = child.nis || child.nisn || child.student_id || null;
  const gender = GENDER_LABEL[child.gender] || child.gender || null;
  const birthDate = child.birth_date || child.tanggal_lahir || null;

  const avatarColors = [
    "bg-emerald-100 text-emerald-700",
    "bg-teal-100 text-teal-700",
    "bg-cyan-100 text-cyan-700",
    "bg-sky-100 text-sky-700",
  ];
  const colorClass = avatarColors[index % avatarColors.length];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header kartu */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-base font-extrabold flex-shrink-0 ${colorClass}`}
        >
          {child.avatar || child.photo ? (
            <img
              src={child.avatar || child.photo}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            getInitial(name)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-sm truncate">{name}</p>
          {child.nickname && child.nickname !== name && (
            <p className="text-slate-400 text-xs truncate">"{child.nickname}"</p>
          )}
        </div>
        {kelas && (
          <span className="flex-shrink-0 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {kelas}
          </span>
        )}
      </div>

      {/* Detail info */}
      <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {nis && (
          <InfoRow icon={Hash} label="NIS" value={nis} />
        )}
        {gender && (
          <InfoRow icon={UserCircle} label="Jenis Kelamin" value={gender} />
        )}
        {kelas && (
          <InfoRow icon={GraduationCap} label="Kelas" value={kelas} />
        )}
        {birthDate && (
          <InfoRow icon={Calendar} label="Tgl Lahir" value={formatDate(birthDate)} />
        )}
      </div>
    </div>
  );
};

// ── Sub-komponen: Baris info ──────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2">
    <div className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={11} />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-slate-400 leading-none">{label}</p>
      <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate">{value}</p>
    </div>
  </div>
);

// ── Helper: Format tanggal ────────────────────────────────────────────
const formatDate = (raw) => {
  if (!raw) return "-";
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(raw));
  } catch {
    return raw;
  }
};

// ── Komponen Utama: ChildrenBottomSheet ───────────────────────────────
const ChildrenBottomSheet = ({ isOpen, onClose, children = [], loading, error, refetch }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="bg-slate-50 w-full max-w-md rounded-t-3xl flex flex-col max-h-[85svh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-white rounded-t-3xl">
          <div>
            <h2 className="font-bold text-slate-800 text-base">Daftar Anak</h2>
            {!loading && !error && (
              <p className="text-slate-400 text-xs mt-0.5">
                {children.length} anak terdaftar
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 px-4 py-4 space-y-3">
          {/* Loading */}
          {loading && (
            <div className="space-y-3">
              {[1, 2].map((n) => (
                <div key={n} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-200 rounded-full w-3/4" />
                      <div className="h-2.5 bg-slate-100 rounded-full w-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-8 bg-slate-100 rounded-xl" />
                    <div className="h-8 bg-slate-100 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="font-semibold text-slate-700 text-sm">Gagal memuat data anak</p>
                <p className="text-slate-400 text-xs mt-0.5">{error}</p>
              </div>
              <button
                onClick={refetch}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl active:scale-95 transition-all"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && children.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-400 flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="font-semibold text-slate-700 text-sm">Belum ada data anak</p>
                <p className="text-slate-400 text-xs mt-0.5">Data santri belum terdaftar di sistem.</p>
              </div>
            </div>
          )}

          {/* List */}
          {!loading && !error && children.map((child, idx) => (
            <ChildCard key={child.id ?? idx} child={child} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildrenBottomSheet;
