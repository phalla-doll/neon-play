import Header from '@/components/Header';
import { games } from '@/lib/games';
import { notFound } from 'next/navigation';
import { Share2, Flag, Maximize, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  const relatedGames = games.filter((g) => g.id !== id).slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Game Player */}
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl shadow-lime-400/5">
                <iframe
                  src={game.url}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; fullscreen; gamepad"
                  allowFullScreen
                />
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
                      <p className="text-sm text-neutral-400">{game.views} plays</p>
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
                    <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-neutral-700 transition-colors font-medium hidden sm:flex">
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
                    <span>{game.views} views</span>
                    <span>•</span>
                    <span>{game.date}</span>
                    <span>•</span>
                    <span className="text-lime-400">#{game.category}</span>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Play {game.title} online for free. This is an awesome {game.category.toLowerCase()} game developed by {game.developer}. 
                    Enjoy the best gaming experience right in your browser.
                  </p>
                </div>
              </div>
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
                    <p className="text-xs text-neutral-500 mt-0.5">{relatedGame.views} views • {relatedGame.date}</p>
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
