import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, CTAStrip } from "../components/site/Section";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — AYMO Digital | Frequently Asked Questions" },
      { name: "description", content: "Answers to the most common questions about AYMO Digital services, pricing, process and partnerships." },
      { property: "og:title", content: "AYMO Digital — FAQ" },
      { property: "og:description", content: "Everything you need to know about working with AYMO Digital." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsLD(),
        }),
      },
    ],
  }),
  component: FAQPage,
});

const groups = [
  {
    title: "General",
    items: [
      { q: "What does AYMO Digital do?", a: "We're a global digital growth agency offering AI automation, YouTube/TikTok growth, chatbots, branding, content and web development." },
      { q: "Where are you based?", a: "Headquartered in Islamabad with offices in Rawalpindi, Bahawalnagar and the UK (Tolworth, Wimbledon). We serve clients globally." },
      { q: "Are you partnered with anyone?", a: "Yes — AYMO Digital is partnered with AM Enterprises, a 5-year multi-service company operating across the UK, USA, Australia, UAE, Pakistan and more." },
    ],
  },
  {
    title: "Pricing & Plans",
    items: [
      { q: "Are your prices fixed?", a: "All prices shown are starting prices. Final cost depends on scope, complexity, integrations and timelines." },
      { q: "Do you offer yearly discounts?", a: "Yes — yearly plans save 20–25% versus monthly billing depending on the service." },
      { q: "Which currencies can I pay in?", a: "USD, GBP, AED, SAR and PKR. Prices update dynamically on the site." },
    ],
  },
  {
    title: "Process",
    items: [
      { q: "How fast can we start?", a: "Most engagements kick off within 5–7 business days of contract signing." },
      { q: "Do I get a dedicated team?", a: "Yes — every account has a dedicated lead and rotating specialists from our talent pool." },
      { q: "What's the typical engagement length?", a: "Month-to-month after a 90-day foundation period. Cancel anytime." },
    ],
  },
  {
    title: "Support",
    items: [
      { q: "How do I get help?", a: "Email info@aymo.digital or contact your dedicated lead via Slack / WhatsApp." },
      { q: "What are your support hours?", a: "Mon–Fri, 9am–9pm GMT. Priority clients get weekend cover." },
    ],
  },
];

function faqsLD() {
  return groups.flatMap((g) =>
    g.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  );
}

function FAQPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-16 sm:pt-20 pb-6 md:pt-28 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">FAQ</p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
          Frequently Asked <span className="text-gold-gradient">Questions</span>
        </h1>
        <p className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
          Everything you need to know about working with AYMO Digital.
        </p>
      </section>

      <Section>
        <div className="grid gap-10">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="text-xl font-semibold mb-4">{g.title}</h2>
              <div className="grid gap-3">
                {g.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="soft-card rounded-2xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm sm:text-base">{q}</span>
        <ChevronDown size={18} className={`shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</div>
      )}
    </div>
  );
}
