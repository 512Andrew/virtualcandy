import { CANDYVERSE_DATA } from "@/data/candyverse";
import type { Product, CandyverseData } from "@/types";

// =========================
// Pure Helper Functions (single definition)
// =========================

/**
 * Extract featured products from candyverse data, limited to 8 items
 * This is a pure function that does not mutate the input data
 */
export function getFeaturedFrom(data: CandyverseData): Product[] {
  const picks: Product[] = [];
  for (const planet of data.planets) {
    for (const constellation of planet.constellations) {
      for (const item of constellation.products) {
        picks.push(item);
      }
    }
  }
  return picks.slice(0, 8);
}

/**
 * Get featured products from the main CANDYVERSE_DATA
 * Returns up to 8 featured products
 */
export function getFeaturedProducts(): Product[] {
  return getFeaturedFrom(CANDYVERSE_DATA);
}

/**
 * Get all products for a specific planet, aggregated from all constellations
 * @param planetId - The ID of the planet
 * @returns Flattened array of all products in the planet
 */
export function aggregatePlanetProducts(planetId: string): Product[] {
  const planet = CANDYVERSE_DATA.planets.find(p => p.id === planetId);
  if (!planet) return [];
  
  return planet.constellations.flatMap(constellation => constellation.products);
}

/**
 * Get products for a specific constellation within a planet
 * @param planetId - The ID of the planet
 * @param constellationId - The ID of the constellation
 * @returns Array of products in the constellation
 */
export function getConstellationProducts(planetId: string, constellationId: string): Product[] {
  const planet = CANDYVERSE_DATA.planets.find(p => p.id === planetId);
  if (!planet) return [];
  
  const constellation = planet.constellations.find(c => c.id === constellationId);
  return constellation?.products || [];
}

/**
 * Parse hash-based URL parameters for Candyverse navigation
 * Supports: #candyverse?planet=<id>&view=all or &constellation=<id>
 * @param hash - The hash portion of the URL (without #)
 * @returns Parsed parameters or null if not a candyverse URL
 */
export function parseCandyverseHash(hash: string): {
  planet?: string;
  constellation?: string;
  view?: string;
} | null {
  if (!hash.startsWith('candyverse')) return null;
  
  const [, queryString] = hash.split('?');
  if (!queryString) return {};
  
  const params = new URLSearchParams(queryString);
  return {
    planet: params.get('planet') || undefined,
    constellation: params.get('constellation') || undefined,
    view: params.get('view') || undefined,
  };
}

/**
 * Build a Candyverse hash URL with optional query parameters preserved
 * @param planet - Planet ID to navigate to
 * @param constellation - Optional constellation ID
 * @param view - Optional view mode (e.g., "all")
 * @param preserveQuery - Whether to preserve existing query parameters like ?dev=1
 * @returns Complete hash URL
 */
export function buildCandyverseHash(
  planet: string, 
  constellation?: string, 
  view?: string,
  preserveQuery = true
): string {
  const params = new URLSearchParams();
  params.set('planet', planet);
  if (constellation) params.set('constellation', constellation);
  if (view) params.set('view', view);
  
  // Preserve existing query parameters if requested
  if (preserveQuery && typeof window !== 'undefined') {
    const currentSearch = new URLSearchParams(window.location.search);
    for (const [key] of currentSearch) {
      if (key === 'dev' || key === 'keys') {
        // These should be preserved in the main URL, not the hash
        continue;
      }
    }
  }
  
  return `#candyverse?${params.toString()}`;
}