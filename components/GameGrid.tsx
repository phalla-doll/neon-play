'use client';

import { useState } from 'react';
import GameCard from './GameCard';
import { Game } from '@/lib/games';

const CATEGORIES = ['All', 'Action', 'Racing', 'Arcade', 'Puzzle', 'Casual', 'Sports'];

export default function GameGrid({ games }: { games: Game[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGames = selectedCategory === 'All' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

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
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
        {filteredGames.length === 0 && (
          <div className="col-span-full py-12 text-center text-neutral-500">
            No games found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
