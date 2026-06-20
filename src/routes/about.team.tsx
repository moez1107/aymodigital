import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Twitter, Github } from "lucide-react";
import { Section, CTAStrip } from "../components/site/Section";

export const Route = createFileRoute("/about/team")({
  head: () => ({
    meta: [
      { title: "Our Team — AYMO Digital" },
      { name: "description", content: "Meet the AYMO Digital leadership, developers, marketers and AI specialists building global brands." },
      { property: "og:title", content: "Meet The AYMO Digital Team" },
      { property: "og:description", content: "Leadership, marketing, engineering and AI automation specialists." },
      { property: "og:url", content: "/about/team" },
    ],
    links: [{ rel: "canonical", href: "/about/team" }],
  }),
  component: TeamPage,
});

type Member = {
  name: string;
  role: string;
  group: "Leadership" | "Marketing" | "Engineering" | "AI Automation";
  bio: string;
  initials: string;
  color: string;
};

const team: Member[] = [
  { name: "Ayan M. Osman", role: "Founder & CEO", group: "Leadership", bio: "Building global brands across USA, UK and UAE. 8+ years in agency growth.", initials: "AO", color: "from-primary to-[oklch(0.55_0.14_230)]" },
  { name: "Mariam Ali", role: "Chief Operating Officer", group: "Leadership", bio: "Operations & client success lead. Scaled 3 agencies past 7-figures.", initials: "MA", color: "from-fuchsia-500 to-pink-600" },
  { name: "Hassan Raza", role: "Head of Growth Marketing", group: "Marketing", bio: "Paid media strategist. $12M+ in tracked ad spend managed across Meta & Google.", initials: "HR", color: "from-amber-400 to-orange-500" },
  { name: "Sara Khan", role: "Content Director", group: "Marketing", bio: "YouTube and short-form strategist. Built 4 channels past 1M subscribers.", initials: "SK", color: "from-rose-500 to-red-600" },
  { name: "Bilal Iqbal", role: "Lead Full-Stack Engineer", group: "Engineering", bio: "Builds scalable web apps in TypeScript, React and Node.", initials: "BI", color: "from-sky-500 to-blue-600" },
  { name: "Areeba Tariq", role: "Senior Frontend Engineer", group: "Engineering", bio: "Design-systems and accessibility specialist.", initials: "AT", color: "from-emerald-500 to-teal-600" },
  { name: "Daniyal Sheikh", role: "AI Automation Lead", group: "AI Automation", bio: "Designs end-to-end AI workflows in Make, n8n and custom Python.", initials: "DS", color: "from-violet-500 to-indigo-600" },
  { name: "Zara Yousaf", role: "Conversational AI Specialist", group: "AI Automation", bio: "Builds chatbots and voice agents on OpenAI and Anthropic.", initials: "ZY", color: "from-cyan-500 to-sky-600" },
];

const groups = ["Leadership", "Marketing", "Engineering", "AI Automation"] as const;

function TeamPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-16 sm:pt-20 pb-6 md:pt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Our Team</p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          The People Behind <span className="text-gold-gradient">AYMO Digital</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground">
          Founders, marketers, engineers and AI specialists — working across timezones to ship great work.
        </p>
      </section>

      {groups.map((group) => (
        <Section key={group} eyebrow={group} title={null}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.filter((m) => m.group === group).map((m) => (
              <div key={m.name} className="soft-card rounded-3xl p-6 transition hover:-translate-y-1">
                <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${m.color} text-white font-bold text-lg shadow-md`}>
                  {m.initials}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-primary">{m.role}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                <div className="mt-4 flex gap-2">
                  <a href="#" aria-label="LinkedIn" className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40"><Linkedin size={14} /></a>
                  <a href="#" aria-label="Twitter" className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40"><Twitter size={14} /></a>
                  <a href="#" aria-label="GitHub" className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40"><Github size={14} /></a>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <CTAStrip />
    </>
  );
}
