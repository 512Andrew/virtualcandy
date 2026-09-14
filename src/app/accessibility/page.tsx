import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility features and help using Virtual Candy Studio.",
  alternates: { canonical: "/accessibility" },
};
export default function Accessibility() {
  return (
    <main id="main" className="legal-page">
      <Link href="/">← Back to the studio</Link>
      <h1>Accessibility</h1>
      <p>Updated September 14, 2026</p>
      <p>
        We aim to make Virtual Candy Studio usable with keyboards, assistive technology and a range
        of screen sizes, using WCAG 2.2 Level AA as our design target. This is an ongoing effort,
        not a certification of complete conformance.
      </p>
      <h2>Features</h2>
      <p>
        The site includes labeled form controls, a skip link on the homepage, visible keyboard
        focus, expandable FAQs, readable text, light and dark appearance choices, and support for
        reduced-motion preferences. The estimate updates are announced politely to assistive
        technology.
      </p>
      <h2>Getting help</h2>
      <p>
        If you encounter a barrier, email{" "}
        <a href="mailto:info@virtualcandy.com">info@virtualcandy.com</a>. Include the page, the task
        you were trying to complete and, if helpful, your browser or assistive technology. We can
        discuss services and prepare an estimate by email.
      </p>
      <p>
        The inquiry button opens your email application; a downloadable brief is available if that
        does not work on your device. External client websites are maintained separately and may
        have different accessibility features.
      </p>
      <nav aria-label="Policies">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Service terms</Link>
      </nav>
    </main>
  );
}
