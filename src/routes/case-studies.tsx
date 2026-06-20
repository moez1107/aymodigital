import { createFileRoute } from "@tanstack/react-router";
import { Section, CTAStrip } from "../components/site/Section";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — AYMO Digital" },
      { name: "description", content: "Real authority results: LinkedIn growth, YouTube channels and inbound deal flow for founders and CEOs." },
      { property: "og:title", content: "AYMO Digital — Case Studies" },
      { property: "og:description", content: "Before → After → Strategy → Result." },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CasesPage,
});

const cases = [
  {
    client: "SaaS Founder · USA",
    headline: "From silent expert to LinkedIn category leader.",
    before: "Posting 1×/month with no traction. 1.2k followers.",
    after: "Daily posts averaging 60k impressions. 18k followers in 90 days.",
    strategy: "Authority pillars + narrative framework + comment engagement system.",
    result: "+300% LinkedIn growth · 22 inbound enterprise demos.",
  },
  {
    client: "Consultant · UK",
    headline: "Built a YouTube authority channel from zero.",
    before: "No video presence. Relied on cold outreach.",
    after: "0 → 50k subscribers in 6 months, $40k MRR from inbound.",
    strategy: "Topic-cluster strategy, premium editing, weekly long-form + 3 Shorts.",
    result: "Authority channel ranked top 3 in niche search.",
  },
  {
    client: "Agency Owner · UAE",
    headline: "Turned content into a deal pipeline.",
    before: "Posting sporadically. Zero attributable revenue.",
    after: "Consistent multi-platform cadence with full repurposing.",
    strategy: "1 pillar/week → 20 assets across LinkedIn, Shorts, podcast clips.",
    result: "37 inbound qualified deals in a single quarter.",
  },
];

function CasesPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-20 pb-10 md:pt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Case Studies</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl">
          Outcomes That <span className="text-gold-gradient">Compound</span>
        </h1>
      </section>

      <Section>
        <div className="space-y-8">
          {cases.map((c) => (
            <article key={c.client} className="glass rounded-3xl p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{c.client}</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold">{c.headline}</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-4">
                {[
                  { k: "Before", v: c.before },
                  { k: "After", v: c.after },
                  { k: "Strategy", v: c.strategy },
                  { k: "Result", v: c.result },
                ].map((b) => (
                  <div key={b.k}>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{b.k}</div>
                    <p className="mt-2 text-sm leading-relaxed">{b.v}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
