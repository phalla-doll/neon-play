'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon, GameIcon, SparklesIcon } from '@hugeicons/core-free-icons';
import SearchBar from './SearchBar';
import { Suspense } from 'react';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCallback } from 'react';

interface HeaderProps {
  resultCount?: number;
}

export default function Header({ resultCount = 0 }: HeaderProps) {
  const analytics = useAnalytics();
  // Mock authentication state for now
  const isLoggedIn = false;

  const handleNavigation = useCallback((target: string, type: 'main' | 'section' | 'category') => {
    analytics.navigation({ target, type });
  }, [analytics]);

  const handleAuthClick = useCallback(() => {
    analytics.authClick('sign_in');
  }, [analytics]);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-neutral-950 px-4 border-b border-neutral-800">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group relative" onClick={() => handleNavigation('home', 'main')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-600 shadow-[0_0_15px_rgba(163,230,53,0.3)] group-hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transition-shadow duration-300">
            <HugeiconsIcon icon={GameIcon} size={24} color="#141517" strokeWidth={1.5} className="absolute z-10" />
            <HugeiconsIcon icon={SparklesIcon} size={12} color="white" strokeWidth={1.5} className="absolute top-1 right-1 opacity-70" aria-hidden="true" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400">
              NEON<span className="text-lime-400">PLAY</span>
            </span>
            <span className="text-[10px] font-medium tracking-widest text-neutral-500 uppercase -mt-1">
              Arcade
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl px-2 sm:px-4 md:px-8">
        <Suspense fallback={<div className="h-10 w-full bg-neutral-900 border border-neutral-800 rounded-full" />}>
          <SearchBar resultCount={resultCount} />
        </Suspense>
      </div>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <button type="button" className="p-2 hover:bg-neutral-800 rounded-full transition-colors" aria-label="User profile">
            <div className="w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center border border-lime-400/20">
              <HugeiconsIcon icon={UserIcon} size={20} color="#84cc16" strokeWidth={1.5} />
            </div>
          </button>
        ) : (
          <button type="button" className="flex items-center gap-2 px-2 sm:px-4 py-1.5 text-sm font-medium text-lime-400 border border-neutral-800 rounded-full hover:bg-lime-400/10 hover:border-lime-400/30 transition-colors" onClick={handleAuthClick} aria-label="Sign in">
            <div className="w-6 h-6 rounded-full flex items-center justify-center">
              <HugeiconsIcon icon={UserIcon} size={16} color="#84cc16" strokeWidth={1.5} />
            </div>
            <span className="hidden sm:inline">Sign in</span>
          </button>
        )}
      </div>
    </header>
  );
}
