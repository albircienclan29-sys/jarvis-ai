
import React from 'react';
import { SystemStats } from '../../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardViewProps {
  stats: SystemStats;
  onResolveAnomaly: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ stats }) => {
  // Mock data for graphs
  const data = Array.from({ length: 20 }, (_, i) => ({
    name: i,
    value: 30 + Math.random() * 40
  }));

  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-6 h-full relative">
      {/* Central HUD Core */}
      <div className={`col-span-12 lg:col-span-6 row-span-4 border ${stats.anomalyActive ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 'border-cyan-500/20'} bg-cyan-900/5 relative flex items-center justify-center p-8 glow-border rounded-xl transition-all duration-1000`}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-[80%] h-[80%] border ${stats.anomalyActive ? 'border-red-500/10' : 'border-cyan-500/10'} rounded-full animate-spin [animation-duration:10s]`}></div>
          <div className={`w-[60%] h-[60%] border-2 border-dashed ${stats.anomalyActive ? 'border-red-400/20' : 'border-cyan-400/20'} rounded-full animate-spin [animation-duration:20s] reverse`}></div>
          <div className={`w-[40%] h-[40%] border ${stats.anomalyActive ? 'border-red-500/30' : 'border-cyan-500/30'} rounded-full animate-pulse`}></div>
        </div>
        
        <div className="text-center z-10">
          <h3 className="text-[10px] tracking-[0.4em] opacity-40 mb-4 uppercase">System Core Status</h3>
          <div className={`text-6xl font-black font-['Orbitron'] mb-2 flex items-baseline justify-center ${stats.anomalyActive ? 'text-red-500' : 'text-cyan-400'}`}>
            <span>{stats.anomalyActive ? 'RESTORING' : '100'}</span>
            {!stats.anomalyActive && <span className="text-xl ml-1 text-cyan-600">%</span>}
          </div>
          <p className={`text-xs uppercase tracking-widest ${stats.anomalyActive ? 'text-red-400' : 'text-cyan-400/60'}`}>
            {stats.anomalyActive ? 'AUTONOMOUS SELF-HEALING ACTIVE' : 'Efficiency Nominal'}
          </p>
        </div>

        {/* Anomaly Autonomous Progress Overlay */}
        {stats.anomalyActive && (
          <div className="absolute bottom-12 z-20 w-full px-12">
            <div className="bg-black/90 border border-red-500/50 p-4 rounded-lg flex flex-col items-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.2)] backdrop-blur">
              <div className="flex justify-between w-full text-[9px] font-bold text-red-100 tracking-widest uppercase">
                <span>DIVERGENCE: {stats.anomalyLocation}</span>
                <span>{stats.anomalyProgress}% COMPLETE</span>
              </div>
              <div className="w-full h-1 bg-red-900/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-300 shadow-[0_0_10px_red]"
                  style={{ width: `${stats.anomalyProgress}%` }}
                ></div>
              </div>
              <div className="text-[8px] text-red-400/60 animate-pulse tracking-tighter">
                JARVIS ENGAGING COUNTER-MEASURES... REDIRECTING POWER GRID...
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-8 left-8 border-l-2 border-cyan-400 pl-4">
          <div className="text-[10px] opacity-40 uppercase">Memory Allocation</div>
          <div className="text-xl font-bold">12.4 TB</div>
        </div>
        <div className="absolute top-8 right-8 text-right border-r-2 border-cyan-400 pr-4">
          <div className="text-[10px] opacity-40 uppercase">Neural Network</div>
          <div className="text-xl font-bold">{stats.anomalyActive ? 'RECALIBRATING' : 'STABLE'}</div>
        </div>
      </div>

      {/* CPU Usage Widget */}
      <div className="col-span-6 lg:col-span-3 row-span-2 border border-cyan-900/50 bg-black/40 p-4 flex flex-col gap-4 rounded-xl">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold tracking-widest uppercase">Cpu Load</h4>
          <span className="text-[10px] text-cyan-400">GHZ</span>
        </div>
        <div className="flex-1 min-h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area type="monotone" dataKey="value" stroke={stats.anomalyActive ? "#ef4444" : "#00d2ff"} fill={stats.anomalyActive ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 210, 255, 0.1)"} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-2xl font-bold font-['Orbitron']">
          <span className={stats.anomalyActive ? 'text-red-500' : ''}>{stats.cpu.toFixed(1)}</span>
          <span className="text-cyan-900/50">4.8</span>
        </div>
      </div>

      {/* Network Widget */}
      <div className="col-span-6 lg:col-span-3 row-span-2 border border-cyan-900/50 bg-black/40 p-4 flex flex-col gap-4 rounded-xl">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold tracking-widest uppercase">Network Link</h4>
          <span className="text-[10px] text-cyan-400">TB/S</span>
        </div>
        <div className="flex-1 min-h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="step" dataKey="value" stroke={stats.anomalyActive ? "#ef4444" : "#00d2ff"} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={`text-2xl font-bold font-['Orbitron'] ${stats.anomalyActive ? 'text-red-500' : ''}`}>
          {stats.network.toFixed(0)}
        </div>
      </div>

      {/* Threat Assessment */}
      <div className="col-span-12 lg:col-span-6 row-span-2 border border-cyan-900/50 bg-black/40 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs font-bold tracking-widest uppercase">Threat Assessment</h4>
          <span className={`px-2 py-0.5 border text-[10px] rounded uppercase ${stats.anomalyActive ? 'border-red-500 text-red-500 animate-pulse' : 'border-green-500 text-green-500'}`}>
            {stats.anomalyActive ? 'HEALING IN PROGRESS' : 'No Immediate Danger'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {['BIOMETRIC', 'CYBER', 'KINETIC', 'THERMAL'].map(type => (
            <div key={type} className="flex flex-col gap-2">
              <span className="text-[9px] opacity-40 uppercase">{type}</span>
              <div className="h-24 bg-cyan-900/10 rounded flex flex-col-reverse relative overflow-hidden border border-cyan-900/20">
                <div className="absolute top-0 w-full h-full opacity-10" style={{backgroundImage: 'linear-gradient(to bottom, #00d2ff 1px, transparent 1px)', backgroundSize: '100% 4px'}}></div>
                <div 
                  className={`w-full transition-all duration-1000 ${stats.anomalyActive && type === 'CYBER' ? 'bg-red-500/80 shadow-[0_0_15px_red]' : 'bg-cyan-400/50 shadow-[0_0_10px_rgba(0,210,255,0.5)]'}`} 
                  style={{ height: stats.anomalyActive && type === 'CYBER' ? '85%' : `${20 + Math.random() * 30}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Alerts Table */}
      <div className="col-span-12 lg:col-span-6 row-span-2 border border-cyan-900/50 bg-black/40 p-4 rounded-xl overflow-hidden">
        <h4 className="text-xs font-bold tracking-widest mb-4 uppercase">Log_File: Event_Stream</h4>
        <div className="space-y-2 text-[11px] font-['Share_Tech_Mono'] h-32 overflow-y-auto">
          {stats.anomalyActive ? (
            <div className="flex gap-4 text-red-500 animate-pulse font-bold">
              <span className="text-red-400">[{new Date().toLocaleTimeString()}]</span> 
              <span className="opacity-40">>></span> 
              SELF_HEALING_PROTOCOL_ENGAGED: {stats.anomalyLocation}
            </div>
          ) : (
            <div className="flex gap-4 text-green-500 font-bold">
              <span className="text-cyan-400">[{new Date().toLocaleTimeString()}]</span> 
              <span className="opacity-40">>></span> 
              SYSTEM_INTEGRITY_RESTORED: NOMINAL
            </div>
          )}
          
          <div className="flex gap-4 opacity-80"><span className="text-cyan-400">12:04:31</span> <span className="opacity-40">>></span> SECURE_SHELL_ESTABLISHED</div>
          <div className="flex gap-4 opacity-80"><span className="text-cyan-400">12:04:45</span> <span className="opacity-40">>></span> SATELLITE_UPLINK_SYNC: 100%</div>
          <div className="flex gap-4 opacity-80"><span className="text-cyan-400">12:05:30</span> <span className="opacity-40">>></span> RUNNING_HEURISTIC_ANALYSIS...</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
