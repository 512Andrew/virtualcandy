"use client";
import { CANDYVERSE_DATA } from "@/data/candyverse";
import { getFeaturedProducts } from "@/lib/helpers";
import { useCandyverseRouter, useQueryParams } from "@/lib/routing";
import { Product } from "@/types";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D scene to avoid SSR issues with Three.js
const CandyverseScene3D = dynamic(
  () => import("@/components/CandyverseScene3D"),
  { ssr: false }
);

// =========================
// Component
// =========================

export default function VirtualCandyHome() {
  const [modal, setModal] = useState<null | {
    planetId: string;
    planetName: string;
    constellationId: string;
    constellationName: string;
    products: Product[];
  }>(null);

  const router = useCandyverseRouter();
  const { isDevMode, isKeysMode } = useQueryParams();

  useEffect(() => {
    if (isDevMode()) {
      // Import and run dev tests
      import("@/lib/dev-tests").then((module) => {
        module.runDevTests();
      });
    }
  }, [isDevMode]);

  // Keyboard shortcuts (only when ?keys=1)
  useEffect(() => {
    if (!isKeysMode()) return;

    const handleKeydown = (e: KeyboardEvent) => {
      // Don't hijack keys when user is typing
      if (e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.contentEditable === "true") {
        return;
      }

      // Don't hijack when modifier keys are held
      if (e.altKey || e.metaKey || e.ctrlKey) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "g":
          // Navigate to Gummies planet
          router.navigateToPlanet("gummies", "all");
          break;
        case "c":
          // Navigate to Chocolate planet
          router.navigateToPlanet("chocolate");
          break;
        case "r":
          // Navigate to Retro planet
          router.navigateToPlanet("retro");
          break;
        case "s":
          // Navigate to Sour planet
          router.navigateToPlanet("sour");
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isKeysMode, router]);

  // Handle modal based on route
  useEffect(() => {
    if (router.route.planet && router.route.constellation) {
      const planet = CANDYVERSE_DATA.planets.find(p => p.id === router.route.planet);
      const constellation = planet?.constellations.find(c => c.id === router.route.constellation);

      if (planet && constellation) {
        setModal({
          planetId: planet.id,
          planetName: planet.name,
          constellationId: constellation.id,
          constellationName: constellation.name,
          products: constellation.products as Product[]
        });
      }
    } else {
      setModal(null);
    }
  }, [router.route]);

  const handleModalClose = () => {
    setModal(null);
    router.closeCandyverse();
  };

  const handlePlanetClick = (planetId: string, constellationId: string) => {
    router.navigateToConstellation(planetId, constellationId);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 via-white to-amber-50 text-slate-800">
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
            {isKeysMode() && (
              <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-sm">
                <strong>Keyboard shortcuts enabled:</strong> G=Gummies, C=Chocolate, R=Retro, S=Sour
              </div>
            )}
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
          <ArticleCard tag="Candy Science" title="We Freeze-Dried Skittles So You Don't Have To" blurb="The texture, the crunch, the science—plus best buys." />
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
          <Suspense fallback={<CandyverseSceneFallback />}>
            <CandyverseScene3D onOpen={handlePlanetClick} />
          </Suspense>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">How it works</h3>
            <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2">
              <li>Pick a planet (Chocolate, Gummies, Retro, Sour).</li>
              <li>Drag to rotate the view and scroll to zoom in/out.</li>
              <li>Click a planet to discover its constellations and products.</li>
            </ol>
            <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-sm">
              <strong>✨ Three.js Powered:</strong> This interactive 3D scene uses React Three Fiber for smooth planet exploration.
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-xl px-4 py-2 bg-slate-900 text-white text-sm font-semibold"
                onClick={() => handlePlanetClick("gummies", "freeze-dried")}
              >
                Explore Gummies
              </button>
              <button
                className="rounded-xl px-4 py-2 bg-white border text-sm font-semibold"
                onClick={() => alert("Data model lives in CANDYVERSE_DATA → planets[]")}
              >
                View Data Model
              </button>
              <button
                className="rounded-xl px-4 py-2 bg-green-600 text-white text-sm font-semibold"
                onClick={async () => {
                  const success = await router.copyLink();
                  alert(success ? "Link copied to clipboard!" : "Failed to copy link");
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-linear-to-r from-pink-600 to-rose-500 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
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
            <p className="mt-1 text-sm text-slate-600">We tested crunchy space‑candy, tracked TikTok trends, and found budget boxes that don&apos;t taste like regret.</p>
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
      {isDevMode() && <DevTests />}

      {modal && (
        <Modal onClose={handleModalClose}>
          <div className="space-y-1">
            <div className="text-xs text-slate-500">{modal.planetName} → {modal.constellationName}</div>
            <h3 className="text-lg font-bold">Featured treats</h3>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {modal.products.map((p) => (
              <div key={p.id} className="rounded-2xl border p-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-linear-to-br from-amber-50 to-pink-50 flex items-center justify-center text-xl">{p.image}</div>
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
// Presentational Components
// =========================

function CandyverseSceneFallback() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="aspect-video rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center">
        <div className="text-white/80 text-sm">Loading Candyverse...</div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string; }) {
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
function Badge({ children }: { children: React.ReactNode; }) {
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
    <svg viewBox="0 0 48 48" className="size-7 text-pink-600" aria-hidden="true">
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
function ArticleCard({ tag, title, blurb }: { tag: string; title: string; blurb: string; }) {
  return (
    <article className="group rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-video bg-linear-to-br from-amber-100 via-pink-100 to-white flex items-center justify-center text-5xl">🍬</div>
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
function ProductCard({ vendor, name, price, href, note }: {
  vendor: string;
  name: string;
  price: string;
  href: string;
  note?: string;
}) {
  return (
    <div className="group rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-square bg-linear-to-br from-white via-rose-50 to-amber-50 flex items-center justify-center text-6xl">🍭</div>
      <div className="p-5">
        <div className="text-xs font-semibold text-slate-500">{vendor}</div>
        <h3 className="mt-1 text-base font-bold">{name}</h3>
        <div className="mt-1 text-sm text-slate-600">{price}</div>
        <a href={href} className="mt-3 inline-block text-sm font-semibold text-pink-700 hover:underline" target="_blank" rel="noreferrer">Shop →</a>
        {note && <div className="mt-2 text-[11px] text-slate-400">{note}</div>}
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
        <p className="mt-1 text-sm text-slate-600">Crunchy, airy, and dangerously snackable. We tested the internet&apos;s favorites and found the real top picks.</p>
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
function MiniItem({ name, vendor }: { name: string; vendor: string; }) {
  return (
    <div className="rounded-2xl border bg-white p-3 text-xs">
      <div className="aspect-square rounded-xl bg-linear-to-br from-pink-100 to-amber-100 flex items-center justify-center">✨</div>
      <div className="mt-2 font-semibold">{name}</div>
      <div className="text-slate-500">{vendor}</div>
    </div>
  );
}
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void; }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 top-10 mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Candyverse Picks</div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded p-1"
            aria-label="Close modal"
          >
            ✕
          </button>
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
        <div className="font-bold mb-2">Dev Tests Panel</div>
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
