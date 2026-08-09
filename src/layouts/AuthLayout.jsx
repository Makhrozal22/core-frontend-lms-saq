import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#101520] text-slate-100 flex items-center justify-center p-0 sm:p-6 font-sans">
      {/* Mobile Device Container */}
      <div className="w-full sm:max-w-[420px] min-h-screen sm:min-h-[780px] sm:max-h-[860px] bg-[#1A1D2E] sm:rounded-[40px] sm:border sm:border-slate-700/40 shadow-2xl flex flex-col overflow-hidden relative">

        {/* Status Bar
        <div className="absolute top-0 left-0 right-0 z-30 px-7 pt-3 pb-1 flex items-center justify-between text-white text-[13px] font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span className="text-lg tracking-widest leading-none">•••</span>
          </div>
        </div> */}

        {/* Blue Header Area */}
        <div className="bg-[#5B7EB5] pt-14 pb-10 flex flex-col items-center justify-center relative">
          {/* Graduation Cap Icon Circle */}
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">LMS SAQ</h1>
          <p className="text-sm text-white/80 mt-0.5">Portal Orang Tua</p>
        </div>

        {/* Form Area */}
        <div className="flex-1 flex flex-col px-6 pt-6 pb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
