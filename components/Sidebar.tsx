
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { type: ViewType.DASHBOARD, label: '01 DASHBOARD', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { type: ViewType.CHAT, label: '02 COMS LINK', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { type: ViewType.VISION, label: '03 OPTICS', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
    { type: ViewType.MAP, label: '04 GEOLOCATION', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { type: ViewType.TACTICAL, label: '05 TACTICAL', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { type: ViewType.SETTINGS, label: '06 CORE CONFIG', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <aside className="w-64 border-r border-cyan-900/50 bg-black/80 flex flex-col z-20 overflow-hidden relative">
      {/* HUD Header for Sidebar */}
      <div className="p-6 border-b border-cyan-900/50 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_cyan]"></div>
          <h1 className="text-xl font-black tracking-widest font-['Orbitron']">J.A.R.V.I.S.</h1>
        </div>
        <p className="text-[10px] opacity-60">CORE SYSTEM ONLINE</p>
      </div>

      <nav className="flex-1 py-8 flex flex-col">
        {menuItems.map((item) => (
          <button
            key={item.type}
            onClick={() => onViewChange(item.type)}
            className={`
              relative group flex items-center px-6 py-4 transition-all duration-300
              ${activeView === item.type ? 'bg-cyan-500/10 text-cyan-400' : 'text-cyan-600/60 hover:text-cyan-400 hover:bg-cyan-500/5'}
            `}
          >
            {/* Active Indicator */}
            {activeView === item.type && (
              <div className="absolute left-0 top-0 w-1 h-full bg-cyan-400 shadow-[0_0_10px_cyan]"></div>
            )}
            
            <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="text-sm tracking-tighter font-bold uppercase">{item.label}</span>

            {/* Hover Glitch Effect Element */}
            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] animate-pulse">>>></span>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-6 bg-cyan-900/10 mt-auto border-t border-cyan-900/50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px]">AUTH SESSION:</span>
          <span className="text-[10px] text-cyan-400">0xFF-STARK</span>
        </div>
        <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 w-2/3 animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
