import React from 'react';
import { Users } from 'lucide-react';

export const ChildSelector = ({ students, selectedId, onSelect }) => {
  if (!students || students.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {/* Button Option: Semua Anak */}
        {students.length > 1 && (
          <button
            type="button"
            onClick={() => onSelect('ALL')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              selectedId === 'ALL'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users size={14} className={selectedId === 'ALL' ? 'text-white' : 'text-emerald-600'} />
            <span>Semua Anak</span>
            <span
              className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                selectedId === 'ALL' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {students.length}
            </span>
          </button>
        )}

        {/* Button Option Per Anak */}
        {students.map((student) => {
          const isSelected = selectedId === student.id;
          const name = student.full_name || student.name || student.nama || 'Santri';
          const initial = name.charAt(0).toUpperCase();

          return (
            <button
              key={student.id}
              type="button"
              onClick={() => onSelect(student.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {initial}
              </div>
              <span>{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChildSelector;