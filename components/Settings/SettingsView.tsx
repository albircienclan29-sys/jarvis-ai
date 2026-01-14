
import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="bg-black/40 border border-cyan-900/50 p-8 rounded-xl glow-border">
        <h2 className="text-xl font-bold font-['Orbitron'] mb-8 tracking-[0.2em] border-b border-cyan-900 pb-4">CORE_SYSTEM_CONFIG</h2>
        
        <div className="space-y-8">
          {/* Personality Matrix */}
          <div className="flex flex-col gap-4">
            <label className="text-xs font-bold tracking-widest opacity-60">PERSONALITY_MATRIX</label>
            <div className="flex gap-4">
              {['JARVIS', 'FRIDAY', 'EDITH'].map(v => (
                <button 
                  key={v}
                  className={`flex-1 py-3 border ${v === 'JARVIS' ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400' : 'border-cyan-900/50 text-cyan-900'} text-xs font-bold transition-all`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Alert Tones */}
          <div className="flex flex-col gap-4">
            <label className="text-xs font-bold tracking-widest opacity-60">SYSTEM_ALERT_THROTTLE</label>
            <input type="range" className="w-full accent-cyan-400" />
            <div className="flex justify-between text-[10px] opacity-40">
              <span>MINIMAL</span>
              <span>OVERLOAD</span>
            </div>
          </div>

          {/* Security Protocols */}
          <div className="flex flex-col gap-4">
            <label className="text-xs font-bold tracking-widest opacity-60">SECURITY_PROTOCOLS</label>
            <div className="space-y-2">
              {[
                'HOUSE_PARTY_PROTOCOL',
                'CLEAN_SLATE_PROTOCOL',
                'BARF_AUGMENTED_REALITY',
                'ORBITAL_DROP_AUTHORIZATION'
              ].map(p => (
                <div key={p} className="flex items-center justify-between p-3 border border-cyan-900/30 bg-cyan-900/5 rounded">
                  <span className="text-xs font-bold opacity-80">{p}</span>
                  <div className="w-10 h-5 bg-cyan-900/50 rounded-full relative p-1 cursor-pointer">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-4">
        <p className="text-[10px] opacity-40 leading-relaxed uppercase tracking-widest">
          Warning: Modifying core system parameters without authorized STARK_INDUSTRIES clearance may result in catastrophic suit failure.
        </p>
      </div>
    </div>
  );
};

export default SettingsView;
