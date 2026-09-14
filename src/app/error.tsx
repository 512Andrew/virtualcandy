"use client";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="section">
      <span className="eyebrow">VIRTUAL CANDY STUDIO</span>
      <h1>Something didn’t load.</h1>
      <p>Please try again, or email info@virtualcandy.com.</p>
      <button className="button lime" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
