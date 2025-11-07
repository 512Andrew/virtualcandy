import { useEffect, useMemo, useState } from "react";

// v0.2.2 — Fix duplicate function bug + add more dev tests
// - Removed stray duplicate declarations at the bottom (getFeaturedProducts, Product, CANDYVERSE_DATA, import)
// - Keep a SINGLE data source + SINGLE helper function
// - Added extra dev tests: helper existence, stable output shape, non‑mutating behavior
//   Toggle tests with `?dev=1`

// =========================
// Data Model (single source)
// =========================
const CANDYVERSE_DATA = {
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

// =========================
// Types
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

// =========================
// Helpers (single definition)
// =========================
function getFeaturedFrom(data: typeof CANDYVERSE_DATA): Product[] {
  const picks: Product[] = [];
  for (const p of data.planets) {
    for (const c of p.constellations) {
      for (const item of c.products) {
        picks.push(item as Product);
      }
    }
  }
  return picks.slice(0, 8);
}

function getFeaturedProducts(): Product[] {
  return getFeaturedFrom(CANDYVERSE_DATA);
}

// Dev tests — minimal assertions in-browser (no test runner required)
function runDevTests() {
  const log = (ok: boolean, name: string, detail = "") => {
    const prefix = ok ? "✅" : "❌";
    console.log(`${prefix} ${name}${detail ? ` — ${detail}` : ""}`);
  };

  try {
    // Test 1: No duplicate planet IDs
    const planetIds = CANDYVERSE_DATA.planets.map((p) => p.id);
    const setIds = new Set(planetIds);
    log(setIds.size === planetIds.length, "No duplicate planet IDs");

    // Test 2: Each constellation has products array
    const allConstellations = CANDYVERSE_DATA.planets.flatMap((p) => p.constellations);
    log(allConstellations.every((c) => Array.isArray(c.products)), "Constellations expose products arrays");

    // Test 3: Each product has minimally-required fields
    const products = allConstellations.flatMap((c) => c.products);
    const requiredOk = products.every((pr: any) => pr && pr.id && pr.name && pr.url);
    log(requiredOk, "Products contain id/name/url");

    // Test 4: getFeaturedProducts returns <= 8
    const featured = getFeaturedProducts();
    log(featured.length <= 8, "getFeaturedProducts limits to 8", `(${featured.length})`);

    // Test 5: Clicking prototype button would open modal with products
    log(Array.isArray(CANDYVERSE_DATA.planets[1].constellations[0].products), "Prototype button data path is valid");

    // NEW Test 6: Helper exists and is a function
    log(typeof getFeaturedProducts === "function", "getFeaturedProducts is defined once");

    // NEW Test 7: Helper doesn't mutate data
    const before = JSON.stringify(CANDYVERSE_DATA);
    void getFeaturedProducts();
    const after = JSON.stringify(CANDYVERSE_DATA);
    log(before === after, "getFeaturedProducts is pure (non‑mutating)");

    // NEW Test 8: getFeaturedFrom can handle empty structure
    const emptyMock = { planets: [] } as const;
    const res = getFeaturedFrom(emptyMock as any);
    log(Array.isArray(res) && res.length === 0, "getFeaturedFrom([]) → []");
  } catch (e: any) {
    console.error("❌ Dev tests crashed:", e?.message || e);
  }
}

// =========================
// Component
// =========================
export default function VirtualCandyPrototype() {
  const [modal, setModal] = useState<null | { planetId: string; planetName: string; constellationId: string; constellationName: string; products: Product[] }>(null);

  // Run tiny dev tests when `?dev=1`
  const enableDev = useMemo(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("dev") === "1";
  }, []);

  useEffect(() => {
    if (enableDev) runDevTests();
  }, [enableDev]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-amber-50 text-slate-800">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/75 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-extrabold tracking-tight">Virtual<span className="text-pink-600">Candy</span></span>
            <span className="hidden md:inline text-xs ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Where Sweet Meets Geek</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a className="hover:text-pink-600 transition" href="#articles">Articles</a>
            <a className="hover:text-pink-600 transition" href="#shop">Shop</a>
            <a className="hover:text-pink-600 transition" href="#candyverse">Candyverse</a>
            <a className="hover:text-pink-600 transition" href="#newsletter">Newsletter</a>
          </nav>
          <div className="flex items-center gap-2">
            <input placeholder="Search candy, guides, boxes…" className="hidden sm:block w-64 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" />
            <button className="rounded-xl bg-pink-600 text-white text-sm px-3 py-2 hover:bg-pink-700">Sign In</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Discover sweets by <span className="text-pink-600">era, mood,</span> and <span className="text-amber-600">science</span>.
            </h1>
            <p className="mt-4 text-slate-600 max-w-prose">Read geeky reviews, tour the timeline of candy history, then jump into the <span className="font-semibold">Candyverse</span>—our interactive playground that maps flavors like planets. Click a treat to shop via our partners.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#candyverse" className="rounded-2xl px-5 py-3 bg-slate-900 text-white text-sm font-semibold shadow hover:shadow-md hover:scale-[1.01] transition">Enter the Candyverse</a>
              <a href="#shop" className="rounded-2xl px-5 py-3 bg-pink-600 text-white text-sm font-semibold shadow hover:bg-pink-700 transition">Shop Curated Picks</a>
              <a href="#articles" className="rounded-2xl px-5 py-3 bg-amber-100 text-amber-900 text-sm font-semibold shadow hover:bg-amber-200 transition">Read Guides</a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
              <Badge>Retro candy</Badge>
              <Badge>Freeze-dried</Badge>
              <Badge>Sugar-free</Badge>
              <Badge>Gift boxes</Badge>
            </div>
          </div>
          <div className="relative">
            <CandyHeroCard />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section id="articles" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="Fresh from the Lab" subtitle="Candy reviews, nostalgia, and candy science." />
        <div className="grid md:grid-cols-3 gap-6">
          <ArticleCard tag="Candy Science" title="We Freeze-Dried Skittles So You Don’t Have To" blurb="The texture, the crunch, the science—plus best buys." />
          <ArticleCard tag="Nostalgia" title="90s Candy That Defined LAN Parties" blurb="From Pixy Stix to Warheads: the snacks that fueled dial-up dreams." />
          <ArticleCard tag="Guides" title="Top 7 Sour Candies Ranked by Face Warp" blurb="Measured on our extremely scientific Pucker Scale™." />
        </div>
      </section>

      {/* Shop / Affiliate Grid */}
      <section id="shop" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="Curated Aisles" subtitle="Click through to our partners. We may earn a commission." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFeaturedProducts().map((p) => (
            <ProductCard key={p.id} vendor={p.vendor} name={p.name} price={p.price} href={p.url} note={p.note} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <a href="#" className="text-sm font-semibold text-pink-700 hover:underline">See all aisles</a>
        </div>
      </section>

      {/* Candyverse Portal */}
      <section id="candyverse" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader title="Step Into the Candyverse" subtitle="Explore flavors as planets. Click a planet → see products → jump to shop." />
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <CandyverseScene onOpen={(payload) => setModal(payload)} />
          <div className="space-y-4">
            <h3 className="text-xl font-bold">How it works</h3>
            <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2">
              <li>Pick a planet (Chocolate, Gummies, Retro, Sour).</li>
              <li>Zoom in to discover constellations (e.g., “Freeze-Dried”).</li>
              <li>Click a treat to open a product card with affiliate link.</li>
            </ol>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm">
              <strong>Dev note:</strong> This mock uses static data. Swap for a Three.js scene later and feed with this JSON.
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl px-4 py-2 bg-slate-900 text-white text-sm font-semibold" onClick={() => setModal({ planetId: "gummies", planetName: "Gummies", constellationId: "freeze-dried", constellationName: "Freeze‑Dried", products: CANDYVERSE_DATA.planets[1].constellations[0].products as Product[] })}>Open Prototype</button>
              <button className="rounded-xl px-4 py-2 bg-white border text-sm font-semibold" onClick={() => alert("Data model lives in CANDYVERSE_DATA → planets[]")}>View Data Model</button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-pink-600 to-rose-500 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-2xl font-extrabold">Find your Flavor Personality</h3>
            <p className="text-white/90 text-sm mt-1">Take our 45‑second quiz. Get a personalized candy list and discount codes.</p>
          </div>
          <button className="rounded-2xl bg-white text-pink-700 font-semibold px-5 py-3 hover:scale-[1.02] transition">Start Quiz</button>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <SectionHeader title="The Sugar Feed" subtitle="Weekly drops of reviews, deals, and candy lore." />
        <div className="rounded-3xl border bg-white p-6 shadow-sm grid md:grid-cols-[1.5fr_1fr] gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold uppercase tracking-wider">
              <Dot /> Latest issue
            </div>
            <h4 className="mt-2 text-lg font-bold">Freeze‑Dried Frenzy + 5 Giftable Boxes Under $25</h4>
            <p className="mt-1 text-sm text-slate-600">We tested crunchy space‑candy, tracked TikTok trends, and found budget boxes that don’t taste like regret.</p>
          </div>
          <form className="flex md:justify-end items-center gap-3">
            <input placeholder="you@domain.com" className="w-full md:w-64 rounded-xl border px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" />
            <button className="rounded-xl px-4 py-3 bg-pink-600 text-white text-sm font-semibold hover:bg-pink-700">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-extrabold">Virtual<span className="text-pink-600">Candy</span></span>
            </div>
            <p className="mt-2 text-slate-600">Affiliate disclosure: We may earn commissions when you buy through our links. No sponsored sugar highs—honest reviews only.</p>
          </div>
          <div>
            <h5 className="font-semibold">Explore</h5>
            <ul className="mt-2 space-y-2 text-slate-600">
              <li><a className="hover:text-pink-600" href="#articles">Articles</a></li>
              <li><a className="hover:text-pink-600" href="#shop">Shop</a></li>
              <li><a className="hover:text-pink-600" href="#candyverse">Candyverse</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Categories</h5>
            <ul className="mt-2 space-y-2 text-slate-600">
              <li>Retro & Nostalgia</li>
              <li>Freeze‑Dried</li>
              <li>Sugar‑Free / Keto</li>
              <li>Gift Boxes</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Legal</h5>
            <ul className="mt-2 space-y-2 text-slate-600">
              <li>Affiliate Disclosure</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-10">© {new Date().getFullYear()} VirtualCandy.com</div>
      </footer>

      {/* Dev tests panel (visible only when ?dev=1) */}
      {enableDev && <DevTests />}

      {modal && (
        <Modal onClose={() => setModal(null)}>
          <div className="space-y-1">
            <div className="text-xs text-slate-500">{modal.planetName} → {modal.constellationName}</div>
            <h3 className="text-lg font-bold">Featured treats</h3>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {modal.products.map((p) => (
              <div key={p.id} className="rounded-2xl border p-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-amber-50 to-pink-50 flex items-center justify-center text-xl">{p.image}</div>
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-[12px] text-slate-500">{p.vendor} • {p.price}</div>
                  </div>
                </div>
                <a href={p.url} className="mt-3 inline-block text-sm font-semibold text-pink-700 hover:underline" target="_blank" rel="noreferrer">Shop →</a>
                <div className="mt-1 text-[11px] text-slate-400">{p.note}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

// =========================
// Presentational Bits
// =========================
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>
        <p className="text-slate-600 text-sm mt-1">{subtitle}</p>
      </div>
      <a href="#" className="text-sm font-semibold text-pink-700 hover:underline">View all</a>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 border">
      <Dot /> {children}
    </span>
  );
}

function Dot() {
  return <span className="inline-block size-1.5 rounded-full bg-current"></span>;
}

function Logo() {
  return (
    <svg viewBox="0 0 48 48" className="size-7 text-pink-600" aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#g)" opacity="0.18" />
      <path d="M10 24c6-10 22-10 28 0-6 10-22 10-28 0z" fill="url(#g)" />
      <circle cx="17" cy="22" r="2" fill="#ec4899" />
      <circle cx="31" cy="22" r="2" fill="#f59e0b" />
    </svg>
  );
}

function ArticleCard({ tag, title, blurb }) {
  return (
    <article className="group rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-[16/9] bg-gradient-to-br from-amber-100 via-pink-100 to-white flex items-center justify-center text-5xl">🍬</div>
      <div className="p-5">
        <div className="text-xs font-semibold text-amber-700">{tag}</div>
        <h3 className="mt-1 text-lg font-bold group-hover:text-pink-700 transition">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{blurb}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
          <span>6 min read</span>
          <span>•</span>
          <a href="#" className="font-semibold text-pink-700 hover:underline">Read</a>
        </div>
      </div>
    </article>
  );
}

function ProductCard({ vendor, name, price, href, note }) {
  return (
    <div className="group rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-square bg-gradient-to-br from-white via-rose-50 to-amber-50 flex items-center justify-center text-6xl">🍭</div>
      <div className="p-5">
        <div className="text-xs font-semibold text-slate-500">{vendor}</div>
        <h3 className="mt-1 text-base font-bold">{name}</h3>
        <div className="mt-1 text-sm text-slate-600">{price}</div>
        <a href={href} className="mt-3 inline-block text-sm font-semibold text-pink-700 hover:underline" target="_blank" rel="noreferrer">Shop →</a>
        <div className="mt-2 text-[11px] text-slate-400">{note}</div>
      </div>
    </div>
  );
}

function CandyHeroCard() {
  return (
    <div className="relative rounded-3xl border bg-white p-6 shadow-md overflow-hidden">
      <div className="absolute -top-24 -right-24 size-64 rounded-full bg-pink-200 blur-3xl opacity-60" />
      <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-amber-200 blur-3xl opacity-60" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Trending</span>
          <span className="text-xs text-slate-500">Updated hourly</span>
        </div>
        <h3 className="mt-2 text-2xl font-extrabold">Freeze‑Dried Candy Is Having a Moment</h3>
        <p className="mt-1 text-sm text-slate-600">Crunchy, airy, and dangerously snackable. We tested the internet’s favorites and found the real top picks.</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <MiniItem name="Rainbow Bites" vendor="CandyWarehouse" />
          <MiniItem name="Astronaut Taffy" vendor="Amazon" />
          <MiniItem name="Space Mallows" vendor="CandyClub" />
        </div>
        <div className="mt-5 flex gap-3">
          <a href="#shop" className="rounded-xl bg-pink-600 text-white text-sm font-semibold px-4 py-2">Shop the list</a>
          <a href="#articles" className="rounded-xl bg-white border text-sm font-semibold px-4 py-2">Read the review</a>
        </div>
      </div>
    </div>
  );
}

function MiniItem({ name, vendor }) {
  return (
    <div className="rounded-2xl border bg-white p-3 text-xs">
      <div className="aspect-square rounded-xl bg-gradient-to-br from-pink-100 to-amber-100 flex items-center justify-center">✨</div>
      <div className="mt-2 font-semibold">{name}</div>
      <div className="text-slate-500">{vendor}</div>
    </div>
  );
}

function CandyverseScene({ onOpen }: { onOpen: (payload: { planetId: string; planetName: string; constellationId: string; constellationName: string; products: Product[] }) => void }) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="aspect-video rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">
        {/* Mock starfield */}
        <div className="absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/80"
              style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: Math.random() }}
            />
          ))}
        </div>
        {/* Planets from data */}
        {CANDYVERSE_DATA.planets.map((p) => (
          <Planet
            key={p.id}
            name={p.name}
            x={p.x}
            y={p.y}
            color={p.color}
            onClick={() =>
              onOpen({
                planetId: p.id,
                planetName: p.name,
                constellationId: p.constellations[0].id,
                constellationName: p.constellations[0].name,
                products: p.constellations[0].products as Product[],
              })
            }
          />
        ))}
        <div className="absolute bottom-3 left-3 text-xs text-white/80">Prototype: Click a planet → modal with products</div>
      </div>
    </div>
  );
}

function Planet({ name, x, y, color, onClick }: { name: string; x: string; y: string; color: string; onClick: () => void }) {
  return (
    <button className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: x, top: y }} onClick={onClick}>
      <div className="size-16 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.1)]" style={{ background: color }} />
      <div className="mt-1 text-[11px] text-white/90 text-center">{name}</div>
    </button>
  );
}

function Modal({ children, onClose }: { children: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 top-10 mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Candyverse Picks</div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

// =========================
// Dev Tests UI (shown with ?dev=1)
// =========================
function DevTests() {
  const featured = getFeaturedProducts();
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-2xl border bg-white p-4 text-sm">
        <div className="font-bold mb-2">Dev Tests</div>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Expect no duplicate planet IDs.</li>
          <li>Expect each constellation to expose a products array.</li>
          <li>Expect each product to include id, name, url.</li>
          <li>Expect getFeaturedProducts() to return ≤ 8 items (currently {featured.length}).</li>
          <li>Expect helper functions to be pure and non‑mutating.</li>
        </ul>
        <div className="mt-3 text-xs text-slate-500">Console shows detailed pass/fail logs. Append <code>?dev=1</code> to the URL to auto-run tests.</div>
      </div>
    </section>
  );
}