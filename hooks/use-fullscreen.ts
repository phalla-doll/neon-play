import { useState, useEffect, useRef, type RefObject } from 'react';

interface UseFullscreenResult {
  isFullscreen: boolean;
  toggleFullscreen: () => Promise<void>;
}

export function useFullscreen(containerRef: RefObject<HTMLDivElement | null>): UseFullscreenResult {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevFullscreenRef = useRef(isFullscreen);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const newFullscreenState = !!document.fullscreenElement;
      if (prevFullscreenRef.current !== newFullscreenState) {
        prevFullscreenRef.current = newFullscreenState;
      }
      setIsFullscreen(newFullscreenState);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  return { isFullscreen, toggleFullscreen };
}
