import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aiArticles, getArticleBySlug } from "@/content/aiArticles";
import { Container } from "@/components/ui/Container";

export function generateStaticParams() {
  return aiArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Article" };
  }
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/ai-papers/${slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function AiArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="min-w-0 overflow-x-hidden pb-12 md:pb-14" aria-label="Article">
      <Container>
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <Link
            href="/ai-papers"
            className="font-medium text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
          >
            ← AI Papers
          </Link>
        </nav>

        <article className="glass-card rounded-2xl p-5 sm:p-8">
          <header className="border-b border-foreground/10 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
              Topic
            </p>
            <h1 className="mt-2 text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl md:text-3xl">
              {article.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75">
              {article.summary}
            </p>
          </header>

          <div className="mt-8 flex max-w-3xl flex-col gap-10">
            {article.sections.map((section, idx) => {
              const sectionId = `article-${article.slug}-s${idx}`;
              return (
              <section key={sectionId} aria-labelledby={sectionId}>
                <h2
                  id={sectionId}
                  className="text-lg font-semibold leading-tight tracking-tight text-foreground sm:text-xl"
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-[1.6] text-foreground/80">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
              );
            })}
          </div>
        </article>
      </Container>
    </main>
  );
}
