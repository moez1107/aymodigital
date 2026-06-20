export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: { heading: string; body: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-automation-roi-2026",
    title: "AI Automation ROI: What To Automate First In 2026",
    excerpt:
      "A practical guide for founders deciding which workflows to automate — and which to leave alone.",
    category: "AI Automation",
    date: "Jun 12, 2026",
    readTime: "8 min",
    author: "AYMO Digital Team",
    content: [
      { heading: "Where most teams start wrong", body: "Most founders try to automate the obvious — invoicing, email, social posting. Those are fine, but they're rarely the highest-leverage workflows. The real ROI lives in customer-facing flows: lead qualification, onboarding, and support triage." },
      { heading: "The 80/20 of business automation", body: "Look at your team's calendar. The top three repetitive tasks that consume 60%+ of someone's week are your starting point. Build there first." },
      { heading: "Tools we recommend", body: "Make for visual workflows, n8n for self-hosted control, Zapier for fast prototyping, and custom Node/Python only when the off-the-shelf options can't reach." },
    ],
  },
  {
    slug: "youtube-channel-90-day-plan",
    title: "A 90-Day Plan To Launch A High-Converting YouTube Channel",
    excerpt: "The exact playbook we use with AYMO clients to go from zero to authority in 90 days.",
    category: "YouTube Growth",
    date: "Jun 5, 2026",
    readTime: "11 min",
    author: "AYMO Digital Team",
    content: [
      { heading: "Days 1–14: Positioning", body: "Define your niche, audience and content pillars. Don't film anything yet." },
      { heading: "Days 15–45: Foundation", body: "Channel art, playlists, and your first 6 videos in the can." },
      { heading: "Days 46–90: Scale", body: "Twice-weekly publishing, thumbnail A/B testing, and a Shorts feeder strategy." },
    ],
  },
  {
    slug: "chatbots-vs-forms",
    title: "Chatbots vs Forms: When To Use Which",
    excerpt: "Conversational UI sounds great, but forms still win in many contexts. Here's how to decide.",
    category: "Chatbots",
    date: "May 28, 2026",
    readTime: "6 min",
    author: "AYMO Digital Team",
    content: [
      { heading: "Use forms when", body: "Inputs are structured, users know what they want, and speed matters." },
      { heading: "Use chatbots when", body: "Discovery is part of the flow, users need guidance, or you want to qualify across multiple paths." },
      { heading: "Use both", body: "Most modern apps benefit from a hybrid: a chatbot for discovery, a form to confirm." },
    ],
  },
  {
    slug: "tiktok-hook-science",
    title: "TikTok Hook Science: 7 Patterns That Stop The Scroll",
    excerpt: "The first 1.5 seconds decide whether a video earns its reach. Here are the patterns that work.",
    category: "TikTok Growth",
    date: "May 20, 2026",
    readTime: "7 min",
    author: "AYMO Digital Team",
    content: [
      { heading: "The contradiction hook", body: "'Everyone tells you X. They're wrong.' — works because curiosity beats agreement." },
      { heading: "The visual reveal hook", body: "Show the end-state first, then explain how you got there." },
      { heading: "The number hook", body: "'3 ways to…' is overused but still works when paired with a strong visual." },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
