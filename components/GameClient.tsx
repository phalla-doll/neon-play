'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Maximize, Minimize, Share2, Bookmark, Flag, X, Twitter, Facebook, Copy, Check, BookmarkCheck } from 'lucide-react';
import { Game } from '@/lib/games';
import { formatNumber, formatDate } from '@/lib/utils';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useFullscreen } from '@/hooks/use-fullscreen';
import { addToHistory } from '@/lib/storage';
import { useSavedGames } from '@/hooks/use-game-storage';

export default function GameClient({ game }: { game: Game }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const analytics = useAnalytics();
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const { isSaved: checkIsSaved, toggleSave } = useSavedGames();

  useEffect(() => {
    analytics.fullscreenToggle(isFullscreen ? 'enter' : 'exit');
  }, [isFullscreen, analytics]);

  useEffect(() => {
    addToHistory(game.id);
  }, [game.id]);

  const gameIsSaved = checkIsSaved(game.id);

  const handleSaveToggle = useCallback(() => {
    toggleSave(game.id);
    analytics.saveClick();
  }, [toggleSave, game.id, analytics]);

  const handleShareTwitter = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${game.title} on Neon Play!`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    analytics.shareCompleted({ platform: 'twitter' });
  }, [analytics, game.title]);

  const handleShareFacebook = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    analytics.shareCompleted({ platform: 'facebook' });
  }, [analytics]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    analytics.shareCompleted({ platform: 'copy' });
  }, [analytics]);

  const handleShareModalOpen = useCallback(() => {
    setIsShareModalOpen(true);
    analytics.shareClick();
  }, [analytics]);

  const handleModalClose = useCallback(() => {
    setIsShareModalOpen(false);
    analytics.modalClose('share');
  }, [analytics]);

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
          title={game.title}
        />
        
        {isFullscreen && (
          <button 
            type="button"
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

          <div className="flex items-center gap-2 flex-wrap">
            <button 
              type="button"
              onClick={handleShareModalOpen}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors font-medium text-sm sm:text-base"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Share
            </button>
            <button 
              type="button"
              onClick={handleSaveToggle}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border transition-colors font-medium text-sm sm:text-base ${
                gameIsSaved 
                  ? 'bg-lime-400/10 border-lime-400/30 text-lime-400 hover:bg-lime-400/20' 
                  : 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700'
              }`}
            >
              {gameIsSaved ? <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />}
              {gameIsSaved ? 'Saved' : 'Save'}
            </button>
            <button 
              type="button"
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors font-medium text-sm sm:text-base sm:hidden"
            >
              <Maximize className="w-4 h-4" />
              Fullscreen
            </button>
            <button 
              type="button"
              onClick={toggleFullscreen}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors font-medium text-base"
            >
              <Maximize className="w-5 h-5" />
              Fullscreen
            </button>
            <button 
              type="button"
              onClick={() => analytics.reportClick()}
              aria-label="Report this game"
              className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors"
            >
              <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
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

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-100">Share this game</h2>
              <button 
                type="button"
                onClick={handleModalClose}
                className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                type="button"
                onClick={handleShareTwitter}
                className="flex items-center justify-center gap-2 py-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] rounded-xl transition-colors font-medium"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </button>
              <button 
                type="button"
                onClick={handleShareFacebook}
                className="flex items-center justify-center gap-2 py-3 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] rounded-xl transition-colors font-medium"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </button>
            </div>

            <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 rounded-xl">
              <input 
                type="text" 
                readOnly 
                value={typeof window !== 'undefined' ? window.location.href : ''} 
                className="flex-1 bg-transparent text-sm text-neutral-400 px-2 truncate focus:outline-none focus-visible:ring-0"
              />
              <button 
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors font-medium text-sm"
              >
                {isCopied ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
