
import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
  isAuthorized: boolean;
  onAuthorize: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete, isAuthorized, onAuthorize }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState<'AUTH' | 'DIAGNOSTICS'> (isAuthorized ? 'DIAGNOSTICS' : 'AUTH');

  const bootLogs = [
    "INITIALIZING_CORE_SERVICES...",
    "UPLINK_ESTABLISHED_WITH_STARK_SATELLITE_B83",
    "CHECKING_ARC_REACTOR_OUTPUT... 100%",
    "LOADING_PERSONALITY_MATRIX: JARVIS_V7.2",
    "CALIBRATING_OPTICAL_SENSORS...",
    "MAPPING_GEOSPATIAL_GRID...",
    "CLEAN_SLATE_PROTOCOL: DISABLED",
    "SYSTEM_READY_FOR_INPUT"
  ];

  useEffect(() => {
    if (phase === 'DIAGNOSTICS') {
      let logIndex = 0;
      const logInterval = setInterval(() => {
        if (logIndex < bootLogs.length) {
          setLogs(prev => [...prev, bootLogs[logIndex]]);
          logIndex++;
          setProgress((logIndex / bootLogs.length) * 100);
        } else {
          clearInterval(logInterval);
          setTimeout(onBootComplete, 1000);
        }
      }, 400);
      return () => clearInterval(logInterval);
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-['Share_Tech_Mono']">
      <div className="max-w-2xl w-full p-12 flex flex-col items-center gap-12 relative">
        {/* Arc Reactor Central Element */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-ping"></div>
          <div className="absolute inset-2 border-2 border-cyan-400/30 rounded-full animate-spin [animation-duration:8s]"></div>
          <div className="absolute inset-4 border border-dashed border-cyan-400/50 rounded-full animate-spin [animation-duration:4s] reverse"></div>
          <div className="w-16 h-16 bg-cyan-400 rounded-full shadow-[0_0_50px_rgba(0,210,255,0.8)] flex items-center justify-center z-10">
            <div className="w-10 h-10 border-2 border-black rounded-full"></div>
          </div>
        </div>

        {phase === 'AUTH' ? (
          <div className="text-center space-y-8 animate-pulse">
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-[0.3em] font-['Orbitron'] text-red-500">ACCESS_DENIED</h1>
              <p className="text-xs text-red-400/60 tracking-widest uppercase">Security Clearance Level 7 Required</p>
            </div>
            
            <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-lg space-y-4">
              <p className="text-xs text-red-400 leading-relaxed uppercase">
                System "J.A.R.V.I.S." is locked. To initialize neural link, please select a valid Stark Industries (Google Gemini) API key.
              </p>
              <button 
                onClick={() => {
                   onAuthorize();
                   setPhase('DIAGNOSTICS');
                }}
                className="w-full py-4 bg-red-600/20 border border-red-500 hover:bg-red-600/40 text-red-500 font-black tracking-widest transition-all uppercase"
              >
                Execute Clearance Check
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                className="block text-[10px] text-red-400/40 hover:text-red-400 transition-colors uppercase tracking-tighter"
              >
                Billing Documentation Required >>
              </a>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-black tracking-[0.4em] font-['Orbitron']">INITIALIZING...</h1>
              <div className="flex justify-between text-[10px] text-cyan-400/40 uppercase font-bold tracking-widest">
                <span>STARK_INDUSTRIES</span>
                <span>OS_BOOT_V7.2</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-cyan-900/30 rounded-full overflow-hidden border border-cyan-900/50">
              <div 
                className="h-full bg-cyan-400 shadow-[0_0_15px_cyan] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Scrolling Logs */}
            <div className="h-32 bg-cyan-900/5 border border-cyan-900/30 p-4 rounded overflow-hidden flex flex-col gap-1">
              {logs.slice(-5).map((log, i) => (
                <div key={i} className="text-[10px] text-cyan-400/80 uppercase">
                  <span className="opacity-40">[{new Date().toLocaleTimeString()}]</span> {log}
                </div>
              ))}
              {logs.length < bootLogs.length && (
                <div className="text-[10px] text-cyan-400 animate-pulse uppercase">_READING_DATA...</div>
              )}
            </div>
          </div>
        )}

        {/* HUD Decorations */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-500/20"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-cyan-500/20"></div>
      </div>
    </div>
  );
};

export default BootScreen;
