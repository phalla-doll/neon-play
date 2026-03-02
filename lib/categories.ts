import { Trophy, Car, Puzzle, Clock } from 'lucide-react';

export interface Category {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ALL_CATEGORIES = ['All', 'Action', 'Racing', 'Arcade', 'Puzzle', 'Casual', 'Sports', 'Shooting', 'Drift', 'Simulator', 'Adventure', 'Strategy', '2 Player', 'Girl'] as const;

export const SIDEBAR_CATEGORIES: Category[] = [
  { id: 'action', label: 'Action', href: '/?mc=Action', icon: Trophy },
  { id: 'racing', label: 'Racing', href: '/?mc=Racing', icon: Car },
  { id: 'puzzle', label: 'Puzzle', href: '/?mc=Puzzle', icon: Puzzle },
  { id: 'casual', label: 'Casual', href: '/?mc=Casual', icon: Clock },
] as const;

export const MOBILE_CATEGORIES: Category[] = [
  { id: 'action', label: 'Action', href: '/?mc=Action', icon: Trophy },
  { id: 'racing', label: 'Racing', href: '/?mc=Racing', icon: Car },
  { id: 'puzzle', label: 'Puzzle', href: '/?mc=Puzzle', icon: Puzzle },
  { id: 'casual', label: 'Casual', href: '/?mc=Casual', icon: Clock },
] as const;
