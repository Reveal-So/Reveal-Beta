import type { FC } from "react";

import { GalleryLayout } from "../GalleryLayout";
import { GallerySectionMirror } from "../GallerySectionMirror";
import { GallerySectionNFT } from "../GallerySectionNFT";
import { GallerySectionPin } from "../GallerySectionPin";
import { GallerySectionPoap } from "../GallerySectionPoap";
import { GallerySectionSnapshot } from "../GallerySectionSnapshot";
import { GallerySectionToken } from "../GallerySectionToken";
import { ProfileHero } from "../ProfileHero";
import { TabsProfiler } from "../TabsProfiler";

export const Gallery = () => {
  return (
    <>
      <GalleryLayout>
         <ProfileHero />
        <TabsProfiler />
        <div className="contenedorTitulos ">
          <GallerySectionPin /> 
        <GallerySectionNFT />
        <GallerySectionPoap />
        <GallerySectionSnapshot />
        <GallerySectionMirror />
        <GallerySectionToken />
          
          
        </div>
      </GalleryLayout>
    </>
  );
};
