import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How the Virtual Candy Studio website handles inquiries, browser preferences and hosting data.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <main id="main" className="legal-page">
      <Link href="/">← Back to the studio</Link>
      <h1>Privacy notice</h1>
      <p>Updated September 20, 2026</p>
      <p>
        This notice describes the Virtual Candy Studio website. Contact{" "}
        <a href="mailto:info@virtualcandy.com">info@virtualcandy.com</a> with privacy questions.
      </p>
      <h2>Your project inquiry</h2>
      <p>
        The estimate builder works in your browser. When you select “Send my inquiry,” your name,
        email address, business or project, message and estimate are sent to Netlify Forms, stored
        in the studio’s Netlify account and included in an email notification to
        info@virtualcandy.com. Netlify also processes technical submission data for spam prevention
        and service operation. “Download brief” creates a text file on your device without
        submitting the inquiry.
      </p>
      <p>
        When you email us, the studio and the email providers involved receive your message and
        email delivery information. We use inquiries to respond, discuss a proposal and manage the
        business relationship. Please do not include passwords, payment-card details, medical
        records or other sensitive personal information.
      </p>
      <h2>Browser storage and hosting</h2>
      <p>
        The site stores your Auto, Light or Dark appearance choice in local storage under
        “vc-theme.” This preference stays in your browser until you change it or clear site data.
        The site does not include advertising pixels or third-party analytics scripts.
      </p>
      <p>
        Netlify hosts this site and may process technical request data, such as IP addresses,
        browser information and requested pages, to deliver and secure it. Read{" "}
        <a href="https://www.netlify.com/privacy/" rel="noopener noreferrer" target="_blank">
          Netlify’s privacy policy (opens in a new tab)
        </a>
        . Your email provider separately handles emails and drafts according to its own policies.
      </p>
      <h2>Your choices</h2>
      <p>
        You can browse without making an inquiry, clear the stored theme preference through your
        browser settings, or contact us to request access, correction or deletion of information you
        have submitted or emailed. We may need to verify the request and retain records where
        required for an active project, accounting, legal obligations or dispute resolution.
        Applicable privacy rights depend on your location and circumstances.
      </p>
      <h2>External websites and updates</h2>
      <p>
        Client examples link to independently operated websites with their own privacy practices.
        This notice will be updated when the site’s data handling changes, including any future
        payment service.
      </p>
      <nav aria-label="Policies">
        <Link href="/terms">Service terms</Link>
        <Link href="/accessibility">Accessibility</Link>
      </nav>
    </main>
  );
}
