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

const useMediaQueries = (queries: string[]): boolean[] => {
  const [matches, setMatches] = useState<boolean[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setMatches(queries.map(() => false));
      return;
    }

    const mediaQueries = queries.map((query) => window.matchMedia(query));
    const updateMatches = () => {
      setMatches(mediaQueries.map((mediaQuery) => mediaQuery.matches));
    };

    updateMatches();

    mediaQueries.forEach((mediaQuery) => {
      mediaQuery.addEventListener('change', updateMatches);
    });

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        mediaQuery.removeEventListener('change', updateMatches);
      });
    };
  }, [queries]);

  return matches;
};

const useDevice = (queries?: string | string[]) => {
  const isMobile = useMediaQuery('only screen and (max-width : 767px)');
  const isTablet = useMediaQuery('only screen and (min-width : 768px) and (max-width : 1024px)');
  const isDesktop = useMediaQuery('only screen and (min-width : 1025px) and (max-width : 2379px)');
  const isDesktopLarge = useMediaQuery('only screen and (min-width : 2380px)');

  const singleQuery = useMediaQuery(typeof queries === 'string' ? queries : 'not all');

  const multipleQueries = useMediaQueries(Array.isArray(queries) ? queries : []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isDesktopLarge,
    customQuery: singleQuery,
    customQueries: multipleQueries,
  };
};

export default useDevice;
