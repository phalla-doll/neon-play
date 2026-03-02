'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, Award01Icon, Car01Icon, PuzzleIcon, ClockIcon } from '@hugeicons/core-free-icons';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { MOBILE_CATEGORIES } from '@/lib/categories';
import { useCallback } from 'react';

const CATEGORY_ICONS = {
  Action: Award01Icon,
  Racing: Car01Icon,
  Puzzle: PuzzleIcon,
  Casual: ClockIcon,
} as const;

export default function MobileNav() {
  const analytics = useAnalytics();

  const handleHomeClick = useCallback(() => {
    analytics.navigation({ target: 'home', type: 'main' });
  }, [analytics]);

  const handleCategoryClick = useCallback((category: string) => {
    analytics.categoryFilter({
      category,
      from_category: 'all',
      location: 'mobile_nav',
    });
  }, [analytics]);

  return (
    <div className="md:hidden bg-neutral-950 border-b border-neutral-800 overflow-x-auto no-scrollbar">
      <div className="flex items-center px-4 py-3 gap-3 min-w-max">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full text-neutral-300 hover:text-lime-400 transition-colors"
          onClick={handleHomeClick}
        >
          <HugeiconsIcon icon={Home01Icon} size={16} color="currentColor" strokeWidth={1.5} />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <div className="w-px h-6 bg-neutral-800 mx-1"></div>
        {MOBILE_CATEGORIES.map((cat) => {
          const IconComponent = CATEGORY_ICONS[cat.label as keyof typeof CATEGORY_ICONS];
          return (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-neutral-200 transition-colors"
              onClick={() => handleCategoryClick(cat.label)}
            >
              <HugeiconsIcon icon={IconComponent} size={16} color="currentColor" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm font-medium">{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
