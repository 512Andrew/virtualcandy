import { CANDYVERSE_DATA } from "@/data/candyverse";
import { getFeaturedProducts, getFeaturedFrom } from "@/lib/helpers";
import type { Product } from "@/types";

// =========================
// Development Tests (minimal assertions in-browser)
// =========================

/**
 * Run development tests for the Candyverse data and helpers
 * These tests are designed to catch basic data integrity issues
 * and ensure helper functions work as expected
 */
export function runDevTests(): void {
  const log = (ok: boolean, name: string, detail = "") => {
    const prefix = ok ? "✅" : "❌";
    console.log(`${prefix} ${name}${detail ? ` — ${detail}` : ""}`);
  };

  console.log("🧪 Running VirtualCandy Dev Tests...");

  try {
    // Test 1: No duplicate planet IDs
    const planetIds = CANDYVERSE_DATA.planets.map((p) => p.id);
    const uniquePlanetIds = new Set(planetIds);
    log(
      uniquePlanetIds.size === planetIds.length, 
      "No duplicate planet IDs",
      `Found ${planetIds.length} planets, ${uniquePlanetIds.size} unique`
    );

    // Test 2: Each constellation has products array
    const allConstellations = CANDYVERSE_DATA.planets.flatMap((p) => p.constellations);
    const hasProductsArray = allConstellations.every((c) => Array.isArray(c.products));
    log(
      hasProductsArray, 
      "Constellations expose products arrays",
      `Checked ${allConstellations.length} constellations`
    );

    // Test 3: Each product has minimally-required fields
    const allProducts = allConstellations.flatMap((c) => c.products);
    const hasRequiredFields = allProducts.every((pr: Product) => 
      pr && 
      typeof pr.id === 'string' && pr.id.length > 0 &&
      typeof pr.name === 'string' && pr.name.length > 0 &&
      typeof pr.url === 'string' && pr.url.length > 0
    );
    log(
      hasRequiredFields, 
      "Products contain id/name/url",
      `Checked ${allProducts.length} products`
    );

    // Test 4: getFeaturedProducts returns <= 8
    const featured = getFeaturedProducts();
    log(
      featured.length <= 8, 
      "getFeaturedProducts limits to 8", 
      `Returns ${featured.length} items`
    );

    // Test 5: Check that prototype data path is valid (Gummies planet)
    const gummiesPlanet = CANDYVERSE_DATA.planets.find(p => p.id === "gummies");
    const hasGummiesData = !!(gummiesPlanet && 
      gummiesPlanet.constellations.length > 0 && 
      Array.isArray(gummiesPlanet.constellations[0].products));
    log(hasGummiesData, "Prototype button data path is valid");

    // Test 6: Helper exists and is a function
    log(
      typeof getFeaturedProducts === "function", 
      "getFeaturedProducts is defined as function"
    );

    // Test 7: Helper doesn't mutate data (purity test)
    const beforeData = JSON.stringify(CANDYVERSE_DATA);
    getFeaturedProducts(); // Call the function
    const afterData = JSON.stringify(CANDYVERSE_DATA);
    log(
      beforeData === afterData, 
      "getFeaturedProducts is pure (non‑mutating)"
    );

    // Test 8: getFeaturedFrom can handle empty structure
    const emptyMock = { planets: [] };
    const emptyResult = getFeaturedFrom(emptyMock);
    log(
      Array.isArray(emptyResult) && emptyResult.length === 0, 
      "getFeaturedFrom handles empty data",
      "getFeaturedFrom([]) → []"
    );

    // Test 9: No duplicate constellation IDs within each planet
    let constellationIdsValid = true;
    for (const planet of CANDYVERSE_DATA.planets) {
      const constellationIds = planet.constellations.map(c => c.id);
      const uniqueConstellationIds = new Set(constellationIds);
      if (uniqueConstellationIds.size !== constellationIds.length) {
        constellationIdsValid = false;
        break;
      }
    }
    log(constellationIdsValid, "No duplicate constellation IDs within planets");

    // Test 10: No duplicate product IDs across entire dataset
    const productIds = allProducts.map((p: Product) => p.id);
    const uniqueProductIds = new Set(productIds);
    log(
      uniqueProductIds.size === productIds.length,
      "No duplicate product IDs globally",
      `Found ${productIds.length} products, ${uniqueProductIds.size} unique`
    );

    console.log("✅ All dev tests completed");

  } catch (error: unknown) {
    console.error("❌ Dev tests crashed:", error instanceof Error ? error.message : String(error));
  }
}

/**
 * Get a summary of the current data for development purposes
 */
export function getDataSummary() {
  const planets = CANDYVERSE_DATA.planets;
  const totalConstellations = planets.reduce((sum, p) => sum + p.constellations.length, 0);
  const totalProducts = planets.reduce((sum, p) => 
    sum + p.constellations.reduce((cSum, c) => cSum + c.products.length, 0), 0
  );

  return {
    planets: planets.length,
    constellations: totalConstellations,
    products: totalProducts,
    featured: getFeaturedProducts().length,
  };
}