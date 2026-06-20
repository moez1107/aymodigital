import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  TrendingUp,
  Youtube,
  Music2,
  Instagram,
  Facebook,
  Linkedin,
  Sparkles,
  Star,
  Users,
  Rocket,
  Target,
  BarChart3,
  Zap,
  Globe,
  ShieldCheck,
  Brain,
  CheckCircle2,
  Quote,
  PlayCircle,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Crown,
  Linkedin as LinkedinIcon,
} from "lucide-react";
import { whatsappLink, PHONE_INTL_DISPLAY } from "@/lib/contact-info";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Section, CTAStrip } from "../components/site/Section";
import { Reveal, CountUp } from "../components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AYMO Digital — AI, Automation & Growth Agency for Modern Businesses" },
      {
        name: "description",
        content:
          "We help businesses grow faster through AI automation, content systems and performance marketing. Trusted by founders across USA, UK, UAE & Saudi Arabia.",
      },
      { property: "og:title", content: "AYMO Digital — AI, Automation & Growth Agency" },
      { property: "og:description", content: "Scale your business with AI automation, content and digital growth — done for you." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Stats />
      <Services />
      <Process />
      <Results />
      <TestimonialsMarquee />
      <TeamHierarchy />
      <Authority />
      <Pricing />
      <CTAStrip />
    </>
  );
}

