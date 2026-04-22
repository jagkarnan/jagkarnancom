"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { YoutubeFeedVideo } from "@/lib/youtubeFeedTypes";
import {
  formatViewCount,
  inferSortPublishedMs,
  sortVideosForDisplay,
  type YoutubeSortMode,
} from "@/lib/youtubeVideoMeta";

function formatDate(isoOrLabel: string) {
  if (!isoOrLabel) return "";
  const d = new Date(isoOrLabel);
  if (!Number.isNaN(d.getTime())) {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  }
  return isoOrLabel;
}

type PagePayload = {
  items: YoutubeFeedVideo[];
  total: number;
  hasMore: boolean;
};

type Props = {
  initialVideos: YoutubeFeedVideo[];
  initialHasMore: boolean;
  pageSize: number;
};

export function YoutubeVideosGallery({
  initialVideos,
  initialHasMore,
  pageSize,
}: Props) {
  /** User’s sort control; may differ from `appliedSort` while a refetch is in flight. */
  const [selectedSort, setSelectedSort] = useState<YoutubeSortMode>("latest");
  /** Sort order that `videos` / pagination offsets match (server-sliced list). */
  const [appliedSort, setAppliedSort] = useState<YoutubeSortMode>("latest");
  const [videos, setVideos] = useState(initialVideos);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const ordered = useMemo(() => {
    const enriched = videos.map((v) => ({
      ...v,
      sortPublishedMs: inferSortPublishedMs(v) ?? v.sortPublishedMs,
    }));
    return sortVideosForDisplay(enriched, appliedSort);
  }, [videos, appliedSort]);

  const fetchPage = useCallback(
    async (offset: number, sortMode: YoutubeSortMode): Promise<PagePayload | null> => {
      const params = new URLSearchParams({
        offset: String(offset),
        limit: String(pageSize),
        sort: sortMode,
      });
      const res = await fetch(`/api/youtube-videos?${params}`);
      if (!res.ok) return null;
      return (await res.json()) as PagePayload;
    },
    [pageSize],
  );

  useEffect(() => {
    if (selectedSort === appliedSort) return;
    let cancelled = false;
    setLoading(true);
    void (async () => {
      const page = await fetchPage(0, selectedSort);
      if (cancelled || !page) {
        if (!cancelled) setLoading(false);
        return;
      }
      setVideos(page.items);
      setHasMore(page.hasMore);
      setAppliedSort(selectedSort);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedSort, appliedSort, fetchPage]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || selectedSort !== appliedSort) return;
    setLoading(true);
    try {
      const page = await fetchPage(videos.length, appliedSort);
      if (!page) return;
      setVideos((prev) => {
        const seen = new Set(prev.map((v) => v.videoId));
        const next = [...prev];
        for (const item of page.items) {
          if (!seen.has(item.videoId)) {
            seen.add(item.videoId);
            next.push(item);
          }
        }
        return next;
      });
      setHasMore(page.hasMore);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, fetchPage, videos.length, appliedSort, selectedSort]);

  useEffect(() => {
    if (!hasMore || loading || selectedSort !== appliedSort) return;
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { rootMargin: "280px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, loading, loadMore, videos.length, appliedSort, selectedSort]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-foreground/50 sm:text-sm">Sort:</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Sort videos">
          <button
            type="button"
            onClick={() => setSelectedSort("latest")}
            disabled={loading}
            aria-pressed={selectedSort === "latest"}
            className={`focus-ring rounded-full border px-3 py-1.5 text-sm font-medium transition-[background-color,border-color] duration-200 disabled:opacity-50 ${
              selectedSort === "latest"
                ? "border-foreground/25 bg-foreground/[0.08] text-foreground"
                : "border-foreground/12 bg-transparent text-foreground/75 hover:border-foreground/18 hover:bg-foreground/[0.05]"
            }`}
          >
            Latest
          </button>
          <button
            type="button"
            onClick={() => setSelectedSort("popular")}
            disabled={loading}
            aria-pressed={selectedSort === "popular"}
            className={`focus-ring rounded-full border px-3 py-1.5 text-sm font-medium transition-[background-color,border-color] duration-200 disabled:opacity-50 ${
              selectedSort === "popular"
                ? "border-foreground/25 bg-foreground/[0.08] text-foreground"
                : "border-foreground/12 bg-transparent text-foreground/75 hover:border-foreground/18 hover:bg-foreground/[0.05]"
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((v) => (
          <li key={v.videoId}>
            <a
              href={v.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                v.isShort
                  ? `${v.title} — watch Short on YouTube (opens in new tab)`
                  : `${v.title} — watch on YouTube (opens in new tab)`
              }
              className="surface-vercel-tile focus-ring group block h-full rounded-xl bg-[var(--card)] active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              <div
                className={
                  v.isShort
                    ? "relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-t-xl bg-foreground/5"
                    : "relative aspect-video overflow-hidden rounded-t-xl bg-foreground/5"
                }
              >
                {v.isShort ? (
                  <span className="absolute left-3 top-3 z-10 rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Short
                  </span>
                ) : null}
                <img
                  src={v.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  width={v.isShort ? 360 : 480}
                  height={v.isShort ? 640 : 360}
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
                <p className="text-xs font-medium text-foreground/50">
                  {[
                    formatDate(v.publishedAt),
                    typeof v.viewCount === "number" && v.viewCount >= 100 ? formatViewCount(v.viewCount) : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-foreground/90 sm:text-base">
                  {v.title}
                </p>
                <span className="mt-3 inline-flex text-sm font-medium text-red-600 dark:text-red-400">
                  {v.isShort ? "Watch Short" : "Watch on YouTube"}
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>
                    ↗
                  </span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div ref={sentinelRef} className="flex min-h-12 items-center justify-center py-8" aria-hidden>
          {loading ? (
            <span className="text-sm text-foreground/50">Loading more…</span>
          ) : (
            <span className="text-sm text-foreground/35">Scroll for more</span>
          )}
        </div>
      ) : null}
    </div>
  );
}
