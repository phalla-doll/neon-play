import Link from 'next/link';
import { Home, Compass, Clock, Bookmark, Flame, Trophy, Puzzle, Car } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Compass, label: 'Explore', href: '#' },
    { icon: Flame, label: 'Trending', href: '#' },
  ];

  const categories = [
    { icon: Trophy, label: 'Action', href: '#' },
    { icon: Car, label: 'Racing', href: '#' },
    { icon: Puzzle, label: 'Puzzle', href: '#' },
    { icon: Clock, label: 'Casual', href: '#' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-neutral-950 border-r border-neutral-800 h-[calc(100vh-4rem)] overflow-y-auto hidden md:block">
      <div className="px-4 py-2 space-y-6">
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-900 transition-colors text-neutral-300 hover:text-lime-400 group"
            >
              <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="pt-4 border-t border-neutral-800 space-y-1">
          <h3 className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Categories
          </h3>
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200"
            >
              <cat.icon className="w-5 h-5" />
              <span className="font-medium">{cat.label}</span>
            </Link>
          ))}
        </div>

        <div className="pt-4 border-t border-neutral-800 space-y-1">
          <Link
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200"
          >
            <Clock className="w-5 h-5" />
            <span className="font-medium">History</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-900 transition-colors text-neutral-400 hover:text-neutral-200"
          >
            <Bookmark className="w-5 h-5" />
            <span className="font-medium">Saved</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
