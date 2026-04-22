import { NextResponse } from "next/server";
import { getChannelVideosPage } from "@/lib/youtubeFeed";
import type { YoutubeSortMode } from "@/lib/youtubeVideoMeta";

const PAGE_SIZE_DEFAULT = 10;
const PAGE_SIZE_MAX = 50;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = Math.max(0, parseInt(searchParams.get("offset") ?? "0", 10) || 0);
  const rawLimit = parseInt(searchParams.get("limit") ?? String(PAGE_SIZE_DEFAULT), 10) || PAGE_SIZE_DEFAULT;
  const limit = Math.min(PAGE_SIZE_MAX, Math.max(1, rawLimit));
  const sortParam = searchParams.get("sort");
  const sort: YoutubeSortMode = sortParam === "popular" ? "popular" : "latest";

  try {
    const page = await getChannelVideosPage(offset, limit, sort);
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Failed to load videos" }, { status: 500 });
  }
}
