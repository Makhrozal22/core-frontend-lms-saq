import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Phone, Shield, Settings, LogOut, 
  ChevronRight, Bell, HelpCircle, Users, AlertCircle, X 
} from "lucide-react";

// Hook Autentikasi Proyek
import { useAuth } from "@/hooks/useAuth";

// Komponen Modal Lokal (Informasi Fitur)
const CustomModal = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-all animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 relative scale-100 animate-scaleUp">
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

        {/* Ikon Peringatan / Info */}
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <AlertCircle size={28} />
        </div>

        {/* Teks Konten */}
        <div className="space-y-1.5">
          <h3 className="text-base font-extrabold text-slate-800">{title || "Informasi Fitur"}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {message || "Fitur ini sedang dalam tahap pengembangan dan akan segera aktif pada pembaruan berikutnya."}
          </p>
        </div>

        {/* Tombol Aksi */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-emerald-600/20"
        >
          Baik, Mengerti
        </button>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user: parent, logout } = useAuth();
  
  const [logoutSheet, setLogoutSheet] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: "", message: "" });

  // Data anak dari user auth
  const children = parent?.students || parent?.children || [];

  const handleLogout = () => {
    if (logout) logout();
    navigate("/auth/login", { replace: true });
  };

  const triggerModal = (title, message) => {
    setModalConfig({ isOpen: true, title, message });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Grouping Menu
  const menuGroups = useMemo(
    () => [
      {
        title: "Akun",
        items: [
          { 
            icon: User, 
            label: "Data Pribadi", 
            sub: "Lihat dan edit profil", 
            action: () => triggerModal("Data Pribadi", "Fitur untuk melihat dan merubah data pribadi Anda sedang dalam tahap pengembangan.") 
          },
          { 
            icon: Users, 
            label: "Daftar Anak", 
            sub: `${children.length} anak terdaftar`, 
            action: () => navigate("/children") 
          },
          { 
            icon: Phone, 
            label: "Ubah Nomor HP", 
            sub: parent?.phone || "-", 
            action: () => triggerModal("Ubah Nomor HP", "Fitur ubah nomor WhatsApp utama akan segera aktif pada pembaruan berikutnya.") 
          },
        ],
      },
      {
        title: "Pengaturan",
        items: [
          { 
            icon: Bell, 
            label: "Notifikasi", 
            sub: "Atur preferensi notifikasi", 
            action: () => triggerModal("Notifikasi", "Pengaturan preferensi notifikasi pesan & aplikasi akan segera hadir.") 
          },
          { 
            icon: Shield, 
            label: "Keamanan & Biometrik", 
            sub: "PIN, fingerprint, face ID", 
            action: () => navigate("/biometric") 
          },
          { 
            icon: Settings, 
            label: "Pengaturan Aplikasi", 
            sub: "Bahasa, tampilan", 
            action: () => triggerModal("Pengaturan Aplikasi", "Fitur ubah bahasa dan tema tampilan akan segera tersedia.") 
          },
        ],
      },
      {
        title: "Bantuan",
        items: [
          { 
            icon: HelpCircle, 
            label: "Pusat Bantuan", 
            sub: "FAQ dan panduan penggunaan", 
            action: () => triggerModal("Pusat Bantuan", "Pusat bantuan dan panduan penggunaan portal wali santri akan segera dibuka.") 
          },
        ],
      },
    ],
    [children.length, parent?.phone, navigate]
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Mobile */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-10">
        <h1 className="font-bold text-slate-800 text-center text-base">Profil Pengguna</h1>
      </div>

      <div className="px-4 pt-4 space-y-4 max-w-md mx-auto">
        {/* Banner Profil */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-5 flex items-center gap-4 shadow-md text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
            <User size={32} className="text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-base truncate">{parent?.name || parent?.full_name || "Wali Santri"}</h2>
            <p className="text-emerald-100 text-xs truncate">{parent?.phone || "-"}</p>
            {parent?.email && <p className="text-emerald-200/80 text-[11px] truncate mt-0.5">{parent.email}</p>}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
              <span className="text-emerald-100 text-xs font-medium">{children.length} Anak Terdaftar</span>
            </div>
          </div>
        </div>

        {/* Chips Anak */}
        {children.length > 0 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
            {children.map((child, idx) => (
              <div key={child.id || idx} className="flex-shrink-0 flex items-center gap-2 bg-white rounded-full pl-1.5 pr-3 py-1.5 border border-slate-200/60 shadow-sm">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
                  {child.avatar ? (
                    <img src={child.avatar} alt={child.name} className="w-full h-full object-cover" />
                  ) : (
                    (child.name || child.full_name || "A")[0]
                  )}
                </div>
                <span className="text-slate-700 text-xs font-semibold">{child.nickname || child.name || child.full_name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Menu Groups */}
        {menuGroups.map(({ title, items }) => (
          <div key={title} className="space-y-1.5">
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider px-1">{title}</p>
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm divide-y divide-slate-50 overflow-hidden">
              {items.map(({ icon: Icon, label, sub, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left active:bg-slate-100"
                >
                  <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">{label}</p>
                    {sub && <p className="text-slate-400 text-xs truncate mt-0.5">{sub}</p>}
                  </div>
                  <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => setLogoutSheet(true)}
          className="w-full flex items-center justify-center gap-2 bg-red-50 border border-red-100 text-red-600 font-bold py-3.5 rounded-2xl active:scale-[0.99] transition-transform"
        >
          <LogOut size={18} />
          Keluar
        </button>

        <p className="text-center text-slate-400 text-[11px]">Al-Amanah Parent Portal v1.0.0</p>
      </div>

      {/* Custom Modal untuk Informasi Fitur */}
      <CustomModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={closeModal}
      />

      {/* Modal Konfirmasi Logout (Langsung Inline / BottomSheet Style) */}
      {logoutSheet && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 text-center space-y-4 animate-scaleUp">
            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <LogOut size={26} />
            </div>
            <div className="space-y-1">
              <h3 className="text-slate-800 font-extrabold text-base">Yakin ingin keluar?</h3>
              <p className="text-slate-500 text-xs">Anda perlu memasukkan nomor HP & OTP kembali untuk masuk.</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all shadow-md shadow-red-500/20 text-xs"
              >
                Ya, Keluar
              </button>
              <button
                onClick={() => setLogoutSheet(false)}
                className="w-full border border-slate-200 text-slate-600 font-semibold py-3 rounded-2xl active:scale-95 transition-all text-xs"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ProfilePage };