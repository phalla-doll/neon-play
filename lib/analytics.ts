declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export interface GameTrackingParams {
  game_id: string;
  title: string;
  category: string;
  position?: number;
  source?: 'grid' | 'related' | 'sidebar' | 'mobile_nav';
}

export interface NavigationParams {
  target: string;
  type?: 'main' | 'category' | 'section';
}

export interface CategoryFilterParams {
  category: string;
  from_category?: string;
  location?: 'sidebar' | 'mobile_nav' | 'grid';
}

export interface SearchParams {
  result_count: number;
  has_results: boolean;
}

export interface ShareParams {
  platform: 'twitter' | 'facebook' | 'copy';
}

export interface ButtonClickParams {
  action: string;
  type?: 'primary' | 'secondary' | 'icon';
}

const SESSION_STORAGE_KEY = 'neon_play_session_id';
const VIEWED_GAMES_KEY = 'neon_play_viewed_games';

let sessionId: string | null = null;

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  if (!sessionId) {
    sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
  }
  
  return sessionId;
}

export function trackGameClicked(params: GameTrackingParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'game_clicked', {
    game_id: params.game_id,
    game_title: params.title,
    category: params.category,
    position_in_grid: params.position,
    source: params.source || 'grid',
  });
}

export function trackGameViewedUnique(params: GameTrackingParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'game_viewed_unique', {
    game_id: params.game_id,
    game_title: params.title,
    category: params.category,
  });
}

export function trackNavigation(params: NavigationParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'navigation_clicked', {
    target: params.target,
    type: params.type || 'main',
  });
}

export function trackCategoryFilter(params: CategoryFilterParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'category_filter_clicked', {
    category: params.category,
    from_category: params.from_category || 'all',
    location: params.location || 'grid',
  });
}

export function trackCategoryFilterChanged(params: CategoryFilterParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'category_filter_changed', {
    new_category: params.category,
    old_category: params.from_category || 'all',
    location: params.location || 'grid',
  });
}

export function trackSearch(params: SearchParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'search_performed', {
    result_count: params.result_count,
    has_results: params.has_results,
  });
}

export function trackShareClicked(): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'share_clicked');
}

export function trackShareCompleted(params: ShareParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'share_completed', {
    platform: params.platform,
  });
}

export function trackSaveClicked(): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'save_clicked');
}

export function trackFullscreenToggled(state: 'enter' | 'exit'): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'fullscreen_toggled', {
    state: state,
  });
}

export function trackReportClicked(): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'report_clicked');
}

export function trackAuthClicked(action: 'sign_in' | 'sign_out'): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'auth_clicked', {
    action: action,
  });
}

export function trackModalClosed(type: 'share' | 'other'): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'modal_closed', {
    type: type,
  });
}

export function isGameViewedInSession(gameId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const viewedGames = JSON.parse(localStorage.getItem(VIEWED_GAMES_KEY) || '{}');
    const viewed = viewedGames[gameId] || 0;
    
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    if (viewed > oneHourAgo) {
      return true;
    }
    
    return false;
  } catch {
    return false;
  }
}

export function markGameAsViewedInSession(gameId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const viewedGames = JSON.parse(localStorage.getItem(VIEWED_GAMES_KEY) || '{}');
    viewedGames[gameId] = Date.now();
    localStorage.setItem(VIEWED_GAMES_KEY, JSON.stringify(viewedGames));
  } catch {
  }
}