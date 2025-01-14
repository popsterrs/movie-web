import { t } from "i18next";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroller";
import { useAsyncFn } from "react-use";

import { getTrendingMedia } from "@/backend/metadata/discover";
import {
  TMDBMovieSearchResult,
  TMDBShowSearchResult,
} from "@/backend/metadata/types/tmdb";
import { WideContainer } from "@/components/layout/WideContainer";
import { MediaGrid } from "@/components/media/MediaGrid";
import { WatchedMediaCard } from "@/components/media/WatchedMediaCard";
import { Title } from "@/components/text/Title";
import { DiscoverLoadingPart } from "@/pages/parts/discover/DiscoverLoadingPart";
import { MediaItem } from "@/utils/mediaTypes";

import { SubPageLayout } from "./layouts/SubPageLayout";

interface TrendingViewProps {
  state: {
    loading: boolean;
  };
  trendingData: MediaItem[];
  loadMore: () => void;
  hasMore: boolean;
}

function TrendingView({
  state,
  trendingData,
  loadMore,
  hasMore,
}: TrendingViewProps) {
  if (state.loading) {
    return <DiscoverLoadingPart />;
  }
  return (
    <div className="mt-8">
      <MediaGrid>
        {trendingData.map((v) => (
          <WatchedMediaCard key={v.id.toString()} media={v} />
        ))}
      </MediaGrid>

      <InfiniteScroll
        pageStart={2}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<DiscoverLoadingPart />}
      />
    </div>
  );
}

export function DiscoverPage() {
  const [trendingResults, setTrendingResults] = useState<MediaItem[]>([]);
  const [state, exec] = useAsyncFn(() => getTrendingMedia(1));
  const [hasMore, setHasMore] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const loadMore = async () => {
    try {
      const additionalResults = await getTrendingMedia(currentPageNumber + 1);
      if (additionalResults && additionalResults.length > 0) {
        setTrendingResults((prevResults) => [
          ...prevResults,
          ...additionalResults,
        ]);
        setCurrentPageNumber((prevPageNumber) => prevPageNumber + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function runSearch() {
      try {
        const searchResults = await exec();
        if (searchResults) {
          setTrendingResults(searchResults);
        }
      } catch (error) {
        console.error(error);
      }
    }

    runSearch();
  }, [exec]);

  return (
    <SubPageLayout>
      <div className="mb-16 sm:mb-24">
        <Helmet>
          <title>Discover</title>
        </Helmet>
      </div>

      <WideContainer>
        <Title>{t("discover.title")}</Title>

        <TrendingView
          state={state}
          trendingData={trendingResults}
          loadMore={loadMore}
          hasMore={hasMore}
        />
      </WideContainer>
    </SubPageLayout>
  );
}
