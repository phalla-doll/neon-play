'use client';

import { useState, useRef, useEffect } from 'react';
import { Maximize, Minimize, Share2, Bookmark, Flag } from 'lucide-react';
import { Game } from '@/lib/games';
import { formatNumber, formatDate } from '@/lib/utils';

export default function GameClient({ game }: { game: Game }) {
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
    <>
      {/* Game Player */}
      <div 
        ref={containerRef}
        className={`relative w-full bg-black overflow-hidden ${
          isFullscreen 
            ? 'fixed inset-0 z-[100] h-screen' 
            : 'aspect-video rounded-2xl border border-neutral-800 shadow-2xl shadow-lime-400/5'
        }`}
      >
        <iframe
          src={game.embed}
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

      {/* Game Info */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-neutral-100">{game.title}</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-lime-400 font-bold text-xl border border-neutral-700">
              {game.developer.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-200">{game.developer}</h3>
              <p className="text-sm text-neutral-400">{formatNumber(game.views)} plays</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors font-medium">
              <Share2 className="w-5 h-5" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors font-medium">
              <Bookmark className="w-5 h-5" />
              Save
            </button>
            <button 
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors font-medium hidden sm:flex"
            >
              <Maximize className="w-5 h-5" />
              Fullscreen
            </button>
            <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors">
              <Flag className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
            <span>{formatNumber(game.views)} views</span>
            <span>•</span>
            <span>{formatDate(game.date)}</span>
            <span>•</span>
            <span className="text-lime-400">#{game.category}</span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">
            {game.description}
          </p>
        </div>
      </div>
    </>
  );
}
