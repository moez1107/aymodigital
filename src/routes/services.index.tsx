import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section, CTAStrip } from "../components/site/Section";
import { services, CURRENCIES, formatPrice, type CurrencyCode } from "../lib/services-data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — AYMO Digital | AI, Content, Growth & Web" },
      { name: "description", content: "YouTube automation, AI workflows, chatbots, TikTok growth, branding and web development. Transparent pricing in USD, PKR, AED and SAR." },
      { property: "og:title", content: "AYMO Digital Services" },
      { property: "og:description", content: "Full-service digital growth — AI, content, design and development." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-16 sm:pt-20 pb-6 md:pt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Services & Pricing</p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          Subscription-Based <span className="text-gold-gradient">Digital Services</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground">
          Flexible monthly or yearly plans. Click any service for a full breakdown, workflow
          and deliverables. Final pricing depends on scope and customization.
        </p>

        {/* Toggles */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-border bg-white p-1">
            {(["monthly", "yearly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
                  plan === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
                {p === "yearly" && <span className="ml-1 text-[10px] opacity-80">save 20–25%</span>}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center rounded-full border border-border bg-white p-1">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  currency === c.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const amount = plan === "monthly" ? s.pricing.monthlyUSD : s.pricing.yearlyUSD;
            return (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group soft-card flex h-full flex-col rounded-3xl p-6 sm:p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,50,70,0.10)]"
              >
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-md`}>
                  <s.icon size={20} />
                </div>
                <h2 className="mt-5 text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.tagline}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">from</span>
                  <span className="text-2xl font-extrabold text-foreground">{formatPrice(amount, currency)}</span>
                  <span className="text-xs text-muted-foreground">/ {plan === "monthly" ? "mo" : "yr"}</span>
                </div>
                {plan === "yearly" && (
                  <div className="mt-1 text-[11px] font-semibold text-emerald-600">Save {s.pricing.savePercent}%</div>
                )}

                <ul className="mt-5 space-y-2">
                  {s.includes.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 size={14} className="mt-0.5 text-primary shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View full details <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          ⚠️ All prices shown are <strong>starting prices</strong>. Final cost depends on project
          complexity, features required, custom integrations and delivery timeline.
        </p>
      </Section>

      <CTAStrip />
    </>
  );
}
