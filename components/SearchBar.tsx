'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

interface SearchBarProps {
  resultCount?: number;
}

export default function SearchBar({ resultCount = 0 }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analytics = useAnalytics();
  const searchQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (newQuery.trim()) {
        router.push(`/?q=${encodeURIComponent(newQuery.trim())}`);
      } else {
        router.push('/');
      }
    }, 300);
  }, [router]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      analytics.search({
        result_count: resultCount,
        has_results: resultCount > 0,
      });
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/');
    }
  }, [analytics, query, resultCount, router]);

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden focus-within:border-lime-400/50 transition-colors">
      <input
        type="text"
        name="search"
        value={query}
        onChange={handleChange}
        placeholder="Search games..."
        className="flex-1 bg-transparent px-4 sm:px-6 py-2 sm:py-2.5 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/50 min-w-0"
      />
      <button type="submit" className="px-4 sm:px-6 py-2 sm:py-2.5 bg-neutral-800 hover:bg-neutral-700 transition-colors border-l border-neutral-800" aria-label="Search">
        <HugeiconsIcon icon={Search01Icon} size={20} color="#a3a3a3" strokeWidth={1.5} className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </form>
  );
}
