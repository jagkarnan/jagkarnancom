import { youtubeChannel } from "@/content/youtubeChannel";
import {
  finalizeYoutubeGalleryVideos,
  parseViewCountFromText,
  parseViewsFromShortsAccessibility,
  publishedMsFromIso,
} from "@/lib/youtubeVideoMeta";
import type { YoutubeFeedVideo } from "@/lib/youtubeFeedTypes";

export type { YoutubeFeedVideo } from "@/lib/youtubeFeedTypes";

const MAX_LONG_FORM = 15;
const MAX_SHORTS = 15;

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function extractEntryTitle(chunk: string): string | undefined {
  const cdata = chunk.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/);
  if (cdata?.[1] != null) return cdata[1].trim();
  const plain = chunk.match(/<title>([^<]*)<\/title>/);
  return plain?.[1]?.trim();
}

function parseYoutubeAtomFeed(xml: string): YoutubeFeedVideo[] {
  if (!xml.includes("<entry>")) return [];
  const videos: YoutubeFeedVideo[] = [];
  const parts = xml.split("<entry>");
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i].split("</entry>")[0] ?? "";
    const videoId = chunk.match(/<yt:videoId>([^<]*)<\/yt:videoId>/)?.[1]?.trim();
    const titleRaw = extractEntryTitle(chunk);
    const published = chunk.match(/<published>([^<]*)<\/published>/)?.[1]?.trim() ?? "";
    const thumb =
      chunk.match(/<media:thumbnail[^>]*url="([^"]*)"/)?.[1]?.trim() ??
      (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined);
    const link = chunk.match(/<link rel="alternate" href="([^"]*)"/)?.[1]?.trim();
    if (!videoId || !titleRaw) continue;
    videos.push({
      videoId,
      title: decodeXmlEntities(titleRaw),
      publishedAt: published,
      sortPublishedMs: publishedMsFromIso(published),
      thumbnailUrl: thumb ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      watchUrl: link ?? `https://www.youtube.com/watch?v=${videoId}`,
    });
  }
  return videos;
}

function uploadsPlaylistIdFromChannelId(channelId: string): string {
  if (channelId.startsWith("UC")) {
    return `UU${channelId.slice(2)}`;
  }
  return channelId;
}

type PlaylistItemsResponse = {
  items?: Array<{
    snippet?: {
      title?: string;
      publishedAt?: string;
      resourceId?: { videoId?: string };
      thumbnails?: { high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } };
    };
  }>;
  error?: { message?: string };
};

type SearchListResponse = {
  items?: Array<{
    id?: { videoId?: string };
    snippet?: {
      title?: string;
      publishedAt?: string;
      thumbnails?: { high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } };
    };
  }>;
  error?: { message?: string };
};

type ChannelsListResponse = {
  items?: Array<{
    contentDetails?: { relatedPlaylists?: { uploads?: string } };
  }>;
  error?: { message?: string };
};

async function resolveUploadsPlaylistId(apiKey: string): Promise<string | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("id", youtubeChannel.channelId);
  url.searchParams.set("key", apiKey);
  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ChannelsListResponse;
    const id = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    return typeof id === "string" && id.length > 0 ? id : null;
  } catch {
    return null;
  }
}

