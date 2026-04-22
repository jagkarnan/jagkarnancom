/**
 * Public channel — used for RSS, Data API, HTML scrape, and outbound links.
 * Video list (`@/lib/youtubeFeed`): prefers `YOUTUBE_API_KEY`, then Atom feed, then
 * parsing the public `/videos` tab (`ytInitialData`) when RSS is blocked. Shorts HTML has no
 * reliable upload date; with `YOUTUBE_API_KEY`, `videos.list` fills ISO dates for sorting.
 */
export const youtubeChannel = {
  /** @see https://www.youtube.com/@jagkarnanai */
  handle: "@jagkarnanai",
  channelUrl: "https://www.youtube.com/@jagkarnanai",
  /** Required for https://www.youtube.com/feeds/videos.xml?channel_id=… */
  channelId: "UCx2OpFlr-UE0n6PTQEAS8Nw",
} as const;
