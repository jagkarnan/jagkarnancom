/**
 * Public channel — used for RSS and outbound links.
 * New videos appear in YouTube’s Atom feed automatically; refresh cadence is
 * `YOUTUBE_FEED_REVALIDATE_SECONDS` in `@/lib/youtubeFeed`.
 */
export const youtubeChannel = {
  /** @see https://www.youtube.com/@jagkarnanai */
  handle: "@jagkarnanai",
  channelUrl: "https://www.youtube.com/@jagkarnanai",
  /** Required for https://www.youtube.com/feeds/videos.xml?channel_id=… */
  channelId: "UCx2OpFlr-UE0n6PTQEAS8Nw",
} as const;
