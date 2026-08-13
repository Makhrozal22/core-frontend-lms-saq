import React from 'react';

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-4 pb-24 bg-slate-50 min-h-full animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-emerald-500/80 h-36 rounded-b-[2rem] px-5 pt-6 flex flex-col justify-between pb-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="w-24 h-3 bg-white/30 rounded-full" />
            <div className="w-40 h-5 bg-white/40 rounded-full" />
          </div>
          <div className="w-10 h-10 bg-white/30 rounded-2xl" />
        </div>
        <div className="w-full h-8 bg-white/20 rounded-2xl" />
      </div>

      <div className="px-4 space-y-4">
        {/* Card Tagihan Utama Skeleton */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 h-36 flex flex-col justify-between shadow-xs">
          <div className="w-28 h-3 bg-slate-200 rounded-full" />
          <div className="w-48 h-7 bg-slate-200 rounded-full" />
          <div className="w-32 h-6 bg-slate-100 rounded-full" />
        </div>

        {/* Carousel Santri Skeleton */}
        <div className="flex gap-3 overflow-x-hidden">
          <div className="w-56 h-28 bg-white border border-slate-200 rounded-3xl p-4 shrink-0 space-y-3">
            <div className="flex gap-3 items-center">
              <div className="w-11 h-11 bg-slate-200 rounded-2xl" />
              <div className="space-y-1.5 flex-1">
                <div className="w-full h-3 bg-slate-200 rounded-full" />
                <div className="w-16 h-2.5 bg-slate-100 rounded-full" />
              </div>
            </div>
          </div>
          <div className="w-56 h-28 bg-white border border-slate-200 rounded-3xl p-4 shrink-0" />
        </div>
      </div>
    </div>
  );
};