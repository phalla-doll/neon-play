'use client';

import { useState, useEffect, useCallback } from 'react';
import { getHistory, clearHistory, getSavedGames, toggleSave, clearSaved } from '@/lib/storage';
import type { HistoryEntry } from '@/lib/storage';

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => getHistory());

  useEffect(() => {
    const handleStorageChange = () => {
      setHistory(getHistory());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return {
    history,
    clearHistory: handleClearHistory,
  };
}

export function useSavedGames() {
  const [savedGameIds, setSavedGameIds] = useState<string[]>(() => getSavedGames());

  useEffect(() => {
    const handleStorageChange = () => {
      setSavedGameIds(getSavedGames());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleToggleSave = useCallback((gameId: string) => {
    const isNowSaved = toggleSave(gameId);
    setSavedGameIds(prev => {
      if (isNowSaved) {
        return [gameId, ...prev.filter(id => id !== gameId)].slice(0, 20);
      } else {
        return prev.filter(id => id !== gameId);
      }
    });
  }, []);

  const handleClearSaved = useCallback(() => {
    clearSaved();
    setSavedGameIds([]);
  }, []);

  const checkIsSaved = useCallback((gameId: string) => {
    return savedGameIds.includes(gameId);
  }, [savedGameIds]);

  return {
    savedGameIds,
    toggleSave: handleToggleSave,
    isSaved: checkIsSaved,
    clearSaved: handleClearSaved,
  };
}
