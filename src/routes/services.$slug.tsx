import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { Section, CTAStrip } from "../components/site/Section";
import { getService, services, CURRENCIES, formatPrice, type CurrencyCode } from "../lib/services-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) {
      return {
        meta: [{ title: "Service — AYMO Digital" }],
        links: [],
      };
    }
    return {
      meta: [
        { title: `${s.title} — AYMO Digital` },
        { name: "description", content: s.description },
        { property: "og:title", content: `${s.title} — AYMO Digital` },
        { property: "og:description", content: s.description },
        { property: "og:url", content: `/services/${s.slug}` },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="container-px mx-auto max-w-2xl py-32 text-center">
      <h1 className="text-3xl font-bold">Service not found</h1>
      <Link to="/services" className="mt-4 inline-block text-primary">← Back to all services</Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const Icon = service.icon;
  const amount = plan === "monthly" ? service.pricing.monthlyUSD : service.pricing.yearlyUSD;
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-16 sm:pt-20 md:pt-28">
        <Link to="/services" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> All Services
        </Link>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="min-w-0">
            <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-md`}>
              <Icon size={24} />
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-primary">Service</p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {service.title}
            </h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">{service.tagline}</p>
            <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </div>

          {/* Pricing card */}
          <div className="soft-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Starting from</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Save {service.pricing.savePercent}% yearly
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground">{formatPrice(amount, currency)}</span>
              <span className="text-sm text-muted-foreground">/ {plan === "monthly" ? "month" : "year"}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-full border border-border bg-white p-1">
                {(["monthly", "yearly"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlan(p)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                      plan === p ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >{p}</button>
                ))}
              </div>
              <div className="inline-flex flex-wrap items-center rounded-full border border-border bg-white p-1">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition ${
                      currency === c.code ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >{c.code}</button>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-[oklch(0.68_0.13_210)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_oklch(0.68_0.13_210)] hover:brightness-110"
            >
              Get Started
            </Link>
            <p className="mt-3 text-[11px] text-muted-foreground text-center">Final price depends on scope & customization.</p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <Section eyebrow="What's Included" title={<>Everything In <span className="text-gold-gradient">The Plan</span></>}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.includes.map((i: string) => (
            <div key={i} className="flex items-start gap-2 rounded-2xl border border-border bg-white p-4 text-sm">
              <CheckCircle2 size={16} className="mt-0.5 text-primary shrink-0" />
              <span>{i}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Workflow */}
      <Section eyebrow="Our Workflow" title={<>How We <span className="text-gold-gradient">Deliver</span></>}>
        <div className="grid gap-4 md:grid-cols-2">
          {service.workflow.map((w: { step: string; detail: string }, idx: number) => (
            <div key={w.step} className="soft-card rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-sm font-bold text-primary">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="font-semibold">{w.step}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{w.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Deliverables */}
      <Section eyebrow="Deliverables" title={<>What You <span className="text-gold-gradient">Receive</span></>}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {service.deliverables.map((d: string) => (
            <li key={d} className="flex items-start gap-2 rounded-2xl bg-white border border-border p-4 text-sm">
              <Sparkles size={16} className="mt-0.5 text-primary shrink-0" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title={<>Common <span className="text-gold-gradient">Questions</span></>}>
        <div className="grid gap-3 md:grid-cols-2">
          {service.faq.map((f: { q: string; a: string }) => (
            <div key={f.q} className="soft-card rounded-2xl p-6">
              <h3 className="font-semibold text-sm sm:text-base">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Other services */}
      <Section eyebrow="Other Services" title={<>You Might <span className="text-gold-gradient">Also Need</span></>}>
        <div className="grid gap-4 sm:grid-cols-3">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group soft-card rounded-2xl p-5 transition hover:-translate-y-1"
            >
              <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white`}>
                <s.icon size={16} />
              </div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
