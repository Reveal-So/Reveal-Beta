import type { FC } from "react";

import { GalleryLayout } from "../GalleryLayout";
import { ProfileHero } from "../ProfileHero";
import { TabsFeedOnly } from "../TabsFeedOnly";
import { ProfileFeedScreen } from "../ProfileFeedScreen";
import { ProfilePoapScreen } from "../ProfilePoapScreen";


export const GalleryPoap: FC = () => {
   
  return (
    <GalleryLayout>
      <ProfileHero />
      <TabsFeedOnly />
      {/* contenedorTitulos */}
      <div className=" ">
        <ProfilePoapScreen/>
      </div>
    </GalleryLayout>
  );
};
