import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAsyncFn } from "react-use";

import { WideContainer } from "@/components/layout/WideContainer";
import { Title } from "@/components/text/Title";
import { DiscoverLoadingPart } from "@/pages/parts/discover/DiscoverLoadingPart";
import { MediaGrid } from "@/components/media/MediaGrid";
import { WatchedMediaCard } from "@/components/media/WatchedMediaCard";
import { t } from "i18next";
import { SubPageLayout } from "./layouts/SubPageLayout";
import { getTrendingMedia } from "@/backend/metadata/discover";
import {
  TMDBMovieSearchResult,
  TMDBShowSearchResult,
} from "@/backend/metadata/types/tmdb";
import { MediaItem } from "@/utils/mediaTypes";


interface TrendingViewProps {
  state: {
    loading: boolean;
  };
  trendingData: MediaItem[]; 
}

function TrendingView({ state, trendingData }: TrendingViewProps) {
  if (state.loading) {
    return <DiscoverLoadingPart />;
  } else {
    return (
      <div className="mt-8">
        {/* <p>{JSON.stringify(trendingData)}</p> */}

        <MediaGrid>
            {trendingData.map((v) => (
              <WatchedMediaCard key={v.id.toString()} media={v} />
            ))}
          </MediaGrid>
      </div>
    );
  }
}

export function DiscoverPage() {
  const [trendingResults, setTrendingResults] = useState<MediaItem[]>([]);
  const [state, exec] = useAsyncFn(() => getTrendingMedia());

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

        <TrendingView state={state} trendingData={trendingResults} />

        {/* <MediaGrid>
          {trendingResults.map((v) => (
            <WatchedMediaCard key={v.id.toString()} media={v} />
          ))}
        </MediaGrid> */}
      </WideContainer>
    </SubPageLayout>
  );
}
