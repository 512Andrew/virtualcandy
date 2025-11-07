import type { CandyverseData } from "@/types";

// =========================
// Data Model (single source)
// =========================
export const CANDYVERSE_DATA: CandyverseData = {
  planets: [
    {
      id: "chocolate",
      name: "Chocolate",
      color: "#7c3aed",
      x: "15%",
      y: "35%",
      constellations: [
        {
          id: "dark",
          name: "Dark Side",
          products: [
            {
              id: "sugarfina-champagne-bears",
              name: "Champagne Bears® (Dark Companion Pair)",
              vendor: "Sugarfina",
              price: "from $20",
              url: "https://aff.example/sugarfina/champagne-bears",
              image: "🍾",
              note: "Affiliate link",
            },
            {
              id: "amazon-cocoa-85",
              name: "85% Cocoa Bars Pack",
              vendor: "Amazon",
              price: "varies",
              url: "https://amzn.to/your-tag",
              image: "🍫",
              note: "Affiliate link",
            },
          ],
        },
        {
          id: "filled",
          name: "Filled & Truffles",
          products: [
            {
              id: "nutscom-choco-almonds",
              name: "Chocolate Almonds",
              vendor: "Nuts.com",
              price: "from $12",
              url: "https://aff.example/nuts/choco-almonds",
              image: "🥜",
              note: "Affiliate link",
            },
          ],
        },
      ],
    },
    {
      id: "gummies",
      name: "Gummies",
      color: "#22c55e",
      x: "65%",
      y: "25%",
      constellations: [
        {
          id: "freeze-dried",
          name: "Freeze‑Dried",
          products: [
            {
              id: "candywarehouse-freeze-rainbow",
              name: "Freeze‑Dried Rainbow Bites",
              vendor: "CandyWarehouse",
              price: "from $12",
              url: "https://aff.example/candywarehouse/freeze-dried-rainbow",
              image: "🌈",
              note: "Affiliate link",
            },
            {
              id: "amazon-astronaut-taffy",
              name: "Astronaut Taffy",
              vendor: "Amazon",
              price: "varies",
              url: "https://amzn.to/your-tag",
              image: "🧑‍🚀",
              note: "Affiliate link",
            },
          ],
        },
        {
          id: "sour-gummies",
          name: "Sour Gummies",
          products: [
            {
              id: "oldtimecandy-warheads-gummies",
              name: "Warheads Extreme Gummies",
              vendor: "OldTimeCandy",
              price: "from $9",
              url: "https://aff.example/oldtimecandy/warheads-gummies",
              image: "😖",
              note: "Affiliate link",
            },
          ],
        },
      ],
    },
    {
      id: "retro",
      name: "Retro",
      color: "#f59e0b",
      x: "40%",
      y: "70%",
      constellations: [
        {
          id: "90s",
          name: "The 90s",
          products: [
            {
              id: "oldtimecandy-2000s-box",
              name: "2000s Throwback Box",
              vendor: "OldTimeCandy",
              price: "from $39",
              url: "https://aff.example/oldtimecandy/2000s-box",
              image: "🕹️",
              note: "Affiliate link",
            },
            {
              id: "etsy-nerds-rope-craft",
              name: "Handmade Nerds Rope (Indie)",
              vendor: "Etsy",
              price: "varies",
              url: "https://aff.example/etsy/nerds-rope",
              image: "🧵",
              note: "Affiliate link",
            },
          ],
        },
      ],
    },
    {
      id: "sour",
      name: "Sour",
      color: "#ef4444",
      x: "78%",
      y: "62%",
      constellations: [
        {
          id: "face-warp",
          name: "Face‑Warp Scale",
          products: [
            {
              id: "amazon-warheads-classic",
              name: "Warheads Variety Pack",
              vendor: "Amazon",
              price: "from $14",
              url: "https://amzn.to/your-tag",
              image: "⚡",
              note: "Affiliate link",
            },
          ],
        },
      ],
    },
  ],
} as const;