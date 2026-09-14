import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Service terms & website information",
  description:
    "Understand Virtual Candy Studio estimates, project scope, care plans and third-party services.",
  alternates: { canonical: "/terms" },
};
export default function Terms() {
  return (
    <main id="main" className="legal-page">
      <Link href="/">← Back to the studio</Link>
      <h1>Service terms &amp; website information</h1>
      <p>Updated September 14, 2026</p>
      <h2>Estimates and starting prices</h2>
      <p>
        All listed prices are in US dollars. The estimate builder is a planning tool, not a binding
        quote, purchase or reservation. Starting prices depend on requirements. Scope, deliverables,
        revisions, timing and fees are confirmed in a written project agreement before work begins.
        Taxes and third-party charges are additional where applicable.
      </p>
      <h2>Projects and payment</h2>
      <p>
        The proposed project schedule is 50% to begin and 50% before launch, subject to the written
        agreement. This website does not take payments or enroll visitors in subscriptions.
        Preparing an inquiry does not create a contract. Cancellation, refunds, changes, ownership
        and licensing will be addressed in the project agreement; this page does not replace that
        agreement.
      </p>
      <h2>Ongoing care</h2>
      <p>
        Care is optional and starts at launch. Essential includes up to $10 per month of hosting
        usage. Monthly edit allowances do not roll over. Additional usage, new features, major
        upgrades and third-party subscriptions are separate. Billing frequency, authorization,
        cancellation and renewal terms must be agreed before recurring charges begin.
      </p>
      <h2>Content, accounts and results</h2>
      <p>
        Clients provide approved content and confirm they have the necessary rights to supplied
        materials. Project agreements identify transferred deliverables, studio components and
        third-party licenses. Domain and business accounts should remain in the client’s name.
        Search rankings, inclusion in AI-generated answers, traffic, sales and uninterrupted
        availability are not guaranteed.
      </p>
      <h2>Portfolio and external services</h2>
      <p>
        Client examples identify businesses in our client network. Their names and marks belong to
        their respective owners. Linked websites may change independently; inclusion is not an
        endorsement of every product, service or claim on those sites. External platforms have their
        own terms, fees and privacy practices.
      </p>
      <h2>Questions</h2>
      <p>
        Contact <a href="mailto:info@virtualcandy.com">info@virtualcandy.com</a> for an accurate
        scope or clarification. Nothing here limits rights that cannot be excluded under applicable
        law.
      </p>
      <nav aria-label="Policies">
        <Link href="/privacy">Privacy</Link>
        <Link href="/accessibility">Accessibility</Link>
      </nav>
    </main>
  );
}
