import React from "react";
import { User } from "lucide-react";

export const ProfileHero = ({ parent, childrenCount = 0 }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 flex items-center gap-5 shadow-lg shadow-emerald-900/10 text-white">
      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
        <User size={32} className="text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="font-bold text-lg truncate">{parent?.name || "Wali Santri"}</h2>
        <p className="text-emerald-100 text-xs truncate">{parent?.phone || "-"}</p>
        {parent?.email && (
          <p className="text-emerald-200/80 text-[11px] truncate mt-0.5">{parent.email}</p>
        )}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
          <span className="text-emerald-100 text-xs font-medium">{childrenCount} Anak Terdaftar</span>
        </div>
      </div>
    </div>
  );
};