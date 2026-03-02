'use client';

import Link from 'next/link';
import { Home, Compass, Flame, Trophy, Car, Puzzle, Clock } from 'lucide-react';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

export default function MobileNav() {
  const analytics = useAnalytics();
  
  const categories = [
    { icon: Trophy, label: 'Action', href: '/?mc=Action' },
    { icon: Car, label: 'Racing', href: '/?mc=Racing' },
    { icon: Puzzle, label: 'Puzzle', href: '/?mc=Puzzle' },
    { icon: Clock, label: 'Casual', href: '/?mc=Casual' },
  ];

  const handleHomeClick = () => {
    analytics.navigation({ target: 'home', type: 'main' });
  };

  const handleCategoryClick = (category: string) => {
    analytics.categoryFilter({
      category,
      from_category: 'all',
      location: 'mobile_nav',
    });
  };

  return (
    <div className="md:hidden bg-neutral-950 border-b border-neutral-800 overflow-x-auto no-scrollbar">
      <div className="flex items-center px-4 py-3 gap-3 min-w-max">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full text-neutral-300 hover:text-lime-400 transition-colors"
          onClick={handleHomeClick}
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <div className="w-px h-6 bg-neutral-800 mx-1"></div>
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-neutral-200 transition-colors"
            onClick={() => handleCategoryClick(cat.label)}
          >
            <cat.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{cat.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
