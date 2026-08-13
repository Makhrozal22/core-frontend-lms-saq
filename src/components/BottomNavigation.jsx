import React from 'react';
import { Link } from 'react-router-dom';

export const BottomNavigation = ({ navItems, isActive }) => {
  return (
    <nav className=" border-t border-slate-800 px-4 py-2 flex justify-around items-center shrink-0 z-20">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all duration-200 ${
              active ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.icon(active)}
            <span className="text-[11px] mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;