'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import GameCard from './GameCard';
import { Game } from '@/lib/games';

const CATEGORIES = ['All', 'Action', 'Racing', 'Arcade', 'Puzzle', 'Casual', 'Sports', 'Shooting', 'Drift', 'Simulator', 'Adventure', 'Strategy', '2 Player', 'Girl'];
const ITEMS_PER_PAGE = 12;

export default function GameGrid({ games }: { games: Game[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [prevCategory, setPrevCategory] = useState(selectedCategory);
  const [prevGames, setPrevGames] = useState(games);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Reset displayed count when category or games change without using useEffect
  if (selectedCategory !== prevCategory || games !== prevGames) {
    setDisplayedCount(ITEMS_PER_PAGE);
    setPrevCategory(selectedCategory);
    setPrevGames(games);
  }

  const filteredGames = selectedCategory === 'All' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const displayedGames = filteredGames.slice(0, displayedCount);
  const hasMore = displayedCount < filteredGames.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredGames.length));
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, filteredGames.length]);

  return (
    <div>
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-neutral-100 text-neutral-900'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
        {displayedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        {filteredGames.length === 0 && (
          <div className="col-span-full py-12 text-center text-neutral-500">
            No games found in this category.
          </div>
        )}
      </div>
      
      {hasMore && (
        <div ref={observerTarget} className="w-full py-8 flex justify-center">
          <div className="w-8 h-8 border-4 border-neutral-800 border-t-lime-400 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
