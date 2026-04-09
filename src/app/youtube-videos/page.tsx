import type { Metadata } from "next";
import { youtubeChannel } from "@/content/youtubeChannel";
import { getChannelVideosFromFeed } from "@/lib/youtubeFeed";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "YouTube Videos",
  description:
    "Videos from Jag Karnan AI on YouTube—AI thinking, practical applications, and technology.",
  alternates: { canonical: "/youtube-videos" },
};

/**
 * Next.js only accepts a static literal here — keep equal to
 * `YOUTUBE_FEED_REVALIDATE_SECONDS` in `@/lib/youtubeFeed`.
 */
export const revalidate = 300;

function formatDate(iso: string) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function YoutubeVideosPage() {
  const videos = await getChannelVideosFromFeed();

  return (
    <main className="min-w-0 overflow-x-hidden pb-12 md:pb-14" aria-label="YouTube videos">
      <Container>
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45 sm:text-[13px] sm:tracking-[0.2em]">
            Channel
          </p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            <span>YouTube Videos </span>
            <span className="font-normal text-foreground/70">
              (
              <a
                href={youtubeChannel.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Opens YouTube in a new tab"
                aria-label={`${youtubeChannel.handle} on YouTube — opens in a new tab`}
                className="focus-ring rounded font-semibold text-sky-600 underline decoration-sky-600/35 underline-offset-[0.15em] transition-colors hover:text-sky-500 hover:decoration-sky-500/50 dark:text-sky-400 dark:decoration-sky-400/35 dark:hover:text-sky-300"
              >
                {youtubeChannel.handle}
              </a>
              )
            </span>
          </h1>
          <p className="mt-1.5 text-xs text-foreground/50 sm:text-sm">
            Total videos: {videos.length}
          </p>
        </div>

        {videos.length === 0 ? (
          <div
            className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-6 text-sm leading-relaxed text-foreground/80 sm:px-6"
            role="status"
          >
            <p className="font-medium text-foreground">No videos loaded right now.</p>
            <p className="mt-2">
              Watch directly on{" "}
              <a
                href={youtubeChannel.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 dark:text-sky-400"
              >
                YouTube
              </a>
              .
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.videoId}>
                <a
                  href={v.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${v.title} — watch on YouTube (opens in new tab)`}
                  className="focus-ring group block h-full rounded-2xl border border-foreground/10 bg-[var(--card)] shadow-sm shadow-[var(--glass-shadow-soft)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-[var(--glass-hover-border)] hover:shadow-md active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-foreground/5">
                    <img
                      src={v.thumbnailUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                      width={480}
                      height={360}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <span className="absolute bottom-3 left-3 right-3 text-sm font-semibold leading-snug text-white drop-shadow-sm sm:text-base">
                      {v.title}
                    </span>
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className="px-4 py-3 sm:px-5 sm:py-4">
                    <p className="text-xs font-medium text-foreground/50">{formatDate(v.publishedAt)}</p>
                    <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-foreground/90 sm:text-base">
                      {v.title}
                    </p>
                    <span className="mt-3 inline-flex text-sm font-medium text-red-600 dark:text-red-400">
                      Watch on YouTube
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>
                        ↗
                      </span>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
