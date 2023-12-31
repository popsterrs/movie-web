import { SimpleCache } from "@/utils/cache";
import { MediaItem } from "@/utils/mediaTypes";

import {
  formatTMDBMetaToMediaItem,
  formatTMDBSearchResult,
  getTrending,
} from "./tmdb";
import { MWQuery } from "./types/mw";

const cache = new SimpleCache<MWQuery, MediaItem[]>();
cache.setCompare((a, b) => {
  return a.searchQuery.trim() === b.searchQuery.trim();
});
cache.initialize();

export async function getTrendingMedia(): Promise<MediaItem[]> {
  const data = await getTrending();
  const results = data.map((v) => {
    const formattedResult = formatTMDBSearchResult(v, v.media_type);
    return formatTMDBMetaToMediaItem(formattedResult);
  });

  return results;
}
