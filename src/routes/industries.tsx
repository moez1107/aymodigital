import { createFileRoute } from "@tanstack/react-router";
import { Section, CTAStrip } from "../components/site/Section";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Who We Work With | AYMO Digital" },
      { name: "description", content: "Personal brand growth for SaaS founders, CEOs, coaches, consultants, real estate, doctors, lawyers and finance experts." },
      { property: "og:title", content: "Industries — AYMO Digital" },
      { property: "og:description", content: "Built for operators and experts." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

const industries = [
  { name: "SaaS Founders", desc: "Turn product insight into category leadership." },
  { name: "CEOs", desc: "Executive presence that compounds across investors and talent." },
  { name: "Real Estate Agents", desc: "Become the local market voice on YouTube and Shorts." },
  { name: "Coaches", desc: "Build a content moat that fills your programs." },
  { name: "Doctors", desc: "Educational authority that builds patient trust." },
  { name: "Lawyers", desc: "Niche expertise that wins inbound retainers." },
  { name: "Consultants", desc: "From cold outreach to inbound advisory deals." },
  { name: "Finance Experts", desc: "Credible content that earns AUM." },
  { name: "Agency Founders", desc: "Position above the pricing-war pack." },
];

function IndustriesPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-20 pb-10 md:pt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Industries</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          Who We <span className="text-gold-gradient">Work With</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Wherever expertise meets ambition — we build the authority engine around you.
        </p>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <div key={i.name} className="rounded-3xl border border-border/70 bg-card/60 p-7 transition hover:border-primary/40">
              <h3 className="text-lg font-semibold">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
