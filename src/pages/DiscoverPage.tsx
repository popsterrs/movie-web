import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { WideContainer } from "@/components/layout/WideContainer";
import { Title } from "@/components/text/Title";
import { DiscoverLoadingPart } from "@/pages/parts/discover/DiscoverLoadingPart";
import { MediaGrid } from "@/components/media/MediaGrid";
import { WatchedMediaCard } from "@/components/media/WatchedMediaCard";
import { t } from "i18next";
import { SubPageLayout } from "./layouts/SubPageLayout";
import { getTrending } from "@/backend/metadata/tmdb";
import {
  TMDBMovieSearchResult,
  TMDBShowSearchResult,
} from "@/backend/metadata/types/tmdb";


export function DiscoverPage() {
  const [trendingData, setTrendingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrending();
        setTrendingData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts


  return (
    <SubPageLayout>
      <div className="mb-16 sm:mb-24">
        <Helmet>
          <title>Discover</title>
        </Helmet>
        </div>

        <WideContainer>
          <Title>{t("discover.title")}</Title>

          <DiscoverLoadingPart/>

          <p>
            {JSON.stringify(trendingData)}
          </p>
          {/* <MediaGrid>
            {results.map((v) => (
              <WatchedMediaCard key={v.id.toString()} media={v} />
            ))}
          </MediaGrid> */}
        </WideContainer>
    </SubPageLayout>
  );
}
