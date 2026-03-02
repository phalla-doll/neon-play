import Link from 'next/link';
import { Menu, Bell, User, Gamepad2 } from 'lucide-react';
import SearchBar from './SearchBar';
import { Suspense } from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-neutral-950 px-4 border-b border-neutral-800">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
          <Menu className="w-6 h-6 text-neutral-200" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-lime-400" />
          <span className="text-xl font-bold tracking-tight text-neutral-100">Neon Play</span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl px-8">
        <Suspense fallback={<div className="h-10 w-full bg-neutral-900 border border-neutral-800 rounded-full" />}>
          <SearchBar />
        </Suspense>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
          <Bell className="w-6 h-6 text-neutral-200" />
        </button>
        <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
          <div className="w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center border border-lime-400/20">
            <User className="w-5 h-5 text-lime-400" />
          </div>
        </button>
      </div>
    </header>
  );
}