async function fetchPlaylistItems(apiKey: string, playlistId: string): Promise<YoutubeFeedVideo[] | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", String(MAX_LONG_FORM));
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PlaylistItemsResponse;
    if (data.error?.message) return null;
    const items = data.items ?? [];
    const videos: YoutubeFeedVideo[] = [];
    for (const row of items) {
      const sn = row.snippet;
      const videoId = sn?.resourceId?.videoId;
      const title = sn?.title?.trim();
      if (!videoId || !title) continue;
      const thumb =
        sn?.thumbnails?.high?.url ??
        sn?.thumbnails?.medium?.url ??
        sn?.thumbnails?.default?.url ??
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const publishedAt = sn?.publishedAt ?? "";
      videos.push({
        videoId,
        title,
        publishedAt,
        sortPublishedMs: publishedMsFromIso(publishedAt),
        thumbnailUrl: thumb,
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
    return videos.length > 0 ? videos : null;
  } catch {
    return null;
  }
}

async function fetchShortsViaSearchApi(apiKey: string): Promise<YoutubeFeedVideo[] | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", youtubeChannel.channelId);
  url.searchParams.set("type", "video");
  url.searchParams.set("videoDuration", "short");
  url.searchParams.set("order", "date");
  url.searchParams.set("maxResults", String(MAX_SHORTS));
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SearchListResponse;
    if (data.error?.message) return null;
    const items = data.items ?? [];
    const out: YoutubeFeedVideo[] = [];
    for (const row of items) {
      const videoId = row.id?.videoId;
      const title = row.snippet?.title?.trim();
      if (!videoId || !title) continue;
      const sn = row.snippet;
      const thumb =
        sn?.thumbnails?.high?.url ??
        sn?.thumbnails?.medium?.url ??
        sn?.thumbnails?.default?.url ??
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const publishedAt = sn?.publishedAt ?? "";
      out.push({
        videoId,
        title,
        publishedAt,
        sortPublishedMs: publishedMsFromIso(publishedAt),
        thumbnailUrl: thumb,
        watchUrl: `https://www.youtube.com/shorts/${videoId}`,
      });
    }
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
}

type VideoResourceItem = {
  id?: string;
  snippet?: { publishedAt?: string };
  statistics?: { viewCount?: string };
};

/**
 * Fills accurate **upload date** (`snippet.publishedAt`) and **view counts** for every id.
 * The Shorts tab HTML does not expose publish time; this is required for date sort on Shorts
 * when not using playlist/search as the primary source.
 */
async function mergeVideoDetailsFromVideosList(
  apiKey: string,
  videos: YoutubeFeedVideo[],
): Promise<YoutubeFeedVideo[]> {
  const ids = [...new Set(videos.map((v) => v.videoId))];
  if (ids.length === 0) return videos;
  const details = new Map<string, { publishedAt?: string; viewCount?: number }>();

  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "snippet,statistics");
    url.searchParams.set("id", chunk.join(","));
    url.searchParams.set("key", apiKey);
    try {
      const res = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { items?: VideoResourceItem[] };
      for (const it of data.items ?? []) {
        if (!it.id) continue;
        const publishedAt = it.snippet?.publishedAt?.trim();
        let viewCount: number | undefined;
        if (it.statistics?.viewCount != null) {
          const n = parseInt(String(it.statistics.viewCount), 10);
          if (!Number.isNaN(n)) viewCount = n;
        }
        if (publishedAt || viewCount != null) {
          details.set(it.id, { publishedAt: publishedAt || undefined, viewCount });
        }
      }
    } catch {
      /* skip chunk */
    }
  }

  if (details.size === 0) return videos;

  return videos.map((v) => {
    const d = details.get(v.videoId);
    if (!d) return v;
    const publishedAt = d.publishedAt ?? v.publishedAt;
    const sortPublishedMs =
      (d.publishedAt ? publishedMsFromIso(d.publishedAt) : undefined) ??
      v.sortPublishedMs ??
      publishedMsFromIso(v.publishedAt);
    const viewCount = d.viewCount ?? v.viewCount;
    return { ...v, publishedAt, sortPublishedMs, viewCount };
  });
}

async function fetchLongFormViaDataApi(apiKey: string): Promise<YoutubeFeedVideo[] | null> {
  const resolved = await resolveUploadsPlaylistId(apiKey);
  const fallback = uploadsPlaylistIdFromChannelId(youtubeChannel.channelId);
  const candidates = [resolved, fallback].filter((id): id is string => typeof id === "string" && id.length > 0);
  const playlistIds = [...new Set(candidates)];
  for (const playlistId of playlistIds) {
    const videos = await fetchPlaylistItems(apiKey, playlistId);
    if (videos && videos.length > 0) return videos;
  }
  return null;
}

