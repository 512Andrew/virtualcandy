// =========================
// Core Types (single source)
// =========================

export type Product = {
  id: string;
  name: string;
  vendor: string;
  price: string;
  url: string;
  image: string; // Emoji placeholder for now
  note?: string;
};

export type Constellation = {
  id: string;
  name: string;
  products: Product[];
};

export type Planet = {
  id: string;
  name: string;
  color: string;
  x: string;
  y: string;
  constellations: Constellation[];
};

export type CandyverseData = {
  planets: Planet[];
};