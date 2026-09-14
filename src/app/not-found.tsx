/* eslint-disable @next/next/no-html-link-for-pages -- Static error recovery must work without client-side routing. */
export default function NotFound() {
  return (
    <main className="section">
      <span className="eyebrow">VIRTUAL CANDY STUDIO / 404</span>
      <h1>That page has moved on.</h1>
      <p>There’s plenty to explore back at the studio.</p>
      <a href="/" className="button lime">
        Back to the studio ↗
      </a>
    </main>
  );
}
