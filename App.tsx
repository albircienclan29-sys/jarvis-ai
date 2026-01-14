
import React, { useState, useEffect, useRef } from 'react';
import { ViewType, SystemStats } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/Dashboard/DashboardView';
import ChatView from './components/Chat/ChatView';
import VisionView from './components/Vision/VisionView';
import MapView from './components/Map/MapView';
import TacticalView from './components/Tactical/TacticalView';
import SettingsView from './components/Settings/SettingsView';
import BootScreen from './components/BootScreen';

const App: React.FC = () => {
  const [bootPhase, setBootPhase] = useState<'INITIALIZING' | 'READY'>('INITIALIZING');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [stats, setStats] = useState<SystemStats>({
    cpu: 24,
    memory: 42,
    network: 120,
    threatLevel: 'MINIMAL',
    anomalyActive: true, 
    anomalyLocation: 'GRID_SUBSTATION_4',
    anomalyProgress: 0
  });

  useEffect(() => {
    const checkAuth = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio && typeof aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await aistudio.hasSelectedApiKey();
        setIsAuthorized(hasKey);
      } else {
        setIsAuthorized(!!process.env.API_KEY);
      }
    };
    checkAuth();
  }, []);

  const handleAuthorize = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio && typeof aistudio.openSelectKey === 'function') {
      await aistudio.openSelectKey();
      setIsAuthorized(true);
    } else {
      setIsAuthorized(true);
    }
  };

  const resolveAnomaly = () => {
    setStats(prev => ({
      ...prev,
      anomalyActive: false,
      anomalyProgress: 0,
      threatLevel: 'MINIMAL'
    }));
  };

  const triggerNewAnomaly = () => {
    const locations = ['UPLINK_NODE_B7', 'MAIN_SERVER_RACK_3', 'EXTERNAL_FIREWALL', 'ARC_REACTOR_COOLANT'];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    setStats(prev => ({
      ...prev,
      anomalyActive: true,
      anomalyLocation: loc,
      anomalyProgress: 0,
      threatLevel: 'CAUTION'
    }));
  };

  // Autonomous Self-Healing Logic
  useEffect(() => {
    if (bootPhase !== 'READY') return;

    if (stats.anomalyActive) {
      const healTimer = setInterval(() => {
        setStats(prev => {
          if (prev.anomalyProgress >= 100) {
            clearInterval(healTimer);
            return { ...prev, anomalyActive: false, anomalyProgress: 0, threatLevel: 'MINIMAL' };
          }
          return { ...prev, anomalyProgress: Math.min(100, prev.anomalyProgress + 2) };
        });
      }, 150);
      return () => clearInterval(healTimer);
    } else {
      const nextAnomalyDelay = 45000 + Math.random() * 30000;
      const timeout = setTimeout(triggerNewAnomaly, nextAnomalyDelay);
      return () => clearTimeout(timeout);
    }
  }, [bootPhase, stats.anomalyActive]);

  // System Stats Simulation
  useEffect(() => {
    if (bootPhase !== 'READY') return;
    
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(10, prev.cpu + (Math.random() - 0.5) * 8)),
        memory: Math.min(100, Math.max(30, prev.memory + (Math.random() - 0.5) * 3)),
        network: Math.max(20, Math.min(1000, prev.network + (Math.random() - 0.5) * 80)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [bootPhase]);

  const renderView = () => {
    switch (activeView) {
      case ViewType.DASHBOARD: return <DashboardView stats={stats} onResolveAnomaly={resolveAnomaly} />;
      case ViewType.CHAT: return <ChatView />;
      case ViewType.VISION: return <VisionView />;
      case ViewType.MAP: return <MapView />;
      case ViewType.TACTICAL: return <TacticalView stats={stats} />;
      case ViewType.SETTINGS: return <SettingsView />;
      default: return <DashboardView stats={stats} onResolveAnomaly={resolveAnomaly} />;
    }
  };

  if (bootPhase === 'INITIALIZING') {
    return (
      <BootScreen 
        isAuthorized={isAuthorized} 
        onAuthorize={handleAuthorize}
        onBootComplete={() => setBootPhase('READY')} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-black text-[#00d2ff] selection:bg-[#00d2ff] selection:text-black overflow-hidden font-['Share_Tech_Mono']">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <main className="flex-1 flex flex-col relative">
        <Header activeView={activeView} stats={stats} />
        
        <div className="flex-1 overflow-auto p-6 relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-1/2 h-1/2 bg-cyan-900 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-900 rounded-full blur-[120px]"></div>
          </div>
          
          <div className="relative z-10 h-full">
            {renderView()}
          </div>
        </div>

        <footer className="h-8 border-t border-cyan-900/50 bg-black/50 backdrop-blur px-4 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase">
          <div className="flex gap-4">
            <span>UPLINK: ENCRYPTED</span>
            <span>OS: MARK_VII_REVISION_4</span>
          </div>
          <div className="flex gap-4">
            <span className={stats.threatLevel === 'MINIMAL' ? 'text-green-500' : stats.threatLevel === 'CAUTION' ? 'text-yellow-500' : 'text-red-500'}>
              STATUS: {stats.threatLevel}
            </span>
            <span>STARK_INDUSTRIES &copy; 2025</span>
          </div>
        </footer>
      </main>

      {/* Background Decor */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-cyan-500/10 pointer-events-none z-0 rounded-full animate-pulse"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] border border-cyan-500/5 pointer-events-none z-0 rounded-full animate-spin [animation-duration:60s]"></div>
    </div>
  );
};

export default App;
