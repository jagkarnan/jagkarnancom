import type { Metadata } from "next";
import { youtubeChannel } from "@/content/youtubeChannel";
import { getChannelVideosPage } from "@/lib/youtubeFeed";
import { Container } from "@/components/ui/Container";
import { YoutubeVideosGallery } from "@/components/youtube/YoutubeVideosGallery";

export const metadata: Metadata = {
  title: "YouTube Videos",
  description:
    "Videos from Jag Karnan AI on YouTube—AI thinking, practical applications, and technology.",
  alternates: { canonical: "/youtube-videos" },
};

/** Always fetch fresh video list on each request (avoids ISR serving a cached “0 videos” after a feed/API blip). */
export const dynamic = "force-dynamic";

const INITIAL_PAGE_SIZE = 10;

export default async function YoutubeVideosPage() {
  const { items: initialVideos, total, hasMore, longCount, shortCount } = await getChannelVideosPage(
    0,
    INITIAL_PAGE_SIZE,
    "latest",
  );

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
                className="focus-ring rounded font-semibold text-accent underline decoration-accent/35 underline-offset-[0.15em] transition-colors hover:text-accent/85 hover:decoration-accent/50"
              >
                {youtubeChannel.handle}
              </a>
              )
            </span>
          </h1>
          <p className="mt-1.5 text-xs text-foreground/50 sm:text-sm">
            {shortCount > 0 ? (
              <>
                {longCount} video{longCount === 1 ? "" : "s"} and {shortCount} Short
                {shortCount === 1 ? "" : "s"} ({total} total).
              </>
            ) : (
              <>{total} video{total === 1 ? "" : "s"} total.</>
            )}
          </p>
        </div>

        {total === 0 ? (
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
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2"
              >
                YouTube
              </a>
              .
            </p>
          </div>
        ) : (
          <YoutubeVideosGallery
            initialVideos={initialVideos}
            initialHasMore={hasMore}
            pageSize={INITIAL_PAGE_SIZE}
          />
        )}
      </Container>
    </main>
  );
}
