import { Youtube, Bot, MessageCircle, Music2, Palette, Globe, type LucideIcon } from "lucide-react";

export type ServicePricing = {
  monthlyUSD: number;
  yearlyUSD: number;
  savePercent: number;
};

export type ServiceDef = {
  slug: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  color: string; // tailwind gradient stops
  pricing: ServicePricing;
  description: string;
  includes: string[];
  workflow: { step: string; detail: string }[];
  deliverables: string[];
  faq: { q: string; a: string }[];
};

export const services: ServiceDef[] = [
  {
    slug: "youtube-automation",
    title: "YouTube Automation",
    tagline: "Full-stack YouTube channel growth, end-to-end.",
    icon: Youtube,
    color: "from-red-500 to-rose-600",
    pricing: { monthlyUSD: 120, yearlyUSD: 1200, savePercent: 20 },
    description:
      "We build, manage and scale YouTube channels using a proven content engine — strategy, scripting, premium editing, SEO and publishing.",
    includes: [
      "Channel setup & optimization",
      "Content strategy & calendar",
      "Script writing support",
      "SEO titles, descriptions & tags",
      "Custom thumbnails",
      "Automation workflow setup",
    ],
    workflow: [
      { step: "Discovery & niche audit", detail: "We map your audience, competitors and content gaps." },
      { step: "Channel & SEO setup", detail: "Banner, about, playlists, keywords — all optimized for search." },
      { step: "Production pipeline", detail: "Scripts, editing, thumbnails delivered weekly on a fixed schedule." },
      { step: "Publish, analyze, iterate", detail: "Monthly performance reviews with clear next steps." },
    ],
    deliverables: [
      "4–8 long-form videos / month",
      "Optimized metadata for each upload",
      "Premium thumbnail sets",
      "Monthly analytics report",
    ],
    faq: [
      { q: "Do you film for me?", a: "We coordinate remote shoots and provide a teleprompter-ready script. On-location filming is quoted separately." },
      { q: "How fast do channels grow?", a: "Most clients see meaningful traction within 60–90 days. Niche, consistency and budget all play a role." },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    tagline: "Custom AI workflows that run your business 24/7.",
    icon: Bot,
    color: "from-violet-500 to-indigo-600",
    pricing: { monthlyUSD: 80, yearlyUSD: 800, savePercent: 25 },
    description:
      "We design and deploy AI-powered workflows — GPT integrations, business process automation, CRM and API connections that save your team hours every week.",
    includes: [
      "AI workflow automation",
      "ChatGPT / Claude integrations",
      "Business process automation",
      "API setup & tool integration",
      "CRM & email automation",
      "Reporting dashboards",
    ],
    workflow: [
      { step: "Audit & opportunity map", detail: "We identify the highest-ROI processes to automate first." },
      { step: "Architecture", detail: "We design the workflow, choose tools and document data flow." },
      { step: "Build & test", detail: "We build in Make / n8n / Zapier and stress-test edge cases." },
      { step: "Handover & support", detail: "Full documentation plus ongoing monitoring." },
    ],
    deliverables: [
      "Up to 5 production workflows",
      "Documentation & SOPs",
      "Monthly optimization session",
      "Priority support",
    ],
    faq: [
      { q: "Which tools do you use?", a: "We're tool-agnostic — Make, n8n, Zapier, custom Node/Python where needed." },
      { q: "Do we own the workflows?", a: "Yes, 100%. Everything is built in your accounts." },
    ],
  },
  {
    slug: "chatbots",
    title: "Chatbot Development",
    tagline: "AI chatbots for your website, WhatsApp and socials.",
    icon: MessageCircle,
    color: "from-emerald-500 to-teal-600",
    pricing: { monthlyUSD: 60, yearlyUSD: 600, savePercent: 25 },
    description:
      "Conversational AI bots that qualify leads, answer questions and book meetings around the clock — trained on your brand voice and knowledge base.",
    includes: [
      "Website chatbot",
      "WhatsApp business chatbot",
      "AI-powered responses",
      "Lead capture & CRM sync",
      "Multi-language support",
      "Analytics dashboard",
    ],
    workflow: [
      { step: "Use-case design", detail: "We define intents, flows and success metrics." },
      { step: "Training", detail: "We ingest your docs, FAQs and brand voice." },
      { step: "Deploy", detail: "Launch on web, WhatsApp or Messenger." },
      { step: "Iterate", detail: "Weekly review of conversations to improve quality." },
    ],
    deliverables: [
      "Production bot on chosen channel",
      "Lead routing to your CRM",
      "Knowledge base setup",
      "Performance reports",
    ],
    faq: [
      { q: "Which LLMs do you support?", a: "OpenAI, Anthropic, and open-source options like Llama and Mistral." },
      { q: "Can it transfer to a human?", a: "Yes — seamless handoff to live agents whenever needed." },
    ],
  },
  {
    slug: "tiktok-growth",
    title: "TikTok Growth",
    tagline: "Short-form virality, engineered.",
    icon: Music2,
    color: "from-slate-800 to-slate-900",
    pricing: { monthlyUSD: 70, yearlyUSD: 700, savePercent: 20 },
    description:
      "We grow TikTok accounts with a content engine built around hook science, hashtag research and consistent posting cadence.",
    includes: [
      "Account optimization",
      "Content strategy & hooks",
      "Viral hashtag research",
      "Posting cadence plan",
      "Trend monitoring",
      "Monthly performance review",
    ],
    workflow: [
      { step: "Audit", detail: "Account, niche, competitors and content gaps." },
      { step: "Hook lab", detail: "We build a hook bank tailored to your audience." },
      { step: "Production", detail: "Edit, caption and publish on a fixed weekly schedule." },
      { step: "Analyze", detail: "Double down on what's working, kill what isn't." },
    ],
    deliverables: [
      "12–20 short videos / month",
      "Posting calendar",
      "Hashtag & trend report",
      "Monthly growth review",
    ],
    faq: [
      { q: "Do you provide raw footage?", a: "We can shoot remotely or work with footage you provide." },
      { q: "What's a realistic growth rate?", a: "10–30k followers in 90 days is common, depending on niche." },
    ],
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    tagline: "Visual identity and creatives that convert.",
    icon: Palette,
    color: "from-fuchsia-500 to-pink-600",
    pricing: { monthlyUSD: 50, yearlyUSD: 500, savePercent: 20 },
    description:
      "Brand identity, social creatives, thumbnails and marketing collateral — all built around a consistent visual system.",
    includes: [
      "Social media post designs",
      "Brand identity systems",
      "Thumbnails & banners",
      "Marketing creatives",
      "Pitch decks",
      "Ad creative variants",
    ],
    workflow: [
      { step: "Brand discovery", detail: "Mood, voice, audience and positioning." },
      { step: "Design system", detail: "Colors, typography, components and templates." },
      { step: "Production", detail: "Weekly delivery of creatives on a content calendar." },
      { step: "Refine", detail: "Iterate based on engagement and ad performance." },
    ],
    deliverables: [
      "20–30 designs per month",
      "Reusable Figma templates",
      "Brand guidelines doc",
      "Unlimited revisions (within scope)",
    ],
    faq: [
      { q: "What file formats do you deliver?", a: "Figma source + PNG/JPG/PDF exports as needed." },
      { q: "Can you match an existing brand?", a: "Yes — we work to your existing guidelines or build new ones." },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Fast, SEO-optimized websites and dynamic web apps.",
    icon: Globe,
    color: "from-sky-500 to-blue-600",
    pricing: { monthlyUSD: 150, yearlyUSD: 1500, savePercent: 25 },
    description:
      "Business websites, landing pages and dynamic web applications — built on modern stacks, fully responsive and SEO-ready.",
    includes: [
      "Business & marketing websites",
      "Dynamic web applications",
      "Responsive design",
      "SEO-optimized structure",
      "Admin dashboard (optional)",
      "Hosting & maintenance",
    ],
    workflow: [
      { step: "Scope & design", detail: "Wireframes, design system, content plan." },
      { step: "Build", detail: "Frontend, backend and integrations." },
      { step: "QA & launch", detail: "Performance, accessibility and SEO checks." },
      { step: "Maintain", detail: "Monthly updates, monitoring and improvements." },
    ],
    deliverables: [
      "Production-ready website",
      "CMS or admin dashboard",
      "Hosting setup",
      "Monthly maintenance",
    ],
    faq: [
      { q: "Which tech stack do you use?", a: "React / Next / TanStack Start on the frontend, Node / Supabase / Postgres on the backend." },
      { q: "Do you provide hosting?", a: "Yes — we set up and manage hosting on Vercel, Cloudflare or AWS." },
    ],
  },
];

export const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "PKR", symbol: "₨", rate: 280 },
  { code: "AED", symbol: "د.إ", rate: 3.67 },
  { code: "SAR", symbol: "﷼", rate: 3.75 },
  { code: "GBP", symbol: "£", rate: 0.79 },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export function formatPrice(amountUSD: number, currency: CurrencyCode) {
  const cur = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];
  const value = Math.round(amountUSD * cur.rate);
  const formatted = new Intl.NumberFormat("en-US").format(value);
  return `${cur.symbol}${formatted}`;
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
