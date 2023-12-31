import { MediaItem } from "@/utils/mediaTypes";

import {
  formatTMDBMetaToMediaItem,
  formatTMDBSearchResult,
  getTrending,
} from "./tmdb";

export async function getTrendingMedia(): Promise<MediaItem[]> {
  const data = await getTrending(1);
  const results = data.map((v) => {
    const formattedResult = formatTMDBSearchResult(v, v.media_type);
    return formatTMDBMetaToMediaItem(formattedResult);
  });

  return results;
}
