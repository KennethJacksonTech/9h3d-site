/**
 * YouTube Data API v3 — public playlist reader.
 *
 * Fetched CLIENT-SIDE (the site is `output: "export"`) so new videos in the
 * ministry playlist appear with no rebuild — same live pattern as the gallery
 * and blog. Uses a referrer-restricted public-data API key (NEXT_PUBLIC_*),
 * NOT the Gonzo YouTube OAuth (that credential is for publishing). The key is
 * read from the environment and never hardcoded.
 */

export const YOUTUBE_PLAYLIST_ID = "PL8J3jVD4QD409YYyLV8eEGccX7q2XNsyE";

const PLAYLIST_ITEMS_URL =
  "https://www.googleapis.com/youtube/v3/playlistItems";
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export interface PlaylistVideo {
  videoId: string;
  title: string;
  /** Opens the video in playlist context. */
  watchUrl: string;
}

interface YouTubePlaylistItem {
  snippet?: {
    title?: string;
    resourceId?: { videoId?: string };
  };
}

interface YouTubeResponse {
  items?: YouTubePlaylistItem[];
  nextPageToken?: string;
}

/** YouTube's placeholder titles for items that are no longer viewable. */
const SKIP_TITLES = new Set(["Private video", "Deleted video"]);

/**
 * Fetch every video in the ministry playlist, following `nextPageToken` until
 * exhausted (playlists can exceed the 50-item page limit). Private/deleted
 * items and any item missing a videoId are skipped. Throws if the API key is
 * absent or the API rejects the request — callers should surface a friendly
 * error state rather than crash.
 */
export async function fetchPlaylistVideos(): Promise<PlaylistVideo[]> {
  if (!API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_YOUTUBE_API_KEY");
  }

  const videos: PlaylistVideo[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      part: "snippet",
      maxResults: "50",
      playlistId: YOUTUBE_PLAYLIST_ID,
      key: API_KEY,
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(`${PLAYLIST_ITEMS_URL}?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`YouTube API error (${res.status})`);
    }
    const data: YouTubeResponse = await res.json();

    for (const item of data.items ?? []) {
      const title = item.snippet?.title ?? "";
      const videoId = item.snippet?.resourceId?.videoId;
      if (!videoId || SKIP_TITLES.has(title)) continue;
      videos.push({
        videoId,
        title,
        watchUrl: `https://www.youtube.com/watch?v=${videoId}&list=${YOUTUBE_PLAYLIST_ID}`,
      });
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return videos;
}

/** maxres thumbnail; components should onError-fall back to hqResThumbnail(). */
export function maxResThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/** Always-present fallback thumbnail (every public video has hqdefault). */
export function hqResThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
