'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import SavedGameCard from '@/components/SavedGameCard';
import { games } from '@/lib/games';
import { useSavedGames } from '@/hooks/use-game-storage';

export default function SavedPage() {
  const { savedGameIds, toggleSave, clearSaved } = useSavedGames();

  const savedGames = savedGameIds
    .map(id => games.find(g => g.id === id))
    .filter((game): game is NonNullable<typeof game> => game !== undefined);

  const handleClearSaved = () => {
    clearSaved();
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
              <h1 className="text-2xl font-bold text-neutral-100">Saved</h1>
              {savedGames.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSaved}
                  className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 rounded-full transition-colors"
                >
                  Clear All Saved
                </button>
              )}
            </div>

            {savedGames.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-neutral-500 text-center">
                  <p className="text-lg font-medium">No saved games yet</p>
                  <p className="text-sm mt-2">Save your favorite games to access them quickly</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedGames.map((game) => (
                  <SavedGameCard
                    key={game.id}
                    game={game}
                    onUnsave={() => toggleSave(game.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
