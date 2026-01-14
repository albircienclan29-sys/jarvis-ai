
import React, { useRef, useState, useEffect } from 'react';
import { analyzeImage } from '../../services/geminiService';

const VisionView: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };
    initCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsAnalyzing(true);
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    
    const base64 = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
    
    try {
      const result = await analyzeImage(base64, "Analyze this tactical feed. Identify any objects, persons, or threats.");
      setAnalysis(result || "No intelligence gathered.");
    } catch (error) {
      setAnalysis("Error communicating with orbital sensor array.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Video Feed */}
      <div className="flex-1 relative border-2 border-cyan-400/20 rounded-xl overflow-hidden bg-black glow-border">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover grayscale brightness-50 contrast-125"
        />
        
        {/* HUD Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 border-t-2 border-l-2 border-cyan-400 w-16 h-16"></div>
          <div className="absolute top-4 right-4 border-t-2 border-r-2 border-cyan-400 w-16 h-16"></div>
          <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-cyan-400 w-16 h-16"></div>
          <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-cyan-400 w-16 h-16"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-400/30 w-1/2 h-1/2 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] text-cyan-400 tracking-[0.5em] font-bold">
            SCANNING OPTICAL FEED...
          </div>
        </div>

        <button 
          onClick={captureAndAnalyze}
          disabled={isAnalyzing}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-3 bg-red-600/20 hover:bg-red-600/40 border border-red-500 text-red-500 font-bold uppercase tracking-widest transition-all disabled:opacity-50"
        >
          {isAnalyzing ? "ANALYZING..." : "CAPTURE INTEL"}
        </button>
      </div>

      {/* Analysis Side Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <div className="bg-black/60 border border-cyan-900/50 p-6 rounded-xl flex-1 flex flex-col gap-4">
          <h3 className="text-sm font-bold tracking-widest border-b border-cyan-900/50 pb-2">TACTICAL INTELLIGENCE</h3>
          
          <div className="flex-1 text-sm text-cyan-400/80 leading-relaxed overflow-y-auto font-['Share_Tech_Mono']">
            {analysis || "Awaiting sensor data..."}
          </div>

          <div className="pt-4 border-t border-cyan-900/50 flex flex-col gap-2">
            <div className="flex justify-between text-[10px]">
              <span>RECOGNITION:</span>
              <span className="text-green-500">OPTIMAL</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span>FIDELITY:</span>
              <span className="text-cyan-400">1080P_MARK_IV</span>
            </div>
          </div>
        </div>

        {/* Mini Preview */}
        <div className="h-48 border border-cyan-900/50 rounded-xl overflow-hidden bg-black">
          <canvas ref={canvasRef} className="hidden" />
          <div className="w-full h-full flex items-center justify-center bg-cyan-900/5">
             <span className="text-[10px] opacity-20">FRAME_BUFFER_01</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionView;
