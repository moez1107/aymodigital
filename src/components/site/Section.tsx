import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`container-px mx-auto max-w-7xl py-16 md:py-24 ${className}`}>
      {(eyebrow || title || subtitle) && (
        <Reveal>
          <div className="mx-auto max-w-3xl text-center mb-12">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </Reveal>
      )}
      {children}
    </section>
  );
}

export function CTAStrip() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <Reveal direction="scale">
        <div className="relative overflow-hidden rounded-[36px] border border-primary/20 bg-gradient-to-br from-[oklch(0.96_0.025_205)] via-white to-[oklch(0.93_0.04_210)] p-10 md:p-16">
          <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/25 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[oklch(0.78_0.13_220/0.20)] blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
          <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Ready to <span className="text-gold-gradient">scale with AI?</span>
              </h3>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Book a free 30-minute strategy call. We'll map out the system, channels and
                automations that will move your business in the next 90 days.
              </p>
            </div>
            <div className="flex md:justify-end">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.65_0.14_220)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_-12px_oklch(0.65_0.14_220)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Book Free Strategy Call →
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
