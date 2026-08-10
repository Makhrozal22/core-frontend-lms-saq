import React from 'react';
import { Outlet } from 'react-router-dom';
import { StatusBar } from '../components/StatusBar';

export const AuthLayout = () => {
  return (
    <div className="min-h-[100dvh] sm:min-h-screen bg-[#0F131C] text-slate-100 flex items-center justify-center p-0 sm:p-6 font-sans">
      {/* Mobile Device Container */}
      <div className="w-full h-[100dvh] sm:h-[840px] sm:max-w-[410px] bg-[#1A1D2E] sm:rounded-[44px] sm:border sm:border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">

        {/* Status Bar*/}
        <StatusBar bgColor="bg-[#5B7EB5]" textColor="text-white" />

        {/* Blue Header Area */}
        <div className="bg-[#5B7EB5] pt-4 pb-10 flex flex-col items-center justify-center relative shrink-0">
          {/* Graduation Cap Icon Circle */}
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 shadow-inner">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">LMS SAQ</h1>
          <p className="text-sm text-white/80 mt-0.5">Portal Orang Tua</p>
        </div>

        {/* Form Area (Scrollable) */}
        <div className="flex-1 flex flex-col px-6 pt-6 pb-6 overflow-y-auto no-scrollbar">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;