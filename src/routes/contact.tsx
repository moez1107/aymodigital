import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
import { Section } from "../components/site/Section";
import { Toaster } from "../components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { whatsappLink } from "@/lib/contact-info";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AYMO Digital | Book Your Free Consultation" },
      { name: "description", content: "Reach AYMO Digital in Islamabad, Rawalpindi, Bahawalnagar, Tolworth and Wimbledon. Book a free strategy call." },
      { property: "og:title", content: "Contact AYMO Digital" },
      { property: "og:description", content: "Email, phone, locations and a free consultation form." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  business: z.string().trim().min(2, "Tell us your business type").max(120),
  service: z.string().trim().min(2, "Which service?").max(120),
  goal: z.string().trim().min(10, "Add a bit more detail").max(1000),
});

const emails = [
  { label: "Primary", value: "info@aymo.digital" },
  { label: "Partnership", value: "info@amenterprises.tech" },
  { label: "Direct", value: "contactaymodigital@gmail.com" },
];

const phones = [
  { label: "Primary", value: "0325 6900925 (+92 325 6900925)", href: "tel:+923256900925" },
];

const locations = [
  { region: "Pakistan", cities: ["Islamabad (HQ)", "Rawalpindi", "Bahawalnagar"] },
  { region: "United Kingdom", cities: ["Tolworth", "Wimbledon"] },
];

function ContactPage() {
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
    try {
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.business,
        service_interest: parsed.data.service,
        message: parsed.data.goal,
        source: "contact_page",
      });
      if (error) throw error;
      // Also send to WhatsApp
      const waMsg = `New Lead from website\n\nName: ${parsed.data.name}\nEmail: ${parsed.data.email}\nBusiness: ${parsed.data.business}\nService: ${parsed.data.service}\nGoal: ${parsed.data.goal}`;
      window.open(whatsappLink(waMsg), "_blank", "noopener,noreferrer");
      (e.target as HTMLFormElement).reset();
      toast.success("Got it. We'll be in touch within 24 hours.");
    } catch (err: any) {
      toast.error(err?.message ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Toaster />
      <section className="container-px mx-auto max-w-7xl pt-16 sm:pt-20 md:pt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Contact</p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          Let's Build Something <span className="text-gold-gradient">Great Together</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground">
          Reach us by email, phone or fill the form below. We respond within one business day.
        </p>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8 space-y-5">
            <Field label="Full Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            <Field label="Business Type" name="business" placeholder="SaaS, eCommerce, Agency…" />
            <Field label="Service Interested In" name="service" placeholder="AI Automation, YouTube Growth…" />
            <div>
              <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Project Goal</label>
              <textarea
                name="goal"
                rows={4}
                maxLength={1000}
                placeholder="Tell us about your goals and timeline…"
                className="mt-2 w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary/60"
              />
            </div>
            <button
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[oklch(0.68_0.13_210)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_oklch(0.68_0.13_210)] transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Book Free Consultation"}
            </button>
          </form>

          <aside className="space-y-5">
            <div className="soft-card rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Mail size={14} className="text-primary" /> Email
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {emails.map((e) => (
                  <li key={e.value}>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{e.label}</span>
                    <a href={`mailto:${e.value}`} className="block break-all font-semibold text-primary hover:underline">{e.value}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="soft-card rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Phone size={14} className="text-primary" /> Phone
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {phones.map((p) => (
                  <li key={p.value} className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{p.label}</span>
                    <a href={p.href} className="font-semibold text-foreground hover:text-primary">{p.value}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="soft-card rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <MapPin size={14} className="text-primary" /> Locations
              </div>
              <div className="mt-3 space-y-3 text-sm">
                {locations.map((l) => (
                  <div key={l.region}>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{l.region}</div>
                    <div className="mt-1 text-foreground/90">{l.cities.join(" · ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={255}
        className="mt-2 w-full rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary/60"
      />
    </div>
  );
}
