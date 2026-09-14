"use client";
import { useState } from "react";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
const extras = [
  {
    name: "Additional page",
    price: 200,
    note: "One page using your site’s design and supplied content.",
  },
  {
    name: "Original page copy",
    price: 150,
    note: "Up to 500 words from your brief, with one revision.",
  },
  {
    name: "Research & messaging",
    price: 250,
    note: "A focused positioning brief for one business.",
  },
  {
    name: "Additional contact form",
    price: 100,
    note: "Up to eight fields, delivered to one inbox.",
  },
  {
    name: "Appointment booking",
    price: 150,
    note: "Starting price. Connect one existing scheduling service.",
    quote: true,
  },
  {
    name: "Portfolio expansion",
    price: 150,
    note: "Up to 12 supplied entries in your existing layout.",
  },
  {
    name: "Blog or CMS",
    price: 400,
    note: "Starting price. A simple way to publish your own content.",
    quote: true,
  },
  {
    name: "CRM lead routing",
    price: 300,
    note: "Starting price. Connect one form to one existing system.",
    quote: true,
  },
];
const plans = [
  {
    name: "No care plan",
    price: 0,
    note: "Your hosting, your schedule. Help available separately.",
  },
  {
    name: "Essential",
    price: 59,
    note: "Hosting allowance, monitoring, form checks and routine maintenance.",
  },
  {
    name: "Care",
    price: 129,
    note: "Essential plus 30 minutes of content edits and a monthly review.",
  },
  {
    name: "Studio Support",
    price: 249,
    note: "Essential plus 90 minutes of edits and a short planning check-in.",
  },
];
const faqs = [
  [
    "What does the starting price include?",
    "A complete, mobile-friendly website using your existing branding and approved content, a contact form, basic search setup, domain connection and launch testing. Launch includes one page with up to six sections and one revision round. Business includes up to five standard pages and two revision rounds.",
  ],
  [
    "Do I need to have everything ready?",
    "You can start with a conversation. Before the build begins, we’ll agree on the scope and gather your logo, photos, business details and approved text. If you need help finding your message or writing the content, we can include that in your estimate.",
  ],
  [
    "Who owns the website?",
    "Your project agreement will specify the deliverables you receive after full payment, alongside any third-party licenses and reusable studio components. Keep your domain and business accounts in your name. We can handle hosting or prepare a handoff.",
  ],
  [
    "Is a monthly plan required?",
    "No. Choose ongoing care or manage your own hosting. Care begins at launch. Edit allowances are monthly and do not roll over; additional work is quoted before it begins. Third-party subscriptions and usage beyond the hosting allowance are separate.",
  ],
  [
    "Can I add payments or subscriptions?",
    "Yes. We can scope hosted checkout, project payments and recurring plans around the provider that fits your business. Processing fees and provider subscriptions are separate. Payment setup is individually quoted while we finalize our options.",
  ],
  [
    "What happens after I request an estimate?",
    "We review your goals, confirm what’s included and provide a written proposal. The estimate builder is a planning tool, not a purchase. Our proposed project schedule is 50% to begin and 50% before launch.",
  ],
  [
    "What if my idea doesn’t fit a package?",
    "That’s welcome here. Custom software, more involved automation and interactive experiences start with a requirements conversation. We’ll define a useful first step and quote it before development.",
  ],
];
export default function Home() {
  const [menu, setMenu] = useState(false),
    [pkg, setPkg] = useState("launch"),
    [selected, setSelected] = useState<number[]>([]),
    [care, setCare] = useState(0),
    [activeWork, setActiveWork] = useState<number | null>(null),
    [notice, setNotice] = useState("");
  const base = pkg === "launch" ? 750 : 1500,
    total = base + selected.reduce((s, i) => s + extras[i].price, 0),
    monthly = plans[care].price,
    estimated = selected.some((i) => extras[i].quote);
  const summary = `Virtual Candy Studio project brief\nPackage: ${pkg === "launch" ? "Launch" : "Business"}\nOptions: ${selected.map((i) => extras[i].name).join(", ") || "None"}\nProject ${estimated ? "starting estimate" : "estimate"}: ${money(total)}\nCare: ${plans[care].name} (${money(monthly)}/month)\nFirst year studio fees: ${money(total + monthly * 12)}\nExternal fees and taxes excluded. Scope subject to written confirmation.`;
  function downloadBrief(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text =
      summary +
      `\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nBusiness: ${data.get("business")}\nGoal: ${data.get("message")}\n`;
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value === "email") {
      window.location.href =
        "mailto:info@virtualcandy.com?subject=" +
        encodeURIComponent("Project inquiry — Virtual Candy Studio") +
        "&body=" +
        encodeURIComponent(text);
      setNotice(
        "Your email app will open with your brief. Review it and press Send there. If no email app opens, download the brief and email it to info@virtualcandy.com."
      );
      return;
    }
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "virtual-candy-project-brief.txt";
    a.click();
    URL.revokeObjectURL(url);
    setNotice(
      "Your brief has been downloaded. Email it to info@virtualcandy.com when you’re ready. Nothing has been sent automatically."
    );
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a href="#" className="brand" aria-label="Virtual Candy Studio home">
          <span className="mark">
            vc<span>✳</span>
          </span>
          <span>
            virtual candy<small>INDEPENDENT DIGITAL STUDIO</small>
          </span>
        </a>
        <button
          className="menu"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close" : "Menu"}
        </button>
        <nav id="navigation" className={menu ? "open" : ""} aria-label="Main navigation">
          {["Services", "Work", "Pricing", "About"].map((t) => (
            <a key={t} href={`#${t.toLowerCase()}`} onClick={() => setMenu(false)}>
              {t}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenu(false)}>
            Let’s make something <span>↗</span>
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">GOOD IDEAS DESERVE TO GET OUT THERE.</div>
            <h1>
              A little
              <br />
              unexpected.
              <br />
              <em>A lot of useful.</em>
            </h1>
            <div className="hero-bottom">
              <p>
                Distinctive websites. Clearer stories. Systems that save you time. Built for people
                making something of their own.
              </p>
              <a className="button lime" href="#pricing">
                Find your starting point <span>↗</span>
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" />
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="orbit" />
            <div className="art-label">
              IMAGINATION,
              <br />
              PUT TO WORK.
            </div>
            <div className="art-symbol">✳</div>
            <span className="art-index">VC / STUDIO NO. 01</span>
          </div>
          <div className="hero-foot">
            <span>INDEPENDENT SPIRIT. PRACTICAL THINKING.</span>
            <a href="#services">Explore the studio ↓</a>
          </div>
        </section>
        <div className="ticker" aria-label="Studio specialties">
          <span>MAKE AN IMPRESSION</span>
          <b>✳</b>
          <span>MAKE IT WORK</span>
          <b>✳</b>
          <span>MAKE IT YOURS</span>
          <b>✳</b>
          <span>VIRTUAL CANDY STUDIO</span>
        </div>
        <section id="services" className="section">
          <div className="section-heading">
            <span className="eyebrow">01 / WHAT WE DO</span>
            <h2>
              Small studio.
              <br />
              <span>Wide-open possibilities.</span>
            </h2>
            <p>
              Start with the thing your business needs most. We’ll connect the pieces as you grow.
            </p>
          </div>
          <div className="services">
            {[
              {
                n: "01",
                title: "Your presence.",
                text: "A website that feels like you and makes the next step obvious.",
                tags: "Websites · Landing pages · Portfolios",
              },
              {
                n: "02",
                title: "Your story.",
                text: "Turn what you know into something your customers understand.",
                tags: "Copy · Research · Brand materials",
              },
              {
                n: "03",
                title: "Your flow.",
                text: "Fewer loose ends. Connect inquiries, calendars and follow-up.",
                tags: "Forms · CRM · Practical automation",
              },
            ].map((s) => (
              <article key={s.n}>
                <span className="service-num">{s.n} /</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="service-tags">{s.tags}</div>
                <a href="#pricing">Explore options ↗</a>
              </article>
            ))}
          </div>
        </section>
        <section id="work" className="section work">
          <div className="section-heading">
            <span className="eyebrow">02 / THE POSSIBILITIES</span>
            <h2>
              Different ideas.
              <br />
              <span>The same curiosity.</span>
            </h2>
            <p>
              A look at the kinds of work we build—and the original world that gave the studio its
              name.
            </p>
          </div>
          <div className="work-grid">
            <article className="work-card">
              <div className="work-visual profile">
                <span>STUDIO STUDY / 01</span>
                <div className="sample-title">
                  A name.
                  <br />A point of view.
                  <br />
                  <i>A place to begin.</i>
                </div>
                <span>PROFESSIONAL PRESENCE</span>
              </div>
              <div className="work-caption">
                <div>
                  <small>ILLUSTRATIVE DIRECTION</small>
                  <h3>A home for your expertise</h3>
                </div>
                <button
                  aria-expanded={activeWork === 0}
                  onClick={() => setActiveWork(activeWork === 0 ? null : 0)}
                  aria-label="Read about professional websites"
                >
                  {activeWork === 0 ? "−" : "+"}
                </button>
              </div>
              {activeWork === 0 && (
                <p className="work-detail">
                  Professional profiles and service sites give people a clear introduction, useful
                  information and a way to reach you. This is a studio concept, not a claimed client
                  result.
                </p>
              )}
            </article>
            <article className="work-card">
              <div className="work-visual systems">
                <span>STUDIO STUDY / 02</span>
                <div className="flow">
                  <div>
                    New inquiry <b>↘</b>
                  </div>
                  <div>
                    Right place <b>↘</b>
                  </div>
                  <div>
                    Next step <b>✓</b>
                  </div>
                </div>
                <span>CONNECTED BUSINESS SYSTEMS</span>
              </div>
              <div className="work-caption">
                <div>
                  <small>ILLUSTRATIVE WORKFLOW</small>
                  <h3>Give every lead a next step</h3>
                </div>
                <button
                  aria-expanded={activeWork === 1}
                  onClick={() => setActiveWork(activeWork === 1 ? null : 1)}
                  aria-label="Read about business automation"
                >
                  {activeWork === 1 ? "−" : "+"}
                </button>
              </div>
              {activeWork === 1 && (
                <p className="work-detail">
                  A form can begin a useful workflow: map the fields, route the inquiry, and make
                  follow-up visible. Every integration is scoped around the tools your business
                  actually uses.
                </p>
              )}
            </article>
          </div>
          <a
            className="candyverse"
            href="https://69165cdab57dc2c842d66ae3--melodious-squirrel-f66679.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <small>FROM THE ARCHIVE / ORIGINAL CONCEPT</small>
              <h3>Before the studio, there was a Candyverse.</h3>
              <p>An interactive world of flavor, imagination and a name with a little history.</p>
            </div>
            <span>Explore the original ↗</span>
          </a>
        </section>
        <section id="pricing" className="section pricing">
          <div className="section-heading">
            <span className="eyebrow">03 / BUILD YOUR STARTING POINT</span>
            <h2>
              Big possibilities.
              <br />
              <span>Approachable beginnings.</span>
            </h2>
            <p>
              A complete website first. Thoughtful extras when you need them. Clear project and
              monthly costs.
            </p>
          </div>
          <div className="estimator">
            <div className="choices">
              <fieldset>
                <legend>
                  01 <span>Choose your foundation</span>
                </legend>
                <div className="packages">
                  {[
                    {
                      id: "launch",
                      name: "Launch",
                      price: 750,
                      description: "One focused page. One strong introduction.",
                      features: "Up to 6 sections · Contact form · 1 revision round",
                    },
                    {
                      id: "business",
                      name: "Business",
                      price: 1500,
                      description: "Room to tell the whole story.",
                      features: "Up to 5 pages · Contact form · 2 revision rounds",
                    },
                  ].map((p) => (
                    <label key={p.id} className={`package ${pkg === p.id ? "chosen" : ""}`}>
                      <input
                        type="radio"
                        name="package"
                        checked={pkg === p.id}
                        onChange={() => setPkg(p.id)}
                      />
                      <span className="package-name">{p.name}</span>
                      <strong>{money(p.price)}</strong>
                      <small>ONE-TIME PROJECT</small>
                      <p>{p.description}</p>
                      <span className="package-features">{p.features}</span>
                    </label>
                  ))}
                </div>
                <p className="included">
                  Always included: mobile-friendly design, basic search setup, accessibility checks,
                  domain connection and launch testing. You provide approved content and existing
                  branding.
                </p>
              </fieldset>
              <fieldset>
                <legend>
                  02 <span>Add what moves you forward</span>
                </legend>
                <div className="extras">
                  {extras.map((x, i) => (
                    <label key={x.name} className={selected.includes(i) ? "selected" : ""}>
                      <input
                        type="checkbox"
                        checked={selected.includes(i)}
                        onChange={() =>
                          setSelected(
                            selected.includes(i)
                              ? selected.filter((n) => n !== i)
                              : [...selected, i]
                          )
                        }
                      />
                      <span>
                        <b>{x.name}</b>
                        <small>{x.note}</small>
                      </span>
                      <strong>
                        {x.quote ? "from " : ""}
                        {money(x.price)}
                      </strong>
                    </label>
                  ))}
                </div>
                <p className="included">
                  Need multiple pages, payments, a custom tool or something else? Tell us in your
                  brief. We’ll scope it with you. Third-party fees are separate.
                </p>
              </fieldset>
              <fieldset>
                <legend>
                  03 <span>Choose your ongoing support</span>
                </legend>
                <div className="care-options">
                  {plans.map((p, i) => (
                    <label key={p.name} className={care === i ? "selected" : ""}>
                      <input
                        type="radio"
                        name="care"
                        checked={care === i}
                        onChange={() => setCare(i)}
                      />
                      <span>
                        <b>{p.name}</b>
                        <small>{p.note}</small>
                      </span>
                      <strong>
                        {money(p.price)}
                        <small>/mo</small>
                      </strong>
                    </label>
                  ))}
                </div>
                <p className="included">
                  Care is optional and starts at launch. Essential includes up to $10/month of
                  hosting usage. Monthly edit time doesn’t roll over. Major upgrades and new
                  features are quoted separately.
                </p>
              </fieldset>
            </div>
            <aside className="estimate" aria-label="Your estimate">
              <span className="eyebrow">YOUR NEXT CHAPTER</span>
              <h3>
                Make it
                <br />
                your own.
              </h3>
              <div aria-live="polite" aria-atomic="true">
                <div className="estimate-line">
                  <span>Project {estimated ? "from" : "estimate"}</span>
                  <strong>{money(total)}</strong>
                </div>
                <div className="estimate-line">
                  <span>Ongoing care</span>
                  <strong>
                    {money(monthly)}
                    <small>/mo</small>
                  </strong>
                </div>
                <div className="first-year">
                  <span>Project + 12 months of care</span>
                  <b>
                    {estimated ? "From " : ""}
                    {money(total + 12 * monthly)}
                  </b>
                </div>
              </div>
              <p>
                {estimated
                  ? "Includes starting-price items. Final scope and cost require review."
                  : "A planning estimate, confirmed in a written proposal before work begins."}{" "}
                External services and applicable taxes are extra.
              </p>
              <a className="button dark" href="#contact">
                Let’s talk about it ↗
              </a>
              <button
                className="reset"
                onClick={() => {
                  setPkg("launch");
                  setSelected([]);
                  setCare(0);
                }}
              >
                Reset selections
              </button>
              <span className="estimate-note">
                No checkout. No commitment.
                <br />
                Just a useful place to start.
              </span>
            </aside>
          </div>
        </section>
        <section id="about" className="section about">
          <div>
            <span className="eyebrow">04 / THE STUDIO</span>
            <h2>
              Built on curiosity.
              <br />
              <em>Growing by connection.</em>
            </h2>
          </div>
          <div>
            <p className="big-copy">
              The best projects often start with someone saying, “I know a person.”
            </p>
            <p>
              Virtual Candy Studio brings together the websites, creative work and practical systems
              that have grown through those conversations. An independent studio with a personal
              approach: understand the business, find the useful idea, and build it with care.
            </p>
            <p>
              The name carries family history and a spirit of imagination. We’re keeping both—and
              putting them to work.
            </p>
          </div>
        </section>
        <section className="section faq" id="faq">
          <div>
            <span className="eyebrow">05 / A FEW GOOD QUESTIONS</span>
            <h2>
              Let’s clear
              <br />
              <span>things up.</span>
            </h2>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="section contact">
          <div>
            <span className="eyebrow">06 / YOUR TURN</span>
            <h2>
              What are
              <br />
              you <em>making?</em>
            </h2>
            <p>
              A new beginning, a better website, a process that could be simpler. Tell us what’s on
              your mind.
            </p>
            <span className="preview-note">
              LET’S START A CONVERSATION
              <br />
              <a href="mailto:info@virtualcandy.com">info@virtualcandy.com ↗</a>
            </span>
          </div>
          <form onSubmit={downloadBrief}>
            <div className="form-row">
              <label>
                Your name
                <input name="name" autoComplete="name" required maxLength={100} />
              </label>
              <label>
                Email address
                <input type="email" name="email" autoComplete="email" required maxLength={200} />
              </label>
            </div>
            <label>
              Business or project
              <input name="business" autoComplete="organization" maxLength={200} />
            </label>
            <label>
              What would you like to make happen?
              <textarea name="message" rows={4} required maxLength={4000} />
            </label>
            <div className="brief-summary">
              Your selection: {pkg === "launch" ? "Launch" : "Business"} ·{" "}
              {estimated ? "from " : ""}
              {money(total)} + {money(monthly)}/month <a href="#pricing">Edit</a>
            </div>
            <p className="privacy">
              Your details stay in this page until you open an email draft or download your brief.
              Nothing is sent automatically. No payment information is collected.
            </p>
            <button type="submit" name="action" value="email" className="button lime">
              Prepare my inquiry email ↗
            </button>
            <button type="submit" name="action" value="download" className="download-brief">
              Download brief instead ↓
            </button>
            <p role="status">{notice}</p>
          </form>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          <span className="mark">
            vc<span>✳</span>
          </span>
          <span>
            virtual candy<small>STUDIO</small>
          </span>
        </a>
        <p>Good ideas. Made useful.</p>
        <div>
          <a href="#faq">FAQs</a>
          <span>© {new Date().getFullYear()} Virtual Candy Studio</span>
        </div>
      </footer>
    </>
  );
}
