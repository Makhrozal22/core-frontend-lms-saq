import React from 'react';
import { Outlet } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';

export const AuthLayout = () => {
  return (
    <div className="min-h-[100dvh] sm:min-h-screen bg-[#0F131C] text-slate-100 flex items-center justify-center p-0 sm:p-6 font-sans">
      {/* Mobile Device Container */}
      <div className="w-full h-[100dvh] sm:h-[840px] sm:max-w-[410px] bg-emerald-600 sm:rounded-[44px] sm:border sm:border-emerald-500/30 shadow-2xl flex flex-col overflow-hidden relative">

        {/* Status Bar Header
        <StatusBar bgColor="bg-transparent" textColor="text-white" /> */}

        {/* Outlet / Halaman Login */}
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;