const FEED_FETCH_USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "jagkarnan.com/1.0 (channel RSS)",
];

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchAtomFeedOnce(userAgent: string): Promise<YoutubeFeedVideo[] | null> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannel.channelId}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": userAgent,
        Accept: "application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return null;
    const xml = await res.text();
    const videos = parseYoutubeAtomFeed(xml);
    return videos.length > 0 ? videos : null;
  } catch {
    return null;
  }
}

async function fetchVideosViaAtomFeedWithRetries(): Promise<YoutubeFeedVideo[] | null> {
  for (let attempt = 0; attempt < FEED_FETCH_USER_AGENTS.length; attempt++) {
    const ua = FEED_FETCH_USER_AGENTS[attempt] ?? FEED_FETCH_USER_AGENTS[0];
    const videos = await fetchAtomFeedOnce(ua);
    if (videos && videos.length > 0) return videos;
    if (attempt < FEED_FETCH_USER_AGENTS.length - 1) {
      await sleep(400 * (attempt + 1));
    }
  }
  return null;
}

function extractYtInitialDataJson(html: string): string | null {
  const marker = "var ytInitialData = ";
  const idx = html.indexOf(marker);
  if (idx === -1) return null;
  let i = idx + marker.length;
  while (i < html.length && /\s/.test(html[i]!)) i++;
  if (html[i] !== "{") return null;
  let depth = 0;
  let inStr: '"' | "'" | null = null;
  let escape = false;
  const start = i;
  for (; i < html.length; i++) {
    const c = html[i]!;
    if (inStr) {
      if (escape) {
        escape = false;
        continue;
      }
      if (c === "\\") {
        escape = true;
        continue;
      }
      if (c === inStr) {
        inStr = null;
        continue;
      }
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = c;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return html.slice(start, i + 1);
    }
  }
  return null;
}

function titleFromRenderer(title: unknown): string {
  if (!title || typeof title !== "object") return "";
  const t = title as { runs?: Array<{ text?: string }>; simpleText?: string };
  if (Array.isArray(t.runs)) {
    return t.runs.map((r) => r.text ?? "").join("").trim();
  }
  return (t.simpleText ?? "").trim();
}

function thumbFromRenderer(thumbnail: unknown): string | undefined {
  if (!thumbnail || typeof thumbnail !== "object") return undefined;
  const th = thumbnail as { thumbnails?: Array<{ url?: string; width?: number }> };
  const list = th.thumbnails;
  if (!Array.isArray(list) || list.length === 0) return undefined;
  const sorted = [...list].sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return sorted[0]?.url;
}

function parseLongFormFromYtData(data: unknown): YoutubeFeedVideo[] {
  const seen = new Set<string>();
  const videos: YoutubeFeedVideo[] = [];

  function walk(o: unknown): void {
    if (!o || typeof o !== "object") return;
    const rec = o as Record<string, unknown>;
    if ("videoRenderer" in rec && rec.videoRenderer && typeof rec.videoRenderer === "object") {
      const vr = rec.videoRenderer as Record<string, unknown>;
      const videoId = typeof vr.videoId === "string" ? vr.videoId : "";
      if (videoId && !seen.has(videoId)) {
        seen.add(videoId);
        const title = titleFromRenderer(vr.title) || "Video";
        const thumb =
          thumbFromRenderer(vr.thumbnail) ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const rel =
          (vr.publishedTimeText as { simpleText?: string } | undefined)?.simpleText?.trim() ?? "";
        const vcText =
          (vr.viewCountText as { simpleText?: string } | undefined)?.simpleText ??
          (vr.shortViewCountText as { simpleText?: string } | undefined)?.simpleText;
        const viewCount = vcText ? parseViewCountFromText(vcText) : undefined;
        videos.push({
          videoId,
          title,
          publishedAt: rel,
          thumbnailUrl: thumb,
          watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
          viewCount,
        });
      }
    }
    for (const k of Object.keys(rec)) walk(rec[k]);
  }
  walk(data);
  return videos.slice(0, MAX_LONG_FORM);
}

