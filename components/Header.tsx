
import React, { useState, useEffect } from 'react';
import { ViewType, SystemStats } from '../types';

interface HeaderProps {
  activeView: ViewType;
  stats: SystemStats;
}

const Header: React.FC<HeaderProps> = ({ activeView, stats }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 border-b border-cyan-900/50 bg-black/40 backdrop-blur flex items-center px-8 justify-between relative overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #00d2ff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] opacity-40 font-bold tracking-widest uppercase">System Overview / {activeView}</span>
        <h2 className="text-2xl font-['Orbitron'] tracking-[0.2em] font-bold">INTERFACE ACTIVE</h2>
      </div>

      <div className="flex items-center gap-12">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] opacity-40">SYSTEM LOAD</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-1.5 bg-cyan-900/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-500 shadow-[0_0_8px_cyan]"
                style={{ width: `${stats.cpu}%` }}
              ></div>
            </div>
            <span className="text-xs font-bold w-12 text-right">{Math.round(stats.cpu)}%</span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end border-l border-cyan-900/50 pl-12">
          <span className="text-[10px] opacity-40">LATENCY</span>
          <span className="text-xl font-bold font-['Orbitron']">2.4ms</span>
        </div>

        <div className="flex flex-col items-end border-l border-cyan-900/50 pl-12">
          <span className="text-[10px] opacity-40">SOL DATE/TIME</span>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold font-['Orbitron']">
              {time.toLocaleTimeString('en-GB', { hour12: false })}
            </span>
            <span className="text-[10px]">
              {time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Scan Edge */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 animate-[scan_4s_linear_infinite]"></div>
      <style>{`
        @keyframes scan {
          0% { transform: scaleX(0); opacity: 0; left: 0; }
          50% { transform: scaleX(1); opacity: 1; left: 0; }
          100% { transform: scaleX(0); opacity: 0; left: 100%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </header>
  );
};

export default Header;
