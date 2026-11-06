import { YOUTUBE_PLAYLIST_ID, type PlaylistVideo } from "./youtube";

/** Thumbnails under the player. The player itself is the one video ahead of these. */
export const PREVIOUS_GRID_COUNT = 9;

/**
 * Newest ten episodes on The Karen Wolfram Project playlist, in playlist order,
 * captured 2026-11-06. Used only when the public YouTube key is missing or the
 * API rejects the request, so the page still has a real grid. A successful
 * playlist fetch replaces this list.
 */
export const KAREN_WOLFRAM_RECENT: PlaylistVideo[] = [
  ["O50d_WHjBto", "Gratitude Show Love - 9th Hour, 3rd Day Ministries - Episode 73"],
  ["3-SZkomWwJo", "Pick and Choose - 9th Hour, 3rd Day Ministries - Episode 72"],
  ["1f018-26ABY", "9th Hour, 3rd Day Ministries - Episode 71: Roadmap"],
  ["k4QAOOjb7d8", "9th Hour 3rd Day Ministries - Episode 70: Fixed Heart"],
  ["Qz3D0GF3h4E", "9th Hour 3rd Day Ministries - Gods Our Savior - Episode 69"],
  ["-uA4-549KjA", "April - 9th Hour 3rd Day Ministries - Renew The Mind - Episode 68"],
  ["klFSD6KSaQE", "9th Hour 3rd Day Ministries - Salvation - Episode 66"],
  ["gETPNLzdSlI", "9th Hour 3rd Day Ministries - First Adam Second Adam - Episode 65"],
  ["SaprsJ2mTQY", "Karen Wolfram Project - Unfailing Love - Episode 63"],
  ["ziJtH7a5mrc", "Karen Wolfram Project - No Deceit - Episode 62"],
].map(([videoId, title]) => ({
  videoId,
  title,
  watchUrl: `https://www.youtube.com/watch?v=${videoId}&list=${YOUTUBE_PLAYLIST_ID}`,
}));

/** Player plus the previous-video grid: the first video, then up to nine more. */
export function takeDeck(
  videos: PlaylistVideo[],
  gridCount = PREVIOUS_GRID_COUNT,
): PlaylistVideo[] {
  return videos.slice(0, gridCount + 1);
}

/**
 * Exchange the player (index 0) with a previous-video cell.
 * `gridIndex` is the index within the grid, not the full deck.
 */
export function swapFeatured(
  deck: PlaylistVideo[],
  gridIndex: number,
): PlaylistVideo[] {
  const target = gridIndex + 1;
  if (target <= 0 || target >= deck.length) return deck;
  const next = deck.slice();
  const featured = next[0];
  next[0] = next[target];
  next[target] = featured;
  return next;
}

/** Poster embed. Autoplay trips YouTube's bot wall and leaves a blank player. */
export function embedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0`;
}
