import { useEffect, useState } from "react";
import { parseCandyverseHash, buildCandyverseHash } from "@/lib/helpers";

// =========================
// URL Routing Hook for Hash-based Navigation
// =========================

export interface CandyverseRoute {
  planet?: string;
  constellation?: string;
  view?: string;
}

/**
 * Hook for managing hash-based routing in the Candyverse
 * Supports URLs like: #candyverse?planet=gummies&view=all
 * Always preserves query parameters like ?dev=1&keys=1
 */
export function useCandyverseRouter() {
  const [route, setRoute] = useState<CandyverseRoute>({});

  // Parse initial hash on mount
  useEffect(() => {
    const parseCurrentHash = () => {
      const hash = window.location.hash.slice(1); // Remove #
      const parsed = parseCandyverseHash(hash);
      if (parsed) {
        setRoute(parsed);
      }
    };

    parseCurrentHash();

    // Listen for hash changes
    const handleHashChange = () => {
      parseCurrentHash();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigate to a new Candyverse route
  const navigate = (newRoute: CandyverseRoute) => {
    const { planet, constellation, view } = newRoute;
    if (planet) {
      const newHash = buildCandyverseHash(planet, constellation, view, true);
      window.location.hash = newHash;
    }
  };

  // Navigate to a specific planet
  const navigateToPlanet = (planetId: string, view?: string) => {
    navigate({ planet: planetId, view });
  };

  // Navigate to a specific constellation within a planet
  const navigateToConstellation = (planetId: string, constellationId: string) => {
    navigate({ planet: planetId, constellation: constellationId });
  };

  // Close the Candyverse (reset to base hash)
  const closeCandyverse = () => {
    window.location.hash = '#candyverse';
  };

  // Get a shareable link that preserves current query parameters
  const getShareableLink = (): string => {
    const baseUrl = window.location.origin + window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const queryString = searchParams.toString();
    const hash = window.location.hash;
    
    return `${baseUrl}${queryString ? `?${queryString}` : ''}${hash}`;
  };

  // Copy current link to clipboard with preserved query params
  const copyLink = async (): Promise<boolean> => {
    try {
      const link = getShareableLink();
      await navigator.clipboard.writeText(link);
      return true;
    } catch (error) {
      console.error('Failed to copy link:', error);
      return false;
    }
  };

  return {
    route,
    navigate,
    navigateToPlanet,
    navigateToConstellation,
    closeCandyverse,
    getShareableLink,
    copyLink,
  };
}

/**
 * Hook for managing query parameters (?dev=1, ?keys=1, etc.)
 */
export function useQueryParams() {
  const [params, setParams] = useState<URLSearchParams>(new URLSearchParams());

  useEffect(() => {
    const updateParams = () => {
      setParams(new URLSearchParams(window.location.search));
    };

    updateParams();

    // Listen for any navigation that might change query params
    const handleChange = () => {
      updateParams();
    };

    window.addEventListener('popstate', handleChange);
    window.addEventListener('pushstate', handleChange);
    window.addEventListener('replacestate', handleChange);

    return () => {
      window.removeEventListener('popstate', handleChange);
      window.removeEventListener('pushstate', handleChange);
      window.removeEventListener('replacestate', handleChange);
    };
  }, []);

  const hasParam = (key: string): boolean => {
    return params.has(key);
  };

  const getParam = (key: string): string | null => {
    return params.get(key);
  };

  const isDevMode = (): boolean => {
    return getParam('dev') === '1';
  };

  const isKeysMode = (): boolean => {
    return getParam('keys') === '1';
  };

  return {
    params,
    hasParam,
    getParam,
    isDevMode,
    isKeysMode,
  };
}