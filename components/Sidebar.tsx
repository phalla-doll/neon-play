'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, CompassIcon, Award01Icon, Car01Icon, PuzzleIcon, ClockIcon, Bookmark01Icon } from '@hugeicons/core-free-icons';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { SIDEBAR_CATEGORIES } from '@/lib/categories';
import { useCallback } from 'react';

const CATEGORY_ICONS = {
  Action: Award01Icon,
  Racing: Car01Icon,
  Puzzle: PuzzleIcon,
  Casual: ClockIcon,
} as const;

export default function Sidebar() {
  const analytics = useAnalytics();

  const links = [
    { icon: Home01Icon, label: 'Home', href: '/', target: 'home' as const },
  ];

  const handleNavigationClick = useCallback((target: string, type: 'main' | 'section' | 'category') => {
    analytics.navigation({ target, type });
  }, [analytics]);

  const handleCategoryClick = useCallback((category: string) => {
    analytics.categoryFilter({
      category,
      from_category: 'all',
      location: 'sidebar',
    });
  }, [analytics]);

  return (
    <aside className="w-64 flex-shrink-0 bg-neutral-950 border-r border-neutral-800 h-[calc(100vh-4rem)] overflow-y-auto hidden md:block">
      <div className="px-4 py-2 space-y-6">
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-900 transition-colors text-neutral-300 hover:text-lime-400 group"
              onClick={() => handleNavigationClick(link.target, link.target === 'home' ? 'main' : 'section')}
            >
              <HugeiconsIcon icon={link.icon} size={20} color="currentColor" strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="pt-4 border-t border-neutral-800 space-y-1">
          <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Categories
          </h3>
          {SIDEBAR_CATEGORIES.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.label as keyof typeof CATEGORY_ICONS];
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200"
                onClick={() => handleCategoryClick(cat.label)}
              >
                <HugeiconsIcon icon={IconComponent} size={20} color="currentColor" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-medium">{cat.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-4 border-t border-neutral-800 space-y-1">
          <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Library
          </h3>
          <Link
            href="/history"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200"
            onClick={() => handleNavigationClick('history', 'section')}
          >
            <HugeiconsIcon icon={ClockIcon} size={20} color="currentColor" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-medium">History</span>
          </Link>
          <Link
            href="/saved"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200"
            onClick={() => handleNavigationClick('saved', 'section')}
          >
            <HugeiconsIcon icon={Bookmark01Icon} size={20} color="currentColor" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-medium">Saved</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
