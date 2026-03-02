'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import GameCard from './GameCard';
import { Game } from '@/lib/games';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

const CATEGORIES = ['All', 'Action', 'Racing', 'Arcade', 'Puzzle', 'Casual', 'Sports', 'Shooting', 'Drift', 'Simulator', 'Adventure', 'Strategy', '2 Player', 'Girl'];
const ITEMS_PER_PAGE = 12;

export default function GameGrid({ games }: { games: Game[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);
  const analytics = useAnalytics();
  const prevSelectedCategoryRef = useRef(selectedCategory);
  const prevGamesRef = useRef(games);

  const filteredGames = useMemo(() =>
    selectedCategory === 'All'
      ? games
      : games.filter(game => game.category === selectedCategory),
    [selectedCategory, games]
  );

  const displayedGames = useMemo(() =>
    filteredGames.slice(0, displayedCount),
    [filteredGames, displayedCount]
  );

  const hasMore = displayedCount < filteredGames.length;

  useEffect(() => {
    if (prevGamesRef.current !== games) {
      setDisplayedCount(prev => {
        prevGamesRef.current = games;
        return ITEMS_PER_PAGE;
      });
    }
  }, [games]);

  useEffect(() => {
    if (prevSelectedCategoryRef.current !== selectedCategory) {
      setDisplayedCount(prev => {
        prevSelectedCategoryRef.current = selectedCategory;
        return ITEMS_PER_PAGE;
      });
    }
  }, [selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    analytics.categoryFilterChanged({
      category: category,
      from_category: selectedCategory,
      location: 'grid',
    });
    setSelectedCategory(category);
  }, [analytics, selectedCategory]);

  const handleCategoryClick = useCallback((category: string) => {
    analytics.categoryFilter({
      category: category,
      from_category: selectedCategory,
      location: 'grid',
    });
  }, [analytics, selectedCategory]);

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
            type="button"
            onClick={() => {
              handleCategoryChange(category);
              handleCategoryClick(category);
            }}
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8" style={{ contentVisibility: 'auto' }}>
        {displayedGames.map((game, index) => (
          <GameCard key={game.id} game={game} position={index + 1} source="grid" />
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
