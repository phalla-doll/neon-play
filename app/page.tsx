import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import GameCard from '@/components/GameCard';
import { games } from '@/lib/games';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mb-8">
              Recommended Games
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
