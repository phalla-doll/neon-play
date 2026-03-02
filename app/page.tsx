import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import GameGrid from '@/components/GameGrid';
import { games } from '@/lib/games';

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string, mc?: string }> }) {
  const { q, mc } = await searchParams;
  
  let filteredGames = games;

  if (q) {
    filteredGames = filteredGames.filter(game => 
      game.title.toLowerCase().includes(q.toLowerCase()) || 
      game.category.toLowerCase().includes(q.toLowerCase()) ||
      game.developer.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (mc) {
    filteredGames = filteredGames.filter(game => game.master_category === mc);
  }

  let title = 'Recommended Games';
  if (q) {
    title = `Search results for "${q}"`;
  } else if (mc) {
    title = `${mc} Games`;
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-200 font-sans">
      <Header resultCount={q ? filteredGames.length : 0} />
      <MobileNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 mb-6">
              {title}
            </h1>
            <GameGrid games={filteredGames} />
          </div>
        </main>
      </div>
    </div>
  );
}
