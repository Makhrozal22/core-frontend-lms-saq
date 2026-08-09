import React from 'react';
import { useOutletContext } from 'react-router-dom';

export const ProfilePage = () => {
  const { user, handleLogout } = useOutletContext();
  const userName = user?.name || 'Wali Santri';
  const userPhone = user?.phone || '-';

  return (
    <div>
      {/* Blue Header */}
      <div className="bg-[#2A3A5C] px-6 pt-3 pb-8">
        <h1 className="text-lg font-bold text-white mb-1">Profil</h1>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-4">
        <div className="bg-[#222738] border border-slate-700/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#5B7EB5]/20 border border-[#5B7EB5]/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-[#5B7EB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <div>
            <p className="text-base font-bold text-white">{userName}</p>
            <p className="text-xs text-slate-400 font-mono">{userPhone}</p>
            <span className="inline-block mt-1 text-[10px] font-semibold text-[#5B7EB5] bg-[#5B7EB5]/10 border border-[#5B7EB5]/30 px-2 py-0.5 rounded-md">
              Wali Santri
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 pt-5 space-y-3">
        <div className="bg-[#222738] border border-slate-700/50 rounded-2xl overflow-hidden">
          {/* Informasi Anak */}
          <button className="w-full px-5 py-4 flex items-center justify-between active:bg-slate-700/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#5B7EB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              <span className="text-sm font-medium text-white">Informasi Anak</span>
            </div>
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="border-t border-slate-700/30 mx-5"></div>

          {/* Ubah Kata Sandi */}
          <button className="w-full px-5 py-4 flex items-center justify-between active:bg-slate-700/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#5B7EB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span className="text-sm font-medium text-white">Ubah Kata Sandi</span>
            </div>
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="border-t border-slate-700/30 mx-5"></div>

          {/* Bantuan */}
          <button className="w-full px-5 py-4 flex items-center justify-between active:bg-slate-700/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#5B7EB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              <span className="text-sm font-medium text-white">Bantuan</span>
            </div>
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 font-semibold text-sm flex items-center justify-center gap-2 active:bg-rose-500/20 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
          Keluar
        </button>

        {/* App Version */}
        <p className="text-center text-xs text-slate-500 pt-2 pb-4">LMS SAQ v1.0.0</p>
      </div>
    </div>
  );
};

export default ProfilePage;
