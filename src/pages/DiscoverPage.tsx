import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { WideContainer } from "@/components/layout/WideContainer";
import { Title } from "@/components/text/Title";
import { DiscoverLoadingPart } from "@/pages/parts/discover/DiscoverLoadingPart";
import { MediaGrid } from "@/components/media/MediaGrid";
import { WatchedMediaCard } from "@/components/media/WatchedMediaCard";
import { t } from "i18next";
import { SubPageLayout } from "./layouts/SubPageLayout";

export function DiscoverPage() {
  const [showBg, setShowBg] = useState<boolean>(true);

  return (
    <SubPageLayout>
      <div className="mb-16 sm:mb-24">
        <Helmet>
          <title>Discover</title>
        </Helmet>
        </div>

        <WideContainer>
          <Title>{t("discover.title")}</Title>

          <p>
            
          </p>

          <DiscoverLoadingPart/>
          {/* <MediaGrid>
            {results.map((v) => (
              <WatchedMediaCard key={v.id.toString()} media={v} />
            ))}
          </MediaGrid> */}
        </WideContainer>
    </SubPageLayout>
  );
}
