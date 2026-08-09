import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../modules/auth/services/authService';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.warn('Logout API error:', e);
    } finally {
      logout();
      navigate('/auth/login', { replace: true });
    }
  };

  const navItems = [
    {
      path: '/beranda',
      label: 'Beranda',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-[#5B7EB5]' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      path: '/tagihan',
      label: 'Tagihan',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-[#5B7EB5]' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      path: '/riwayat',
      label: 'Riwayat',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-[#5B7EB5]' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
    {
      path: '/profil',
      label: 'Profil',
      icon: (active) => (
        <svg className={`w-6 h-6 ${active ? 'text-[#5B7EB5]' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
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
    <div className="min-h-screen bg-[#101520] text-slate-100 flex items-center justify-center p-0 sm:p-6 font-sans">
      {/* Mobile Device Container */}
      <div className="w-full sm:max-w-[420px] min-h-screen sm:min-h-[780px] sm:max-h-[860px] bg-[#1A1D2E] sm:rounded-[40px] sm:border sm:border-slate-700/40 shadow-2xl flex flex-col overflow-hidden relative">

        {/* Status Bar */}
        <div className="px-7 pt-3 pb-1 flex items-center justify-between text-white text-[13px] font-semibold bg-[#2A3A5C] z-30">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <span className="text-lg tracking-widest leading-none">•••</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <Outlet context={{ user, handleLogout }} />
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1A1D2E] border-t border-slate-700/50 px-2 pt-2 pb-3 sm:pb-3 flex items-center justify-around z-40">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-0.5 px-3 py-1"
              >
                {item.icon(active)}
                <span className={`text-[10px] font-medium ${active ? 'text-[#5B7EB5]' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
