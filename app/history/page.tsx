'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import GameCard from '@/components/GameCard';
import { games } from '@/lib/games';
import { useHistory } from '@/hooks/use-game-storage';
import { formatTimeAgo } from '@/lib/time-ago';

export default function HistoryPage() {
  const { history, clearHistory } = useHistory();

  const historyGames = history
    .map(entry => games.find(g => g.id === entry.gameId))
    .filter((game): game is NonNullable<typeof game> => game !== undefined);

  const handleClearHistory = () => {
    clearHistory();
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-200">
      <Header />
      <MobileNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-neutral-100">History</h1>
              {historyGames.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 rounded-full transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>

            {historyGames.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-neutral-500 text-center">
                  <p className="text-lg font-medium">No games played yet</p>
                  <p className="text-sm mt-2">Start playing games to build your history</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {historyGames.map((game, index) => (
                  <div key={game.id} className="relative">
                    <GameCard game={game} position={index + 1} source="history" />
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-neutral-300">
                      {formatTimeAgo(history[index].timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
