
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { SystemStats } from '../../types';

interface TacticalViewProps {
  stats: SystemStats;
}

const TacticalView: React.FC<TacticalViewProps> = ({ stats }) => {
  const radarData = [
    { subject: 'DEFENSE', A: 120 - (stats.anomalyActive ? 40 : 0), fullMark: 150 },
    { subject: 'SPEED', A: 98 + (stats.network / 100), fullMark: 150 },
    { subject: 'POWER', A: 146 - (stats.cpu / 5), fullMark: 150 },
    { subject: 'INTELLIGENCE', A: 130, fullMark: 150 },
    { subject: 'STEALTH', A: 85, fullMark: 150 },
    { subject: 'STAMINA', A: 110, fullMark: 150 },
  ];

  const barData = [
    { name: 'CPU', value: stats.cpu },
    { name: 'MEM', value: stats.memory },
    { name: 'NET', value: Math.min(100, stats.network / 2) },
    { name: 'ARC', value: 100 },
  ];

  const missionLog = [
    { time: new Date().toLocaleTimeString(), event: stats.anomalyActive ? 'THREAT_REMEDIATION_ENGAGED' : 'SYSTEM_STABILITY_NOMINAL', status: stats.anomalyActive ? 'ACTIVE' : 'COMPLETE' },
    { time: '12:10:05', event: 'DEPLOYING_IRON_LEGION', status: 'SUCCESS' },
    { time: '12:11:42', event: 'HULKBUSTER_STATUS_READY', status: 'PENDING' },
    { time: '12:15:11', event: 'AVENGERS_REASSEMBLE_SIGNAL', status: 'ACTIVE' },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 h-full overflow-y-auto pb-12">
      {/* Suit Capabilities Radar */}
      <div className="col-span-12 lg:col-span-6 bg-black/40 border border-cyan-900/50 p-6 rounded-xl glow-border">
        <h4 className="text-xs font-bold tracking-widest mb-4">MARK_VII_CAPABILITIES</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#083344" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#00d2ff', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar name="Suit" dataKey="A" stroke="#00d2ff" fill="#00d2ff" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Energy Levels Bar Chart */}
      <div className="col-span-12 lg:col-span-6 bg-black/40 border border-cyan-900/50 p-6 rounded-xl">
        <h4 className="text-xs font-bold tracking-widest mb-4">SUBSYSTEM_ENERGY_LOAD</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: '#00d2ff', fontSize: 10 }} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #00d2ff', color: '#00d2ff', fontSize: 10 }} 
                cursor={{ fill: 'rgba(0, 210, 255, 0.1)' }}
              />
              <Bar dataKey="value" fill="#00d2ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Mission Logs */}
      <div className="col-span-12 bg-black/40 border border-cyan-900/50 rounded-xl overflow-hidden">
        <table className="w-full text-[10px]">
          <thead className="bg-cyan-900/20 border-b border-cyan-900/50">
            <tr>
              <th className="px-6 py-3 text-left tracking-widest uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left tracking-widest uppercase">Operational Event</th>
              <th className="px-6 py-3 text-right tracking-widest uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-900/30">
            {missionLog.map((log, i) => (
              <tr key={i} className="hover:bg-cyan-500/5 transition-colors">
                <td className="px-6 py-4 font-bold text-cyan-400 uppercase">{log.time}</td>
                <td className="px-6 py-4 uppercase opacity-80">{log.event}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-0.5 border rounded uppercase ${
                    log.status === 'SUCCESS' || log.status === 'COMPLETE' ? 'border-green-500 text-green-500' :
                    log.status === 'PENDING' ? 'border-yellow-500 text-yellow-500' :
                    'border-cyan-500 text-cyan-500'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TacticalView;
