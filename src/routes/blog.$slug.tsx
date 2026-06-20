import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Section, CTAStrip } from "../components/site/Section";
import { getPost, blogPosts } from "../lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Article — AYMO Digital" }], links: [] };
    return {
      meta: [
        { title: `${p.title} — AYMO Digital` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            author: { "@type": "Organization", name: p.author },
            datePublished: p.date,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-px mx-auto max-w-2xl py-32 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-primary">← Back to blog</Link>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="container-px mx-auto max-w-3xl pt-16 sm:pt-20 md:pt-28">
        <Link to="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> Back to blog
        </Link>
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-primary">{post.category}</p>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-base md:text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><User size={12} />{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
        </div>

        <div className="mt-10 space-y-8">
          {post.content.map((s: { heading: string; body: string }) => (
            <section key={s.heading}>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{s.heading}</h2>
              <p className="mt-3 text-sm sm:text-base text-foreground/80 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </article>

      <Section eyebrow="Continue Reading" title={<>More From <span className="text-gold-gradient">The Blog</span></>}>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group soft-card rounded-2xl p-5 transition hover:-translate-y-1"
            >
              <span className="text-[10px] uppercase tracking-[0.18em] text-primary">{p.category}</span>
              <h3 className="mt-2 font-semibold leading-snug line-clamp-2 group-hover:text-primary">{p.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
