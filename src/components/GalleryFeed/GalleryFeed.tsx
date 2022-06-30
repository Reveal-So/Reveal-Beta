import type { FC } from "react";

import { GalleryLayout } from "../GalleryLayout";
import { ProfileHero } from "../ProfileHero";
import { TabsProfiler } from "../TabsProfiler";
import { ProfileFeedScreen } from "../ProfileFeedScreen";


export const GalleryFeed: FC = () => {
   
  return (
    <GalleryLayout>
      <ProfileHero />
      <TabsProfiler />
      {/* contenedorTitulos */}
      <div className=" ">
        <ProfileFeedScreen/>
      </div>
    </GalleryLayout>
  );
};
