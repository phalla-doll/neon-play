import Header from '@/components/Header';
import { games } from '@/lib/games';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatNumber, formatDate } from '@/lib/utils';
import GameClient from '@/components/GameClient';

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  const relatedGames = games.filter((g) => g.id !== id).slice(0, 5);

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-200 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <GameClient game={game} />
            </div>

            {/* Sidebar / Related Games */}
            <div className="xl:w-[400px] flex-shrink-0 space-y-4">
              <h3 className="font-semibold text-lg text-neutral-200 mb-4">Up next</h3>
              {relatedGames.map((relatedGame) => (
                <Link key={relatedGame.id} href={`/game/${relatedGame.id}`} className="flex gap-3 group">
                  <div className="relative w-40 aspect-video rounded-xl overflow-hidden bg-neutral-900 flex-shrink-0 border border-neutral-800 group-hover:border-lime-400/50 transition-colors">
                    <Image
                      src={relatedGame.thumbnail}
                      alt={relatedGame.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-300">
                      {relatedGame.category}
                    </div>
                  </div>
                  <div className="flex flex-col py-1">
                    <h4 className="font-semibold text-sm text-neutral-200 line-clamp-2 group-hover:text-lime-400 transition-colors leading-tight">
                      {relatedGame.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">{relatedGame.developer}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{formatNumber(relatedGame.views)} views • {formatDate(relatedGame.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
