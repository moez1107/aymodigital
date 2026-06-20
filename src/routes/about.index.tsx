import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, CTAStrip } from "../components/site/Section";
import { Globe2, Building2, Award, Handshake } from "lucide-react";
import aboutBg from "../assets/about-bg.jpg";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About — AYMO Digital | Global Growth Agency" },
      { name: "description", content: "AYMO Digital helps founders and businesses scale through AI, content and performance marketing. Proudly partnered with AM Enterprises." },
      { property: "og:title", content: "About AYMO Digital" },
      { property: "og:description", content: "A global digital growth agency partnered with AM Enterprises." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const partnerRegions = ["United Kingdom", "United States", "Australia", "California", "Texas", "Florida", "UAE", "Pakistan", "China"];
const partnerServices = ["Digital Marketing", "AI Automation", "Business Growth Solutions", "Branding & Development"];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <img src={aboutBg} alt="" width={1280} height={800} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="container-px mx-auto max-w-5xl relative py-20 sm:py-24 md:py-36 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">About</p>
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
            We Build <span className="text-gold-gradient">Global Brands</span>,<br className="hidden sm:block" /> Not Just Websites.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-muted-foreground text-base md:text-lg">
            AYMO Digital is a full-service digital growth agency helping ambitious founders
            scale through AI, content and performance marketing — across USA, UK, UAE and beyond.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Link to="/about/team" className="rounded-full border border-border bg-white/80 px-4 py-2 text-xs font-semibold hover:border-primary/40">Meet the Team</Link>
            <Link to="/careers" className="rounded-full border border-border bg-white/80 px-4 py-2 text-xs font-semibold hover:border-primary/40">Careers</Link>
          </div>
        </div>
      </section>

      <Section eyebrow="Mission" title={<>Turn expertise into <span className="text-gold-gradient">global influence</span>.</>}>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
          Most experts hide behind their work. We give them a stage, a story, and a system —
          so the right clients, partners, and opportunities find them anywhere in the world.
        </p>
      </Section>

      <Section eyebrow="Vision" title={<>Help <span className="text-gold-gradient">10,000 founders</span> become industry authorities.</>}>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
          A world where credibility is engineered, not gambled. Where the smartest operators
          are also the most visible — supported by the right team, on every channel that matters.
        </p>
      </Section>

      <Section eyebrow="Our Story" title={<>From Frustration To <span className="text-gold-gradient">Framework</span></>}>
        <div className="grid gap-8 lg:grid-cols-2">
          <p className="text-muted-foreground leading-relaxed">
            AYMO began with a simple observation: brilliant founders were losing to louder
            competitors. Not because their work was weaker — but because no one knew about it.
            We started AYMO to fix that gap with a repeatable system: positioning, production,
            and distribution under one roof.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we partner with founders and CEOs across the USA, UK, Canada, UAE and Saudi
            Arabia — running their content engines, AI automations and growth campaigns so they
            can stay focused on building while their authority compounds in the background.
          </p>
        </div>
      </Section>

      {/* AM Enterprises Partnership */}
      <Section
        eyebrow="Strategic Partnership"
        title={<>Proudly Partnered With <span className="text-gold-gradient">AM Enterprises</span></>}
        subtitle="A 5-year, multi-country digital and business solutions company that strengthens every project we deliver."
      >
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="soft-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Handshake size={22} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold truncate">AM Enterprises</h3>
                <p className="text-sm text-muted-foreground">Multi-service digital & business solutions • Est. 5+ years</p>
              </div>
            </div>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              AM Enterprises has been actively operating for over 5 years, delivering digital
              marketing, AI automation, business growth solutions and branding services to
              clients across multiple continents. Our partnership lets AYMO Digital deliver
              with global reach, deeper expertise and the kind of trust large brands require.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Operating In</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {partnerRegions.map((r) => (
                    <span key={r} className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-foreground/80">{r}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Specializations</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {partnerServices.map((s) => (
                    <li key={s} className="flex items-center gap-2"><Award size={14} className="text-primary shrink-0" />{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="soft-card rounded-3xl p-6 text-center">
              <Globe2 size={28} className="mx-auto text-primary" />
              <div className="mt-3 text-3xl font-extrabold text-gold-gradient">9+</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Countries Served</div>
            </div>
            <div className="soft-card rounded-3xl p-6 text-center">
              <Building2 size={28} className="mx-auto text-primary" />
              <div className="mt-3 text-3xl font-extrabold text-gold-gradient">5+</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Years of Operation</div>
            </div>
            <div className="soft-card rounded-3xl p-6 text-center">
              <Award size={28} className="mx-auto text-primary" />
              <div className="mt-3 text-3xl font-extrabold text-gold-gradient">4</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Service Pillars</div>
            </div>
          </div>
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
