import type { Metadata } from "next";
import Link from "next/link";
import { aiArticles } from "@/content/aiArticles";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "AI Papers",
  description:
    "Articles on AI, engineering, and technology—written to clarify ideas that matter for builders and leaders.",
  alternates: { canonical: "/ai-papers" },
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function AiPapersPage() {
  const sorted = [...aiArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <main className="min-w-0 overflow-x-hidden pb-12 md:pb-14" aria-label="AI articles">
      <Container>
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45 sm:text-[13px] sm:tracking-[0.2em]">
            Writing
          </p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            AI Papers
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/70">
            Notes and articles on AI, systems, and how to think clearly about technology.
          </p>
        </div>

        <ul className="flex flex-col gap-4 md:gap-6">
          {sorted.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/ai-papers/${article.slug}`}
                className="focus-ring group block rounded-2xl border border-foreground/10 bg-[var(--card)] p-5 shadow-sm shadow-[var(--glass-shadow-soft)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-[var(--glass-hover-border)] hover:shadow-md active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100 sm:p-6"
              >
                <p className="text-xs font-medium text-foreground/50">
                  {formatDate(article.publishedAt)}
                </p>
                <h2 className="mt-2 text-lg font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400 sm:text-xl">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">
                  {article.summary}
                </p>
                <span className="mt-4 inline-flex text-sm font-medium text-sky-600 dark:text-sky-400">
                  Read article
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
