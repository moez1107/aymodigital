import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Briefcase, GraduationCap, MapPin, Clock, Heart, Zap, Globe2 } from "lucide-react";
import { Section, CTAStrip } from "../components/site/Section";
import { Toaster } from "../components/ui/sonner";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — AYMO Digital | Join A Global Growth Team" },
      { name: "description", content: "Open roles, internships and apprenticeships at AYMO Digital. Remote-first, global culture." },
      { property: "og:title", content: "Careers at AYMO Digital" },
      { property: "og:description", content: "Remote-first. Global culture. Open roles and internships available." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const openings = [
  { title: "Senior Full-Stack Engineer", type: "Full-time", location: "Remote (UK / PK)", dept: "Engineering" },
  { title: "Performance Marketer (Meta + Google)", type: "Full-time", location: "Remote (Global)", dept: "Marketing" },
  { title: "AI Automation Specialist", type: "Full-time", location: "Remote (Global)", dept: "AI Automation" },
  { title: "Senior Video Editor (YouTube)", type: "Contract", location: "Remote", dept: "Content" },
  { title: "Brand Designer", type: "Full-time", location: "Islamabad / Remote", dept: "Design" },
];

const internships = [
  { title: "Marketing Intern", duration: "3 months", location: "Remote" },
  { title: "Frontend Engineering Intern", duration: "3–6 months", location: "Remote" },
  { title: "AI Automation Intern", duration: "3 months", location: "Remote" },
];

const perks = [
  { icon: Globe2, title: "Fully Remote", text: "Work from anywhere. We hire across timezones." },
  { icon: Heart, title: "Wellness Stipend", text: "Monthly health, wellness and learning budget." },
  { icon: Zap, title: "Bleeding-Edge Stack", text: "AI tools, automation, modern frameworks — always." },
  { icon: GraduationCap, title: "Learning Budget", text: "Courses, conferences and books on us." },
];

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  role: z.string().trim().min(2).max(150),
  portfolio: z.string().trim().url().max(500).or(z.literal("")).optional(),
  message: z.string().trim().min(10).max(2000),
});

function CareersPage() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
    toast.success("Application received. We'll be in touch.");
  }

  return (
    <>
      <Toaster />
      <section className="container-px mx-auto max-w-7xl pt-16 sm:pt-20 pb-6 md:pt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Careers</p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          Join A Team Building <span className="text-gold-gradient">Global Brands</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground">
          We're remote-first, ambitious and obsessed with the craft. If you ship great work
          and love compounding skill, you'll fit right in.
        </p>
      </section>

      <Section eyebrow="Culture & Perks" title={<>Why People <span className="text-gold-gradient">Love Working Here</span></>}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="soft-card rounded-3xl p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary"><Icon size={20} /></div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Open Roles" title={<>Current <span className="text-gold-gradient">Openings</span></>}>
        <div className="grid gap-3">
          {openings.map((o) => (
            <div key={o.title} className="soft-card rounded-2xl p-5 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center sm:flex sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Briefcase size={14} className="text-primary shrink-0" />
                  <h3 className="font-semibold truncate">{o.title}</h3>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={12} />{o.location}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{o.type}</span>
                  <span>{o.dept}</span>
                </div>
              </div>
              <a href="#apply" className="shrink-0 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold hover:border-primary/40">Apply</a>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Internships" title={<>Start Your <span className="text-gold-gradient">Career With Us</span></>}>
        <div className="grid gap-4 sm:grid-cols-3">
          {internships.map((i) => (
            <div key={i.title} className="soft-card rounded-2xl p-5">
              <GraduationCap size={20} className="text-primary" />
              <h3 className="mt-3 font-semibold">{i.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{i.duration} • {i.location}</p>
              <a href="#apply" className="mt-4 inline-flex text-xs font-semibold text-primary">Apply now →</a>
            </div>
          ))}
        </div>
      </Section>

      <Section id="apply" eyebrow="Application" title={<>Apply <span className="text-gold-gradient">Now</span></>}>
        <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-5">
          <Field label="Full Name" name="name" placeholder="Your name" />
          <Field label="Email" name="email" type="email" placeholder="you@email.com" />
          <Field label="Role / Internship You're Applying For" name="role" placeholder="e.g. AI Automation Specialist" />
          <Field label="Portfolio / LinkedIn URL (optional)" name="portfolio" placeholder="https://…" />
          <div>
            <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Why You?</label>
            <textarea
              name="message"
              rows={5}
              maxLength={2000}
              placeholder="Tell us about your experience and what excites you about this role…"
              className="mt-2 w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary/60"
            />
          </div>
          <button
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-10px_var(--gold)] transition hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Submit Application"}
          </button>
        </form>
      </Section>

      <CTAStrip />
    </>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      <input name={name} type={type} placeholder={placeholder} maxLength={500} className="mt-2 w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary/60" />
    </div>
  );
}
