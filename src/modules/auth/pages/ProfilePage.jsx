import React from "react";
import { User, ChevronRight, LogOut } from "lucide-react";

import { useProfilePage } from "../hooks/useProfilePage";
import FeatureModal from "../components/FeatureModal";
import ChildrenBottomSheet from "../components/ChildrenBottomSheet";

export default function ProfilePage() {
  const {
    parent,
    children,
    loadingChildren,
    errorChildren,
    refetchChildren,
    logoutSheet,
    setLogoutSheet,
    childrenSheet,
    setChildrenSheet,
    modalConfig,
    closeModal,
    handleLogout,
    menuGroups,
  } = useProfilePage();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
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
            <h2 className="font-bold text-base truncate">
              {parent?.name || parent?.full_name || "Wali Santri"}
            </h2>
            <p className="text-emerald-100 text-xs truncate">{parent?.phone_number|| "-"}</p>
            {parent?.email && (
              <p className="text-emerald-200/80 text-[11px] truncate mt-0.5">{parent.email}</p>
            )}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
              {loadingChildren ? (
                <span className="w-20 h-3 bg-white/20 rounded-full animate-pulse inline-block" />
              ) : (
                <span className="text-emerald-100 text-xs font-medium">
                  {children.length} Anak Terdaftar
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Menu Groups */}
        {menuGroups.map(({ title, items }) => (
          <div key={title} className="space-y-1.5">
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider px-1">
              {title}
            </p>
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
      </div>

      {/* Modal Informasi Fitur */}
      <FeatureModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={closeModal}
      />

      {/* Bottom Sheet Daftar Anak */}
      <ChildrenBottomSheet
        isOpen={childrenSheet}
        onClose={() => setChildrenSheet(false)}
        children={children}
        loading={loadingChildren}
        error={errorChildren}
        refetch={refetchChildren}
      />

      {/* Bottom Sheet Konfirmasi Logout */}
      {logoutSheet && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <LogOut size={26} />
            </div>
            <div className="space-y-1">
              <h3 className="text-slate-800 font-extrabold text-base">Yakin ingin keluar?</h3>
              <p className="text-slate-500 text-xs">
                Anda perlu memasukkan nomor HP & OTP kembali untuk masuk.
              </p>
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