'use client';

import { useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ExpandIcon, MinimizeIcon } from '@hugeicons/core-free-icons';
import { useFullscreen } from '@/hooks/use-fullscreen';

interface GamePlayerProps {
  embedUrl: string;
}

export default function GamePlayer({ embedUrl }: GamePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

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
        title="Game player"
      />

      {isFullscreen && (
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-[101] p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors border border-white/10"
          aria-label="Exit fullscreen"
        >
          <HugeiconsIcon icon={MinimizeIcon} size={24} color="white" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
