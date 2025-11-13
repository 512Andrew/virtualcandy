"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-amber-50">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <span className="text-6xl">🍬</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-900">Something went wrong!</h2>
        <p className="mb-6 text-slate-600">
          Oops! The Candyverse encountered a glitch. Don&apos;t worry, we can try again.
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
