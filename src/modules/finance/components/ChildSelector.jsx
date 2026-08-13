import React from 'react';

export const ChildSelector = ({ students, selectedId, onSelect }) => {
  if (!students || students.length === 0) return null;

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
        Pilih Anak / Santri
      </label>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {students.length > 1 && (
          <button
            type="button"
            onClick={() => onSelect('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              selectedId === 'ALL'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/30'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/80 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span>👥 Semua Anak</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded-full font-bold">
              {students.length}
            </span>
          </button>
        )}

        {students.map((student) => {
          const isSelected = selectedId === student.id;
          const name = student.full_name || student.name || student.nama || 'Santri';
          const initial = name.charAt(0).toUpperCase();

          return (
            <button
              key={student.id}
              type="button"
              onClick={() => onSelect(student.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700/80 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-white text-emerald-700' : 'bg-slate-700 text-slate-300'
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