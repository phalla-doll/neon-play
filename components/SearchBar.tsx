'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(newQuery.trim())}`);
    } else {
      router.push('/');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden focus-within:border-lime-400/50 transition-colors">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search games..."
        className="flex-1 bg-transparent px-4 sm:px-6 py-2 sm:py-2.5 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none min-w-0"
      />
      <button type="submit" className="px-4 sm:px-6 py-2 sm:py-2.5 bg-neutral-800 hover:bg-neutral-700 transition-colors border-l border-neutral-800">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
      </button>
    </form>
  );
}
