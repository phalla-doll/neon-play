import { Award01Icon, Car01Icon, PuzzleIcon, ClockIcon } from '@hugeicons/core-free-icons';

export interface Category {
  id: string;
  label: string;
  href: string;
  icon: any;
}

export const ALL_CATEGORIES = ['All', 'Action', 'Racing', 'Arcade', 'Puzzle', 'Casual', 'Sports', 'Shooting', 'Drift', 'Simulator', 'Adventure', 'Strategy', '2 Player', 'Girl'] as const;

export const SIDEBAR_CATEGORIES: Category[] = [
  { id: 'action', label: 'Action', href: '/?mc=Action', icon: Award01Icon },
  { id: 'racing', label: 'Racing', href: '/?mc=Racing', icon: Car01Icon },
  { id: 'puzzle', label: 'Puzzle', href: '/?mc=Puzzle', icon: PuzzleIcon },
  { id: 'casual', label: 'Casual', href: '/?mc=Casual', icon: ClockIcon },
] as const;

export const MOBILE_CATEGORIES: Category[] = [
  { id: 'action', label: 'Action', href: '/?mc=Action', icon: Award01Icon },
  { id: 'racing', label: 'Racing', href: '/?mc=Racing', icon: Car01Icon },
  { id: 'puzzle', label: 'Puzzle', href: '/?mc=Puzzle', icon: PuzzleIcon },
  { id: 'casual', label: 'Casual', href: '/?mc=Casual', icon: ClockIcon },
] as const;