function parseShortsFromYtData(data: unknown): YoutubeFeedVideo[] {
  const seen = new Set<string>();
  const shorts: YoutubeFeedVideo[] = [];

  function walk(o: unknown): void {
    if (!o || typeof o !== "object") return;
    const rec = o as Record<string, unknown>;
    if ("richItemRenderer" in rec && rec.richItemRenderer && typeof rec.richItemRenderer === "object") {
      const ri = rec.richItemRenderer as Record<string, unknown>;
      const svm = ri.content as { shortsLockupViewModel?: Record<string, unknown> } | undefined;
      const model = svm?.shortsLockupViewModel;
      if (model && typeof model === "object") {
        const tap = model.onTap as { innertubeCommand?: Record<string, unknown> } | undefined;
        const cmd = tap?.innertubeCommand;
        const vid =
          typeof cmd?.reelWatchEndpoint === "object" && cmd.reelWatchEndpoint !== null
            ? (cmd.reelWatchEndpoint as { videoId?: string }).videoId
            : undefined;
        const videoId = typeof vid === "string" ? vid : "";
        if (videoId && !seen.has(videoId)) {
          seen.add(videoId);
          const ax = typeof model.accessibilityText === "string" ? model.accessibilityText : "";
          const title = ax.split(",")[0]?.trim() || "Short";
          const viewCount = parseViewsFromShortsAccessibility(ax);
          const thumbs =
            typeof cmd?.reelWatchEndpoint === "object" && cmd.reelWatchEndpoint !== null
              ? (cmd.reelWatchEndpoint as { thumbnail?: { thumbnails?: Array<{ url?: string; width?: number }> } })
                  .thumbnail?.thumbnails
              : undefined;
          const thumb =
            (Array.isArray(thumbs) && thumbs.length > 0
              ? [...thumbs].sort((a, b) => (b.width ?? 0) - (a.width ?? 0))[0]?.url
              : undefined) ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          shorts.push({
            videoId,
            title,
            publishedAt: "",
            thumbnailUrl: thumb,
            watchUrl: `https://www.youtube.com/shorts/${videoId}`,
            viewCount,
          });
        }
      }
    }
    for (const k of Object.keys(rec)) walk(rec[k]);
  }
  walk(data);
  return shorts.slice(0, MAX_SHORTS);
}

function parseHtmlTab(html: string, kind: "videos" | "shorts"): YoutubeFeedVideo[] {
  const jsonStr = extractYtInitialDataJson(html);
  if (!jsonStr) return [];
  try {
    const data = JSON.parse(jsonStr);
    return kind === "videos" ? parseLongFormFromYtData(data) : parseShortsFromYtData(data);
  } catch {
    return [];
  }
}

const CHANNEL_PAGE_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
} as const;

function channelHandlePath(): string {
  return youtubeChannel.handle.startsWith("@")
    ? youtubeChannel.handle.slice(1)
    : youtubeChannel.handle;
}

async function fetchScrapedLongAndShorts(): Promise<{ longForm: YoutubeFeedVideo[]; shorts: YoutubeFeedVideo[] } | null> {
  const h = channelHandlePath();
  try {
    const [videosRes, shortsRes] = await Promise.all([
      fetch(`https://www.youtube.com/@${h}/videos`, {
        headers: CHANNEL_PAGE_HEADERS,
        cache: "no-store",
        signal: AbortSignal.timeout(15_000),
      }),
      fetch(`https://www.youtube.com/@${h}/shorts`, {
        headers: CHANNEL_PAGE_HEADERS,
        cache: "no-store",
        signal: AbortSignal.timeout(15_000),
      }),
    ]);
    const longForm = videosRes.ok ? parseHtmlTab(await videosRes.text(), "videos") : [];
    const shorts = shortsRes.ok ? parseHtmlTab(await shortsRes.text(), "shorts") : [];
    if (longForm.length === 0 && shorts.length === 0) return null;
    return { longForm, shorts };
  } catch {
    return null;
  }
}

