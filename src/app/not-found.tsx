import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-amber-50">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <span className="text-6xl">🍭</span>
        </div>
        <h1 className="mb-2 text-6xl font-bold text-slate-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-slate-700">Lost in Space</h2>
        <p className="mb-6 text-slate-600">
          This page doesn&apos;t exist in our Candyverse. Let&apos;s get you back on track!
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
        >
          Return to Candyverse
        </Link>
      </div>
    </div>
  );
}