/* ------------------------------ HERO ------------------------------ */

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setMouse({ x, y });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const px = (mult: number) =>
    `translate3d(${(mouse.x * mult).toFixed(2)}px, ${(mouse.y * mult).toFixed(2)}px, 0)`;

  return (
    <section className="container-px mx-auto max-w-7xl pt-8 md:pt-12">
      <div
        ref={heroRef}
        className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[oklch(0.97_0.015_205)] via-white to-[oklch(0.95_0.02_215)] px-6 py-16 md:px-12 md:py-24 lg:py-28"
      >
        {/* Soft single-tone wash — clean and minimal */}
        <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-[oklch(0.85_0.08_220/0.12)] blur-3xl" />


        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* LEFT */}
          <div>
            <Reveal direction="up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                AI · Automation · Growth
              </div>
            </Reveal>

            <Reveal direction="up" delay={80}>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground">
                Scale Your Business with{" "}
                <span className="text-gold-gradient">AI Automation,</span>{" "}
                Content & Digital Growth
              </h1>
            </Reveal>

            <Reveal direction="up" delay={160}>
              <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                We build automated systems that generate leads, sales and revenue — combining
                AI workflows, performance marketing and authority content across YouTube,
                LinkedIn and Short-Form.
              </p>
            </Reveal>

            <Reveal direction="up" delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.65_0.14_220)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_-12px_oklch(0.65_0.14_220)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  Book Free Strategy Call
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_40px_-12px_rgba(16,185,129,0.55)] transition hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  <MessageCircle size={16} />
                  WhatsApp Us
                </a>
                <a
                  href="tel:+923256900925"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white/70 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition hover:border-primary/50 hover:bg-white"
                >
                  <PlayCircle size={16} className="text-primary" />
                  Call {PHONE_INTL_DISPLAY}
                </a>
              </div>
            </Reveal>

            <Reveal direction="up" delay={320}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex -space-x-2">
                  {["#a7e9ec", "#79d4dc", "#5eb9d6", "#3c8fb8"].map((c, i) => (
                    <span key={i} className="h-9 w-9 rounded-full border-2 border-white shadow" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-sm font-semibold text-foreground">4.9/5</span>
                  <span className="text-xs text-muted-foreground">from 120+ founders</span>
                </div>
              </div>
            </Reveal>
          </div>



          {/* RIGHT — floating overlay cards */}
          <div className="relative hidden lg:block min-h-[500px]">
            {/* Floating Card: Revenue */}
            <div
              className="glass absolute right-8 top-2 w-56 rounded-2xl p-4 animate-float"
              style={{ transform: px(18) }}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-muted-foreground">Monthly Revenue</div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">+218%</span>
              </div>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-2xl font-bold text-foreground">$84.2k</span>
                <TrendingUp size={16} className="mb-1 text-emerald-500" />
              </div>
              <div className="mt-3 flex items-end gap-1 h-10">
                {[40, 55, 35, 70, 60, 85, 95].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-primary"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Card: AI Automation */}
            <div
              className="glass absolute -right-2 top-48 w-60 rounded-2xl p-4 animate-float"
              style={{ animationDelay: "1.2s", transform: px(22) }}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.65_0.14_220)] text-white">
                  <Bot size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">AI Automation</div>
                  <div className="text-[11px] text-muted-foreground">12 workflows active</div>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]" />
              </div>
              <div className="mt-3 rounded-xl bg-white/60 p-2.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Leads captured today</span>
                  <span className="font-semibold text-foreground">147</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-primary/15">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-[oklch(0.65_0.14_220)] animate-bar" />
                </div>
              </div>
            </div>

            {/* Floating Card: YouTube */}
            <div
              className="glass absolute left-2 bottom-8 w-52 rounded-2xl p-4 animate-float"
              style={{ animationDelay: "2.4s", transform: px(16) }}
            >
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-red-50 text-red-500">
                  <Youtube size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">YouTube growth</div>
                  <div className="text-sm font-bold">+412% / 90d</div>
                </div>
              </div>
            </div>

            {/* Floating Card: Client Satisfaction */}
            <div
              className="glass absolute right-12 bottom-2 w-60 rounded-2xl p-3.5 animate-float"
              style={{ animationDelay: "1.8s", transform: px(14) }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary" />
                  <span className="text-xs font-medium text-foreground">Client Satisfaction</span>
                </div>
                <span className="text-sm font-bold text-foreground">98%</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-auto text-[10px] text-muted-foreground">120+ reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking-widget style metric strip */}
        <Reveal direction="up" delay={400}>
          <div className="relative mt-12 rounded-[28px] bg-white/95 p-3 shadow-[0_20px_60px_-20px_rgba(15,50,70,0.20)] backdrop-blur">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-4">
              {[
                { label: "Service", value: "AI Automation", icon: Bot },
                { label: "Industry", value: "Any Business", icon: Globe },
                { label: "Timeline", value: "30 / 60 / 90 days", icon: Zap },
                { label: "", value: "Get Started →", cta: true },
              ].map((f, i) => (
                <div key={i} className={`bg-white p-4 ${f.cta ? "" : ""}`}>
                  {f.cta ? (
                    <Link
                      to="/contact"
                      className="flex h-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-[oklch(0.65_0.14_220)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                      {f.value}
                    </Link>
                  ) : (
                    <>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</div>
                      <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                        {f.icon && <f.icon size={14} className="text-primary" />}
                        {f.value}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- TRUSTED BY --------------------------- */

function TrustedBy() {
  const regions = ["🇺🇸 USA", "🇬🇧 UK", "🇦🇪 UAE", "🇸🇦 Saudi Arabia", "🇨🇦 Canada", "🇦🇺 Australia"];
  return (
    <section className="container-px mx-auto max-w-7xl pt-16">
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by founders & growing brands worldwide
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {regions.map((r) => (
            <span
              key={r}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground/80 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground sm:px-5 sm:py-2.5"
            >
              {r}
            </span>
          ))}
        </div>
        <div className="mt-8 mx-auto max-w-2xl rounded-full border border-primary/30 bg-white/80 px-4 py-2.5 text-center text-xs sm:text-sm font-medium text-foreground/80 backdrop-blur">
          🤝 Officially partnered with <span className="font-bold text-primary">AM Enterprises</span> — operating across UK, USA, UAE, Australia & 5+ more countries.
        </div>
      </Reveal>
    </section>
  );
}


/* ----------------------------- STATS ------------------------------ */

function Stats() {
  const stats = [
    { to: 320, suffix: "+", label: "Projects Completed" },
    { to: 95, suffix: "+", label: "Channels Managed" },
    { to: 150, suffix: "+", label: "Clients Served" },
    { to: 48000, suffix: "+", label: "Leads Generated" },
    { to: 12, prefix: "$", suffix: "M+", label: "Revenue Generated" },
  ];
  return (
    <Section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="soft-card rounded-3xl p-6 text-center transition hover:-translate-y-1">
              <div className="text-4xl font-extrabold text-gold-gradient">
                <CountUp to={s.to} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------- SERVICES ---------------------------- */

function Services() {
  const items = [
    { icon: Bot, title: "AI Automation", text: "Custom AI agents, GPT workflows and CRM automations that work 24/7." },
    { icon: BarChart3, title: "Performance Marketing", text: "Meta, Google & TikTok ads engineered for scalable ROAS." },
    { icon: Youtube, title: "YouTube Growth", text: "Full channel management — strategy, editing, SEO and uploads." },
    { icon: Linkedin, title: "LinkedIn Authority", text: "Founder content + lead-gen frameworks that compound trust." },
    { icon: Sparkles, title: "Short-Form Engine", text: "Reels, Shorts & TikTok scaling system that fuels every channel." },
    { icon: Brain, title: "Strategy & Branding", text: "Positioning and content systems that make you the obvious choice." },
  ];
  return (
    <Section
      eyebrow="Our Services"
      title={<>Everything you need to <span className="text-gold-gradient">grow online</span></>}
      subtitle="One integrated team for AI, content and paid growth — engineered around your business."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 80} direction={i % 2 ? "right" : "left"}>
            <Link
              to="/services"
              className="group soft-card flex h-full flex-col rounded-3xl p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,50,70,0.10)]"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                <Icon size={24} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------- PROCESS ----------------------------- */

function Process() {
  const steps = [
    { step: "01", icon: Target, title: "Discovery & Strategy", text: "We audit your business, ICP and goals, then design the system." },
    { step: "02", icon: Sparkles, title: "Build & Automate", text: "Funnels, AI workflows and content engines are built and tested." },
    { step: "03", icon: Rocket, title: "Launch & Optimize", text: "We launch campaigns and iterate weekly using analytics." },
    { step: "04", icon: TrendingUp, title: "Scale & Compound", text: "Profitable channels are scaled and new ones are layered in." },
  ];
  return (
    <Section
      eyebrow="Process"
      title={<>A clear path to <span className="text-gold-gradient">predictable growth</span></>}
      subtitle="No daily babysitting. A calm system that turns marketing into a real engine."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.step} delay={i * 100}>
            <div className="relative soft-card h-full rounded-3xl p-7">
              <div className="absolute top-5 right-5 text-5xl font-extrabold text-primary/10">{s.step}</div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.65_0.14_220)] text-white shadow-lg">
                <s.icon size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------- RESULTS ----------------------------- */

function Results() {
  const metrics = [
    { label: "Revenue Increase", value: 218, suffix: "%", color: "from-emerald-400 to-teal-500" },
    { label: "More Qualified Leads", value: 312, suffix: "%", color: "from-primary to-[oklch(0.65_0.14_220)]" },
    { label: "Conversion Rate Lift", value: 84, suffix: "%", color: "from-sky-400 to-indigo-500" },
    { label: "Content Views Growth", value: 460, suffix: "%", color: "from-fuchsia-400 to-pink-500" },
  ];
  return (
    <Section
      eyebrow="Real Results"
      title={<>Numbers our clients <span className="text-gold-gradient">actually see</span></>}
      subtitle="A snapshot of average performance lifts within the first 90–180 days."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-5 sm:grid-cols-2">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 100}>
              <div className="soft-card rounded-3xl p-6">
                <div className="text-3xl font-extrabold text-foreground">
                  <CountUp to={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-1.5 text-sm text-muted-foreground">{m.label}</div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full rounded-full bg-gradient-to-r ${m.color} animate-bar`} style={{ width: `${Math.min(100, m.value / 5)}%` }} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="right">
          <div className="soft-card rounded-3xl p-7 h-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Pipeline Overview</div>
                <div className="mt-1 text-xl font-semibold">Last 30 days</div>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">+38.2%</span>
            </div>
            <div className="mt-6 flex h-48 items-end gap-2">
              {[35, 50, 42, 60, 55, 72, 65, 80, 75, 88, 92, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary/30 to-primary transition-all"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {[
                { l: "Visitors", v: "184K" },
                { l: "Leads", v: "4.2K" },
                { l: "Deals", v: "312" },
              ].map((x) => (
                <div key={x.l} className="rounded-2xl bg-secondary p-3">
                  <div className="text-lg font-bold">{x.v}</div>
                  <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* -------------------- TESTIMONIALS — INFINITE MARQUEE -------------------- */

const TESTIMONIALS = [
  { quote: "Within 4 months we 3x'd inbound demos and finally stopped relying on cold outreach. The AI workflows are insane.", name: "Sarah K.", role: "Founder · B2B SaaS", country: "🇬🇧 UK" },
  { quote: "Our YouTube went from 800 to 52,000 subs and is now our #1 acquisition channel. AYMO is part of our team.", name: "Ahmed R.", role: "CEO · Consulting", country: "🇦🇪 UAE" },
  { quote: "Conversion rate on landing pages went from 1.4% to 4.8%. They moved fast and treated our business like their own.", name: "Daniel M.", role: "Founder · E-commerce", country: "🇺🇸 USA" },
  { quote: "Pipeline grew 312% in 6 months. The AI lead-gen agent alone replaced 2 SDR hires.", name: "Fatima A.", role: "COO · Fintech", country: "🇸🇦 KSA" },
  { quote: "Their LinkedIn system turned our CEO into a category authority. Inbound from C-suite is now routine.", name: "James O.", role: "CMO · Enterprise SaaS", country: "🇺🇸 USA" },
  { quote: "Shorts strategy alone drove 18M views in 90 days. Plug-and-play growth machine.", name: "Priya N.", role: "Creator · Coaching", country: "🇨🇦 CA" },
  { quote: "From idea to launch in 3 weeks. The team is sharp, accountable and obsessed with outcomes.", name: "Liam T.", role: "Founder · D2C", country: "🇦🇺 AU" },
  { quote: "Best ROI on any marketing partner we've worked with. Their automation freed up 30 hrs/week.", name: "Noor H.", role: "Founder · Agency", country: "🇦🇪 UAE" },
];

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="soft-card mx-3 flex h-full w-[300px] shrink-0 flex-col rounded-3xl p-6 sm:w-[360px] sm:p-7">
      <Quote size={26} className="text-primary/40" />
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.65_0.14_220)] text-sm font-bold text-white">
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{t.name}</div>
          <div className="truncate text-xs text-muted-foreground">{t.role} · {t.country}</div>
        </div>
        <div className="flex shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsMarquee() {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <Section
      eyebrow="Social Proof"
      title={<>Founders & operators <span className="text-gold-gradient">love working with us</span></>}
      subtitle="What our clients across the world are saying."
    >
      <div
        className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
        <div
          className="flex w-max animate-marquee py-2"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {items.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground">⭐ 4.9/5 from 120+ founders · drag or use arrows</div>
        <div className="flex gap-2">
          <button onClick={() => scrollBy(-1)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-foreground transition hover:border-primary/50 hover:bg-primary hover:text-white">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scrollBy(1)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-foreground transition hover:border-primary/50 hover:bg-primary hover:text-white">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((t, i) => (
          <div key={`carousel-${i}`} className="snap-start">
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { Icon: Youtube, label: "YouTube", color: "text-red-500", bg: "bg-red-50" },
          { Icon: Music2, label: "TikTok", color: "text-foreground", bg: "bg-slate-100" },
          { Icon: Instagram, label: "Instagram", color: "text-pink-500", bg: "bg-pink-50" },
          { Icon: Facebook, label: "Facebook", color: "text-blue-600", bg: "bg-blue-50" },
          { Icon: Linkedin, label: "LinkedIn", color: "text-sky-600", bg: "bg-sky-50" },
        ].map(({ Icon, label, color, bg }) => (
          <div key={label} className="soft-card flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5">
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${bg} ${color}`}>
              <Icon size={18} />
            </span>
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------- TEAM HIERARCHY -------------------------- */

function TeamHierarchy() {
  const { data: foundersData } = useQuery({
    queryKey: ["public", "team_members", "founders"],
    queryFn: async () => {
      const { data } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_founder", true)
        .order("display_order", { ascending: true });
      return data ?? [];
    },
  });
  const founders =
    foundersData && foundersData.length > 0
      ? foundersData
      : [
          { id: "1", name: "Ayesha Tabassum", title: "Founder & CEO", bio: "Visionary founder leading AYMO Digital's mission to scale businesses with AI-powered growth systems.", image_url: null, linkedin_url: null },
        ];
  const leads = [
    { name: "AI & Automation Lead", count: "9 engineers", icon: Bot },
    { name: "Performance Marketing Lead", count: "11 media buyers", icon: BarChart3 },
    { name: "Content & Creative Lead", count: "14 producers", icon: Sparkles },
    { name: "Client Success Lead", count: "6 strategists", icon: Users },
  ];
  return (
    <Section
      eyebrow="Team Hierarchy"
      title={<>The team behind <span className="text-gold-gradient">your growth</span></>}
      subtitle="Founders leading from the front, supported by specialists across AI, paid media, content and client success."
    >
      <div className={`grid gap-6 ${founders.length === 1 ? "md:grid-cols-1 max-w-2xl mx-auto" : founders.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        {founders.map((f: any, i: number) => (
          <Reveal key={f.id} delay={i * 100} direction={i === 0 ? "left" : "right"}>
            <div className="soft-card relative overflow-hidden rounded-3xl p-7">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />
              <div className="flex items-start gap-4">
                {f.image_url ? (
                  <img src={f.image_url} alt={f.name} className="h-16 w-16 shrink-0 rounded-2xl object-cover shadow-lg" />
                ) : (
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.65_0.14_220)] text-white shadow-lg">
                    <span className="text-xl font-bold">{f.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}</span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Crown size={14} className="text-amber-500" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">Leadership</span>
                  </div>
                  <h3 className="mt-1 text-xl font-bold text-foreground">{f.name}</h3>
                  <div className="text-sm font-medium text-primary">{f.title}</div>
                </div>
              </div>
              {f.bio && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.bio}</p>}
              {f.linkedin_url && (
                <div className="mt-5 flex items-center justify-end">
                  <a href={f.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon size={16} className="text-sky-600" />
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>


      <div className="my-6 hidden justify-center md:flex">
        <div className="h-10 w-px bg-gradient-to-b from-primary/40 to-transparent" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leads.map((l, i) => (
          <Reveal key={l.name} delay={i * 80}>
            <div className="soft-card flex h-full items-start gap-4 rounded-3xl p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                <l.icon size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{l.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{l.count}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/5 via-white to-[oklch(0.92_0.04_220/0.3)] p-6 sm:grid-cols-3">
        {[
          { v: "8+", l: "Years of experience" },
          { v: "40+", l: "Specialists across 4 countries" },
          { v: "320+", l: "Projects delivered globally" },
        ].map((c) => (
          <div key={c.l} className="text-center">
            <div className="text-3xl font-extrabold text-gold-gradient">{c.v}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{c.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link to="/about/team" className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:bg-primary hover:text-white">
          Meet the full team <ArrowRight size={14} />
        </Link>
      </div>
    </Section>
  );
}

/* ---------------------------- AUTHORITY --------------------------- */

function Authority() {
  const items = [
    { icon: ShieldCheck, label: "Years of Experience", value: 8 },
    { icon: Users, label: "Team of Specialists", value: 24 },
    { icon: Bot, label: "AI Automation Experts", value: 9 },
    { icon: BarChart3, label: "Performance Marketers", value: 11 },
  ];
  return (
    <Section
      eyebrow="Authority"
      title={<>A team built for <span className="text-gold-gradient">serious growth</span></>}
      subtitle="AI engineers, paid-media operators, content strategists and creative producers — all in one room."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((a, i) => (
          <Reveal key={a.label} delay={i * 80}>
            <div className="soft-card flex h-full items-center gap-4 rounded-3xl p-6">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                <a.icon size={22} />
              </div>
              <div>
                <div className="text-2xl font-extrabold">
                  <CountUp to={a.value} suffix="+" />
                </div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{a.label}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------- PRICING ---------------------------- */

function Pricing() {
  const tiers = [
    {
      name: "Starter Growth",
      price: "$1,497",
      period: "/month",
      features: ["1 channel managed", "Basic AI workflows", "Monthly performance review"],
      highlight: false,
    },
    {
      name: "Scale Engine",
      price: "$3,497",
      period: "/month",
      features: ["3 channels managed", "Advanced AI automations", "Weekly strategy syncs", "Lead-gen system"],
      highlight: true,
    },
    {
      name: "Elite Authority",
      price: "$6,997",
      period: "/month",
      features: ["Full-stack growth team", "Custom AI agents", "Dedicated strategist", "Priority production"],
      highlight: false,
    },
  ];
  return (
    <Section
      eyebrow="Pricing"
      title={<>Choose your <span className="text-gold-gradient">growth tier</span></>}
      subtitle="Transparent monthly retainers. Cancel anytime. No long-term contracts."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <div
              className={`relative rounded-3xl p-8 transition hover:-translate-y-1 ${
                t.highlight
                  ? "bg-gradient-to-br from-primary/15 via-white to-white border border-primary/40 shadow-[0_25px_60px_-20px_oklch(0.65_0.14_220)]"
                  : "soft-card"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-primary to-[oklch(0.65_0.14_220)] px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  t.highlight
                    ? "bg-gradient-to-r from-primary to-[oklch(0.65_0.14_220)] text-white hover:brightness-110"
                    : "border border-border bg-white hover:border-primary/50"
                }`}
              >
                Get Started
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