async function fetchShortsTabHtmlOnly(): Promise<YoutubeFeedVideo[]> {
  const h = channelHandlePath();
  try {
    const res = await fetch(`https://www.youtube.com/@${h}/shorts`, {
      headers: CHANNEL_PAGE_HEADERS,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return [];
    return parseHtmlTab(await res.text(), "shorts");
  } catch {
    return [];
  }
}

function mergeGallery(longForm: YoutubeFeedVideo[], shorts: YoutubeFeedVideo[]): YoutubeFeedVideo[] {
  const longTagged = longForm.slice(0, MAX_LONG_FORM).map((v) => ({
    ...v,
    isShort: false as const,
    watchUrl: v.watchUrl.startsWith("http") ? v.watchUrl : `https://www.youtube.com/watch?v=${v.videoId}`,
  }));
  const seen = new Set(longTagged.map((v) => v.videoId));
  const shortTagged = shorts.slice(0, MAX_SHORTS).map((v) => ({
    ...v,
    isShort: true as const,
    watchUrl: `https://www.youtube.com/shorts/${v.videoId}`,
  }));
  const uniqueShorts = shortTagged.filter((s) => !seen.has(s.videoId));
  return [...longTagged, ...uniqueShorts];
}

async function fetchGalleryViaDataApi(apiKey: string): Promise<YoutubeFeedVideo[] | null> {
  const [longForm, shorts] = await Promise.all([
    fetchLongFormViaDataApi(apiKey),
    fetchShortsViaSearchApi(apiKey),
  ]);
  const longArr = longForm ?? [];
  const shortArr = shorts ?? [];
  if (longArr.length === 0 && shortArr.length === 0) return null;
  const merged = mergeGallery(longArr, shortArr);
  return mergeVideoDetailsFromVideosList(apiKey, merged);
}

/**
 * Long-form + Shorts. Data API (if key) → scrape `/videos` + `/shorts` → Atom (+ scrape Shorts).
 * With `YOUTUBE_API_KEY`, a `videos.list` pass adds **ISO publish dates** for Shorts (missing on
 * the public Shorts HTML) and view counts, so **Latest** sort is accurate for both.
 */
export async function getChannelVideos(): Promise<YoutubeFeedVideo[]> {
  let list: YoutubeFeedVideo[] = [];
  let usedPlaylistSearchApi = false;
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (apiKey) {
    const fromApi = await fetchGalleryViaDataApi(apiKey);
    if (fromApi && fromApi.length > 0) {
      list = fromApi;
      usedPlaylistSearchApi = true;
    }
  }

  if (list.length === 0) {
    const scraped = await fetchScrapedLongAndShorts();
    if (scraped) {
      const merged = mergeGallery(scraped.longForm, scraped.shorts);
      if (merged.length > 0) list = merged;
    }
  }

  if (list.length === 0) {
    const fromFeed = await fetchVideosViaAtomFeedWithRetries();
    if (fromFeed && fromFeed.length > 0) {
      const shortsOnly = await fetchShortsTabHtmlOnly();
      list = mergeGallery(fromFeed, shortsOnly);
    }
  }

  if (list.length === 0) return [];

  if (apiKey && !usedPlaylistSearchApi) {
    list = await mergeVideoDetailsFromVideosList(apiKey, list);
  }

  return finalizeYoutubeGalleryVideos(list);
}

/** @deprecated Use `getChannelVideos` — name kept for any older imports. */
export async function getChannelVideosFromFeed(): Promise<YoutubeFeedVideo[]> {
  return getChannelVideos();
}
