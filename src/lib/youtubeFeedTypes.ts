export type YoutubeFeedVideo = {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnailUrl: string;
  watchUrl: string;
  /** YouTube Short (vertical); links use `/shorts/…` when possible */
  isShort?: boolean;
  /** Epoch ms for sorting (latest first) */
  sortPublishedMs?: number;
  /** For popular sort */
  viewCount?: number;
};
