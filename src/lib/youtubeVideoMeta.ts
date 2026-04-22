import type { YoutubeFeedVideo } from "@/lib/youtubeFeedTypes";

/** Epoch ms from ISO-8601 `publishedAt`, or `undefined` if not parseable. */
export function publishedMsFromIso(iso: string): number | undefined {
  if (!iso || !/^\d{4}-\d{2}/.test(iso.trim())) return undefined;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? undefined : t;
}

/**
 * YouTube relative strings, e.g. "9 days ago", "Streamed 3 weeks ago".
 * Returns approximate upload time (ms) for sorting.
 */
export function publishedMsFromRelative(text: string, nowMs = Date.now()): number | undefined {
  const t = text.trim().toLowerCase();
  const re =
    /(?:streamed|premiered|updated|posted)?\s*(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/;
  const m = t.match(re);
  if (!m) return undefined;
  const n = parseInt(m[1]!, 10);
  const unit = m[2]!;
  const mult: Record<string, number> = {
    second: 1000,
    minute: 60_000,
    hour: 3_600_000,
    day: 86_400_000,
    week: 604_800_000,
    month: 2_592_000_000,
    year: 31_536_000_000,
  };
  const delta = n * (mult[unit] ?? 0);
  return nowMs - delta;
}

export function inferSortPublishedMs(v: Pick<YoutubeFeedVideo, "publishedAt" | "sortPublishedMs">): number | undefined {
  if (typeof v.sortPublishedMs === "number" && !Number.isNaN(v.sortPublishedMs)) {
    return v.sortPublishedMs;
  }
  const fromIso = publishedMsFromIso(v.publishedAt);
  if (fromIso !== undefined) return fromIso;
  const fromRel = publishedMsFromRelative(v.publishedAt);
  if (fromRel !== undefined) return fromRel;
  const raw = v.publishedAt?.trim();
  if (raw) {
    const t = Date.parse(raw);
    if (!Number.isNaN(t)) return t;
  }
  return undefined;
}

/**
 * Parse counts like "1,234 views", "12K views", "1.2M views", "59 views", "No views".
 */
export function parseViewCountFromText(text: string): number | undefined {
  const raw = text.replace(/\u00a0/g, " ").trim();
  if (/no views|^0\s*view/i.test(raw)) return 0;
  const simplified = raw.replace(/,/g, "");
  const m = simplified.match(/([\d.]+)\s*([kmb])?\s*views?/i);
  if (!m) {
    const m2 = simplified.match(/^([\d.]+)\s*([kmb])$/i);
    if (!m2) return undefined;
    let n = parseFloat(m2[1]!);
    const suf = (m2[2] || "").toUpperCase();
    if (suf === "K") n *= 1000;
    else if (suf === "M") n *= 1_000_000;
    else if (suf === "B") n *= 1_000_000_000;
    return Math.round(n);
  }
  let n = parseFloat(m[1]!);
  const suf = (m[2] || "").toUpperCase();
  if (suf === "K") n *= 1000;
  else if (suf === "M") n *= 1_000_000;
  else if (suf === "B") n *= 1_000_000_000;
  return Math.round(n);
}

/** "Title, 59 views - play Short" → 59 */
export function parseViewsFromShortsAccessibility(accessibilityText: string): number | undefined {
  const m = accessibilityText.match(/,\s*([\d,.]+(?:\.[\d]+)?)\s*([kmb])?\s+views/i);
  if (!m) return undefined;
  const num = m[1]!.replace(/,/g, "");
  let n = parseFloat(num);
  const suf = (m[2] || "").toUpperCase();
  if (suf === "K") n *= 1000;
  else if (suf === "M") n *= 1_000_000;
  return Math.round(n);
}

export function formatViewCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M views`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1).replace(/\.0$/, "")}K views`;
  return `${n.toLocaleString("en")} views`;
}

export type YoutubeSortMode = "latest" | "popular";

export function sortVideosForDisplay(videos: YoutubeFeedVideo[], mode: YoutubeSortMode): YoutubeFeedVideo[] {
  const copy = [...videos];
  if (mode === "latest") {
    copy.sort((a, b) => {
      const tb = b.sortPublishedMs ?? Number.NEGATIVE_INFINITY;
      const ta = a.sortPublishedMs ?? Number.NEGATIVE_INFINITY;
      if (tb !== ta) return tb - ta;
      return b.videoId.localeCompare(a.videoId);
    });
  } else {
    copy.sort((a, b) => {
      const vb = b.viewCount ?? -1;
      const va = a.viewCount ?? -1;
      if (vb !== va) return vb - va;
      return b.videoId.localeCompare(a.videoId);
    });
  }
  return copy;
}

export function enrichYoutubeGalleryVideos(videos: YoutubeFeedVideo[]): YoutubeFeedVideo[] {
  return videos.map((v) => {
    const sortPublishedMs = inferSortPublishedMs(v);
    return { ...v, sortPublishedMs };
  });
}

export function finalizeYoutubeGalleryVideos(videos: YoutubeFeedVideo[]): YoutubeFeedVideo[] {
  return sortVideosForDisplay(enrichYoutubeGalleryVideos(videos), "latest");
}
