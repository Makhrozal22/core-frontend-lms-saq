import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../modules/auth/services/authService';
// import { StatusBar } from '../components/StatusBar';
import { BottomNavigation } from '../components/BottomNavigation';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const navItems = [
    {
      path: '/beranda',
      label: 'Beranda',
      icon: (active) => (
        <svg className={`w-6 h-6 transition-colors ${active ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      path: '/tagihan',
      label: 'Tagihan',
      icon: (active) => (
        <svg className={`w-6 h-6 transition-colors ${active ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      path: '/riwayat',
      label: 'Riwayat',
      icon: (active) => (
        <svg className={`w-6 h-6 transition-colors ${active ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
    {
      path: '/profil',
      label: 'Profil',
      icon: (active) => (
        <svg className={`w-6 h-6 transition-colors ${active ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
  ];

  const isActive = (path) => {
    if (path === '/beranda') return location.pathname === '/beranda' || location.pathname === '/spp';
    return location.pathname.startsWith(path);
  };

  return (
    /* Latar Luar Terang (bg-slate-100) */
    <div className="min-h-[100dvh] sm:min-h-screen bg-slate-100 text-slate-800 flex items-center justify-center p-0 sm:p-6 font-sans">
      {/* Container Mobile Terang (bg-slate-50) */}
      <div className="w-full h-[100dvh] sm:h-[840px] sm:max-w-[410px] bg-slate-50 sm:rounded-[44px] sm:border sm:border-slate-200 shadow-2xl flex flex-col overflow-hidden relative">

        {/* Status Bar Emerald Top
        <StatusBar bgColor="bg-emerald-600" textColor="text-white" /> */}

        {/* Main Content Area */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto no-scrollbar scroll-smooth"
        >
          <Outlet context={{ user }} />
        </div>

        {/* Bottom Navigation Light Theme */}
        <BottomNavigation navItems={navItems} isActive={isActive} />

      </div>
    </div>
  );
};

export default DashboardLayout;