import { useCallback } from 'react';
import {
  trackGameClicked,
  trackGameViewedUnique,
  trackNavigation,
  trackCategoryFilter,
  trackCategoryFilterChanged,
  trackSearch,
  trackShareClicked,
  trackShareCompleted,
  trackSaveClicked,
  trackFullscreenToggled,
  trackReportClicked,
  trackAuthClicked,
  trackModalClosed,
  isGameViewedInSession,
  markGameAsViewedInSession,
  type GameTrackingParams,
  type NavigationParams,
  type CategoryFilterParams,
  type SearchParams,
  type ShareParams,
} from '@/lib/analytics';

export function useAnalytics() {
  const handleGameClick = useCallback((params: GameTrackingParams) => {
    trackGameClicked(params);
    
    if (!isGameViewedInSession(params.game_id)) {
      trackGameViewedUnique(params);
      markGameAsViewedInSession(params.game_id);
    }
  }, []);

  const handleNavigation = useCallback((params: NavigationParams) => {
    trackNavigation(params);
  }, []);

  const handleCategoryFilter = useCallback((params: CategoryFilterParams) => {
    trackCategoryFilter(params);
  }, []);

  const handleCategoryFilterChanged = useCallback((params: CategoryFilterParams) => {
    trackCategoryFilterChanged(params);
  }, []);

  const handleSearch = useCallback((params: SearchParams) => {
    trackSearch(params);
  }, []);

  const handleShareClick = useCallback(() => {
    trackShareClicked();
  }, []);

  const handleShareCompleted = useCallback((params: ShareParams) => {
    trackShareCompleted(params);
  }, []);

  const handleSaveClick = useCallback(() => {
    trackSaveClicked();
  }, []);

  const handleFullscreenToggle = useCallback((state: 'enter' | 'exit') => {
    trackFullscreenToggled(state);
  }, []);

  const handleReportClick = useCallback(() => {
    trackReportClicked();
  }, []);

  const handleAuthClick = useCallback((action: 'sign_in' | 'sign_out') => {
    trackAuthClicked(action);
  }, []);

  const handleModalClose = useCallback((type: 'share' | 'other') => {
    trackModalClosed(type);
  }, []);

  return {
    gameClick: handleGameClick,
    navigation: handleNavigation,
    categoryFilter: handleCategoryFilter,
    categoryFilterChanged: handleCategoryFilterChanged,
    search: handleSearch,
    shareClick: handleShareClick,
    shareCompleted: handleShareCompleted,
    saveClick: handleSaveClick,
    fullscreenToggle: handleFullscreenToggle,
    reportClick: handleReportClick,
    authClick: handleAuthClick,
    modalClose: handleModalClose,
  };
}