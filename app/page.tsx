import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import GameGrid from '@/components/GameGrid';
import { games } from '@/lib/games';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-200 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mb-6">
              Recommended Games
            </h1>
            <GameGrid games={games} />
          </div>
        </main>
      </div>
    </div>
  );
}
