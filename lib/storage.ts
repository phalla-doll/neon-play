export interface HistoryEntry {
  gameId: string;
  timestamp: number;
}

const HISTORY_KEY = 'neon-play-history';
const SAVED_KEY = 'neon-play-saved';
const MAX_ITEMS = 20;

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function addToHistory(gameId: string): void {
  if (!isClient()) return;

  try {
    const existing = getHistory();
    const newEntry: HistoryEntry = {
      gameId,
      timestamp: Date.now(),
    };

    const filtered = existing.filter(entry => entry.gameId !== gameId);
    const updated = [newEntry, ...filtered].sort((a, b) => b.timestamp - a.timestamp);
    const trimmed = updated.slice(0, MAX_ITEMS);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to add to history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (!isClient()) return [];

  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];

    const parsed: HistoryEntry[] = JSON.parse(data);
    return parsed.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Failed to get history:', error);
    return [];
  }
}

export function clearHistory(): void {
  if (!isClient()) return;

  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

export function toggleSave(gameId: string): boolean {
  if (!isClient()) return false;

  try {
    const saved = getSavedGames();
    const index = saved.indexOf(gameId);

    if (index === -1) {
      const updated = [gameId, ...saved].slice(0, MAX_ITEMS);
      localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      return true;
    } else {
      const updated = saved.filter(id => id !== gameId);
      localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      return false;
    }
  } catch (error) {
    console.error('Failed to toggle save:', error);
    return false;
  }
}

export function isSaved(gameId: string): boolean {
  const saved = getSavedGames();
  return saved.includes(gameId);
}

export function getSavedGames(): string[] {
  if (!isClient()) return [];

  try {
    const data = localStorage.getItem(SAVED_KEY);
    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to get saved games:', error);
    return [];
  }
}

export function clearSaved(): void {
  if (!isClient()) return;

  try {
    localStorage.removeItem(SAVED_KEY);
  } catch (error) {
    console.error('Failed to clear saved games:', error);
  }
}
