import React, { useState, useEffect } from 'react';

export const StatusBar = ({ 
  bgColor = "bg-[#1A1D2E]", 
  textColor = "text-slate-300" 
}) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`shrink-0 px-7 pt-3 pb-2 flex items-center justify-between text-[12px] font-medium select-none z-30 transition-colors ${bgColor} ${textColor}`}>
      <span>{currentTime || '00:00'}</span>
      <div className="flex items-center gap-1.5 opacity-90">
        {/* Signal Icon */}
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.3c-.2.2-.2.51 0 .71.2.2.51.2.71 0l1.32-1.32C7.93 19.26 9.88 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
        </svg>
        {/* Wifi Icon */}
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.3c3.84 0 7.32 1.5 9.9 3.96L12 18.25l-9.9-6.99C4.68 8.8 8.16 7.3 12 7.3z"/>
        </svg>
        {/* Battery Icon */}
        <div className="w-5 h-2.5 border border-current rounded-[2px] p-[1px] flex items-center">
          <div className="h-full w-[80%] bg-current rounded-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;