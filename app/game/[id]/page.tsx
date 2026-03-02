import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import { games } from '@/lib/games';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatNumber, formatDate } from '@/lib/utils';
import GameClient from '@/components/GameClient';
import GameCard from '@/components/GameCard';

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
      <MobileNav />
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
              {relatedGames.map((relatedGame, index) => (
                <GameCard key={relatedGame.id} game={relatedGame} position={index + 1} source="related" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
