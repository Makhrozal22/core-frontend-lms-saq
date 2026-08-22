import React from 'react';
import { Bell } from 'lucide-react';

const getGreeting = () => {
  const h = new Date().getHours();
  return h < 11 ? 'Pagi' : h < 15 ? 'Siang' : h < 18 ? 'Sore' : 'Malam';
};

export const HeaderBanner = ({ user, quote, onNotificationClick }) => {
  return (
    <div className="bg-emerald-600 px-5 pt-6 pb-6 rounded-b-[2rem] shadow-lg text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-emerald-100 text-xs">Assalamu'alaikum Selamat {getGreeting()},</p>
          <h1 className="font-extrabold text-white text-lg leading-tight">
            {user?.name || user?.father_name || 'Wali Santri'} 👋
          </h1>
        </div>
        <button
          onClick={onNotificationClick}
          className="relative w-10 h-10 bg-white/20 hover:bg-white/30 rounded-2xl flex items-center justify-center transition-colors"
        >
          <Bell size={20} className="text-white" />
          <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </button>
      </div>
      <div className="bg-white/10 rounded-2xl px-4 py-2.5 backdrop-blur-sm">
        <p className="text-emerald-100 text-xs italic text-center leading-relaxed">{quote}</p>
      </div>
    </div>
  );
};