'use client';

import { useState, useRef, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

interface GamePlayerProps {
  embedUrl: string;
}

export default function GamePlayer({ embedUrl }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full bg-black overflow-hidden ${
        isFullscreen 
          ? 'fixed inset-0 z-[100] h-screen' 
          : 'aspect-video rounded-2xl border border-neutral-800 shadow-2xl shadow-lime-400/5'
      }`}
    >
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay; fullscreen; gamepad"
        allowFullScreen
      />
      
      {isFullscreen && (
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-[101] p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors border border-white/10"
          aria-label="Exit fullscreen"
        >
          <Minimize className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
