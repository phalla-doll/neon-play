import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/lib/games';
import { Play } from 'lucide-react';

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/game/${game.id}`} className="group flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-lime-400/50 transition-colors">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center text-black shadow-[0_0_20px_rgba(204,255,0,0.5)]">
            <Play className="w-6 h-6 ml-1" />
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
            <span>{game.views} views</span>
            <span>•</span>
            <span>{game.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
