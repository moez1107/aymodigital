import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Section, CTAStrip } from "../components/site/Section";
import { services, CURRENCIES, formatPrice, type CurrencyCode } from "../lib/services-data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — AYMO Digital | Transparent Subscription Plans" },
      { name: "description", content: "Transparent monthly and yearly subscription pricing for AYMO Digital services. Switch currency to USD, PKR, AED, SAR or GBP." },
      { property: "og:title", content: "AYMO Digital Pricing" },
      { property: "og:description", content: "Flexible subscription plans across all services. Cancel anytime." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const faqs = [
  { q: "Are prices fixed?", a: "All prices are starting prices. Final cost depends on scope, integrations and timeline." },
  { q: "What's the difference between monthly and yearly?", a: "Yearly plans save 20–25% versus paying month-to-month." },
  { q: "Can I switch currency?", a: "Yes — use the currency switcher to view prices in USD, PKR, AED, SAR or GBP." },
  { q: "Do I need a long-term contract?", a: "No — month-to-month after a 90-day foundation period." },
];

function PricingPage() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-16 sm:pt-20 md:pt-28 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Pricing</p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
          Transparent <span className="text-gold-gradient">Subscription Pricing</span>
        </h1>
        <p className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
          Flexible monthly or yearly plans. Switch currencies to see prices in USD, PKR, AED, SAR or GBP.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center rounded-full border border-border bg-white p-1">
            {(["monthly", "yearly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
                  plan === p ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {p}{p === "yearly" && <span className="ml-1 text-[10px] opacity-80">save 20–25%</span>}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center rounded-full border border-border bg-white p-1">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  currency === c.code ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >{c.code}</button>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const amount = plan === "monthly" ? s.pricing.monthlyUSD : s.pricing.yearlyUSD;
            return (
              <div key={s.slug} className="soft-card rounded-3xl p-6 sm:p-7 flex flex-col">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-md`}>
                  <s.icon size={20} />
                </div>
                <h2 className="mt-5 text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{s.tagline}</p>

                <div className="mt-5 flex items-baseline gap-1 flex-wrap">
                  <span className="text-xs text-muted-foreground">from</span>
                  <span className="text-3xl font-extrabold">{formatPrice(amount, currency)}</span>
                  <span className="text-sm text-muted-foreground">/ {plan === "monthly" ? "mo" : "yr"}</span>
                </div>
                {plan === "yearly" && (
                  <div className="mt-1 text-[11px] font-semibold text-emerald-600">Save {s.pricing.savePercent}%</div>
                )}

                <ul className="mt-5 space-y-2 text-sm">
                  {s.includes.slice(0, 4).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 size={14} className="mt-0.5 text-primary shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-2.5 text-xs font-semibold hover:border-primary/40"
                  >Full details</Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:brightness-110"
                  >Get started</Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          ⚠️ All prices shown are <strong>starting prices</strong>. Final cost depends on project
          complexity, features, custom integrations and delivery time.
        </p>
      </Section>

      <Section eyebrow="Subscription Benefits" title={<>Monthly vs <span className="text-gold-gradient">Yearly</span></>}>
        <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="soft-card rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Monthly Plan</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />Flexible payments</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />Ongoing support</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />Ideal for startups</li>
            </ul>
          </div>
          <div className="soft-card rounded-3xl p-6 sm:p-8 border-primary/40 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="text-lg font-semibold">Yearly Plan <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Save 20–25%</span></h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />Discounted pricing</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />Priority support</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />Free minor updates included</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="FAQ" title={<>Pricing <span className="text-gold-gradient">Questions</span></>}>
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          {faqs.map((f) => (
            <div key={f.q} className="soft-card rounded-2xl p-6">
              <h3 className="font-semibold text-sm sm:text-base">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
