
import React, { useState, useRef, useEffect } from 'react';
import { generateResponse, speakResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: "Welcome back, Sir. All systems are operating within normal parameters. How may I assist you today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.slice(-5).map(m => ({ role: m.role, content: m.content }));
      const response = await generateResponse(input, history);
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || "I apologize, Sir, I'm having trouble connecting to the neural link.",
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      
      if (voiceEnabled && response) {
        speakResponse(response).catch(err => console.error("TTS Error:", err));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 max-w-4xl mx-auto">
      {/* Messages Window */}
      <div 
        ref={scrollRef}
        className="flex-1 bg-black/40 border border-cyan-900/50 rounded-xl p-6 overflow-y-auto flex flex-col gap-6 relative"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`
              max-w-[80%] px-4 py-3 rounded-lg text-sm border shadow-sm
              ${msg.role === 'user' 
                ? 'bg-cyan-900/20 border-cyan-400 text-cyan-200 ml-12 rounded-tr-none' 
                : 'bg-black/60 border-cyan-900 text-cyan-400 mr-12 rounded-tl-none'}
            `}>
              {msg.content}
            </div>
            <span className="text-[10px] mt-1 opacity-40 uppercase tracking-tighter">
              {msg.role === 'assistant' ? 'J.A.R.V.I.S.' : 'USER_01'} // {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex flex-col items-start animate-pulse">
            <div className="bg-black/60 border border-cyan-900 text-cyan-400 px-4 py-3 rounded-lg text-sm">
              Processing data...
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-black/80 border border-cyan-900/50 p-4 rounded-xl flex gap-4 items-center glow-border relative overflow-hidden">
        <button 
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`p-2 rounded transition-colors ${voiceEnabled ? 'text-cyan-400 bg-cyan-900/20' : 'text-gray-600'}`}
          title="Toggle Voice Response"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="TYPE COMMAND OR QUERY..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-cyan-400 placeholder:text-cyan-900 uppercase tracking-widest text-sm"
        />
        <button 
          onClick={handleSend}
          disabled={isTyping}
          className="px-6 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/50 text-cyan-400 text-xs font-bold transition-all disabled:opacity-50"
        >
          EXECUTE
        </button>
      </div>

      <div className="flex justify-between px-2">
        <span className="text-[9px] opacity-40">UPLINK_STATUS: SECURE</span>
        <span className="text-[9px] opacity-40">VOICE_SYNTH: {voiceEnabled ? 'ACTIVE' : 'MUTED'}</span>
      </div>
    </div>
  );
};

export default ChatView;
