'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/lib/games';
import { HugeiconsIcon } from '@hugeicons/react';
import { PlayIcon } from '@hugeicons/core-free-icons';
import { formatNumber, formatDate } from '@/lib/utils';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCallback } from 'react';

interface GameCardProps {
  game: Game;
  position?: number;
  source?: 'grid' | 'related' | 'history';
}

export default function GameCard({ game, position, source = 'grid' }: GameCardProps) {
  const analytics = useAnalytics();

  const handleClick = useCallback(() => {
    analytics.gameClick({
      game_id: game.id,
      title: game.title,
      category: game.category,
      position: position,
      source: source,
    });
  }, [analytics, game.id, game.title, game.category, position, source]);

  return (
    <Link href={`/game/${game.id}`} className="group flex flex-col gap-3" onClick={handleClick}>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-lime-400/50 transition-colors">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center text-black shadow-[0_0_20px_rgba(204,255,0,0.5)]">
            <HugeiconsIcon icon={PlayIcon} size={24} color="black" strokeWidth={1.5} className="ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-mono text-neutral-300">
          {game.category}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-neutral-800 flex-shrink-0 flex items-center justify-center text-lime-400 font-bold text-sm border border-neutral-700">
          {game.developer.charAt(0)}
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-neutral-100 line-clamp-2 group-hover:text-lime-400 transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-neutral-400 mt-1">{game.developer}</p>
          <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
            <span>{formatNumber(game.views)} plays</span>
            <span>•</span>
            <span>{formatDate(game.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
