import React from 'react';
import { Link } from 'react-router-dom';

export const BottomNavigation = ({ navItems, isActive }) => {
  return (
    <div className="shrink-0 bg-[#1A1D2E]/95 backdrop-blur-md border-t border-slate-800/80 px-3 pt-2.5 pb-4 sm:pb-3 flex items-center justify-around z-30">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 px-3 py-1 transition-all duration-150 active:scale-95"
          >
            {item.icon(active)}
            <span
              className={`text-[11px] font-medium tracking-tight transition-colors ${
                active ? 'text-[#5B7EB5] font-semibold' : 'text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;