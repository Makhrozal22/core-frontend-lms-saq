import React from 'react';

export const StatusBar = ({ bgColor = 'bg-transparent', textColor = 'text-white' }) => {
  return (
    <div className={`w-full ${bgColor} ${textColor} px-6 pt-3 pb-2 flex justify-between items-center text-xs font-semibold shrink-0 select-none z-10`}>
      <span>09:41</span>
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.2 19.54 10.55 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
        </svg>
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
        </svg>
        <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
          <div className="h-full w-full bg-current rounded-xs" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;