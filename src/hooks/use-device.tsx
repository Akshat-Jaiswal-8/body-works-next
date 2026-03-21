'use client';

import { useEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return mounted ? matches : false;
};

const useDevice = (queries?: string | string[]) => {
  const isMobile = useMediaQuery('only screen and (max-width : 767px)');
  const isTablet = useMediaQuery('only screen and (min-width : 768px) and (max-width : 1024px)');
  const isDesktop = useMediaQuery('only screen and (min-width : 1025px) and (max-width : 2379px)');
  const isDesktopLarge = useMediaQuery('only screen and (min-width : 2380px)');
  const singleQuery = useMediaQuery(typeof queries === 'string' ? queries : 'not all');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isDesktopLarge,
    customQuery: singleQuery,
  };
};

export default useDevice;
