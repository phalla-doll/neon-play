import Link from 'next/link';
import { User, Gamepad2, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';
import { Suspense } from 'react';

export default function Header() {
  // Mock authentication state for now
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-neutral-950 px-4 border-b border-neutral-800">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-600 shadow-[0_0_15px_rgba(163,230,53,0.3)] group-hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transition-shadow duration-300">
            <Gamepad2 className="w-6 h-6 text-neutral-950 absolute z-10" />
            <Sparkles className="w-3 h-3 text-white absolute top-1 right-1 opacity-70" />
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
          <SearchBar />
        </Suspense>
      </div>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
            <div className="w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center border border-lime-400/20">
              <User className="w-5 h-5 text-lime-400" />
            </div>
          </button>
        ) : (
          <button className="flex items-center gap-2 px-2 sm:px-4 py-1.5 text-sm font-medium text-lime-400 border border-neutral-800 rounded-full hover:bg-lime-400/10 hover:border-lime-400/30 transition-colors">
            <div className="w-6 h-6 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-lime-400" />
            </div>
            <span className="hidden sm:inline">Sign in</span>
          </button>
        )}
      </div>
    </header>
  );
}
