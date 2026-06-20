import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, CTAStrip } from "../components/site/Section";
import { blogPosts } from "../lib/blog-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — AYMO Digital | AI, Growth & Brand Insights" },
      { name: "description", content: "Playbooks on AI automation, YouTube growth, TikTok, chatbots and web development — from the AYMO Digital team." },
      { property: "og:title", content: "AYMO Digital Blog" },
      { property: "og:description", content: "Playbooks for ambitious founders and growth teams." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-16 sm:pt-20 md:pt-28">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Blog</p>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          Insights On <span className="text-gold-gradient">AI, Growth & Brand</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="rounded-full border border-border bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group soft-card rounded-3xl p-6 sm:p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,50,70,0.10)]"
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="text-primary">{p.category}</span>
                <span>·</span>
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.readTime}</span>
              </div>
              <h2 className="mt-4 text-xl sm:text-2xl font-semibold leading-snug group-hover:text-primary transition">
                {p.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
              <div className="mt-5 text-sm font-semibold text-primary">Read article →</div>
            </Link>
          ))}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
