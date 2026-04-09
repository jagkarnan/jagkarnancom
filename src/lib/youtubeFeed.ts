import { youtubeChannel } from "@/content/youtubeChannel";

export type YoutubeFeedVideo = {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
  watchUrl: string;
};

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function parseYoutubeAtomFeed(xml: string): YoutubeFeedVideo[] {
  const videos: YoutubeFeedVideo[] = [];
  const parts = xml.split("<entry>");
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i].split("</entry>")[0] ?? "";
    const videoId = chunk.match(/<yt:videoId>([^<]*)<\/yt:videoId>/)?.[1]?.trim();
    const titleRaw = chunk.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
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
      thumbnailUrl: thumb ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      watchUrl: link ?? `https://www.youtube.com/watch?v=${videoId}`,
    });
  }
  return videos;
}

/**
 * Next.js cache for the RSS `fetch`. YouTube’s channel Atom feed includes new uploads
 * when they go live; this controls how soon the site picks them up.
 *
 * **Sync:** `src/app/youtube-videos/page.tsx` must set `export const revalidate` to the
 * same number (Next only allows a literal there).
 */
export const YOUTUBE_FEED_REVALIDATE_SECONDS = 300;

/**
 * Latest uploads from the channel Atom feed (typically up to 15 entries).
 * Fails soft so static builds still succeed if the network is unavailable.
 */
export async function getChannelVideosFromFeed(): Promise<YoutubeFeedVideo[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannel.channelId}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "jagkarnan.com/1.0 (channel gallery RSS)",
        Accept: "application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      next: { revalidate: YOUTUBE_FEED_REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseYoutubeAtomFeed(xml);
  } catch {
    return [];
  }
}
