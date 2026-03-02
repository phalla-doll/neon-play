'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { GameIcon, SparklesIcon } from '@hugeicons/core-free-icons';
import SearchBar from './SearchBar';
import { Suspense } from 'react';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCallback } from 'react';

interface HeaderProps {
  resultCount?: number;
}

export default function Header({ resultCount = 0 }: HeaderProps) {
  const analytics = useAnalytics();

  const handleNavigation = useCallback((target: string, type: 'main' | 'section' | 'category') => {
    analytics.navigation({ target, type });
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
        <Link href="https://github.com/phalla-doll/neon-play" target="_blank" rel="noopener noreferrer" className="flex items-center px-2 py-1.5 transition-colors" onClick={() => handleNavigation('github', 'section')} aria-label="View on GitHub">
          <Image src="/github_dark.svg" alt="GitHub" unoptimized width={24} height={24} className="h-6 w-6 opacity-80 hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </header>
  );
}
