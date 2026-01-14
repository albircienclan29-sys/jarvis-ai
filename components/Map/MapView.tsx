
import React, { useState, useEffect } from 'react';
import { getNearbyPOIs } from '../../services/geminiService';

const MapView: React.FC = () => {
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [query, setQuery] = useState('Find strategic landmarks and resources nearby');
  const [results, setResults] = useState<{text: string, grounding: any[]}>({ text: '', grounding: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error(err)
    );
  }, []);

  const searchNearby = async () => {
    if (!coords) return;
    setIsLoading(true);
    try {
      const res = await getNearbyPOIs(coords.lat, coords.lng, query);
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <div className="border border-cyan-900/50 bg-black/40 rounded-xl overflow-hidden relative glow-border">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#00d2ff 1px, transparent 1px), linear-gradient(90deg, #00d2ff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
             <div className="w-32 h-32 border border-cyan-500/20 rounded-full animate-ping"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan]"></div>
             </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-black/80 p-3 border border-cyan-900 rounded-lg text-[10px]">
          <div>LAT: {coords?.lat.toFixed(6) || '---'}</div>
          <div>LNG: {coords?.lng.toFixed(6) || '---'}</div>
          <div>ALT: 12.4m</div>
        </div>

        <div className="absolute bottom-0 w-full p-4 bg-black/80 border-t border-cyan-900/50">
           <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-b border-cyan-400/30 text-cyan-400 text-xs py-2 focus:border-cyan-400 outline-none uppercase"
           />
           <button 
             onClick={searchNearby}
             disabled={isLoading || !coords}
             className="mt-4 w-full py-2 bg-cyan-400/10 border border-cyan-400/50 hover:bg-cyan-400/20 text-cyan-400 text-[10px] font-bold tracking-widest transition-all"
           >
             {isLoading ? "POLLING SATELLITE..." : "SCAN PERIMETER"}
           </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-black/60 border border-cyan-900/50 p-6 rounded-xl flex-1 flex flex-col gap-4 overflow-y-auto">
          <h3 className="text-sm font-bold tracking-widest border-b border-cyan-900/50 pb-2">LOCAL INTELLIGENCE REPORT</h3>
          
          <div className="text-sm text-cyan-400/80 leading-relaxed font-['Share_Tech_Mono']">
            {results.text || "Initiate perimeter scan for data..."}
          </div>

          {results.grounding && results.grounding.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <span className="text-[10px] opacity-40">SOURCES IDENTIFIED:</span>
              {results.grounding.map((chunk, idx) => (
                chunk.maps && (
                  <a 
                    key={idx} 
                    href={chunk.maps.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-cyan-400 hover:text-white transition-colors"
                  >
                    >> {chunk.maps.title || "LOCATION_REF_" + idx}
                  </a>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
