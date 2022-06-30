import type { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GalleryLayout } from "../GalleryLayout";
import { GallerySectionDrop } from "../GallerySectionDrop";
import { GallerySectionMirror } from "../GallerySectionMirror";
import { GallerySectionNFT } from "../GallerySectionNFT";
import { GallerySectionPoap } from "../GallerySectionPoap";
import { GallerySectionSnapshot } from "../GallerySectionSnapshot";
import { GallerySectionToken } from "../GallerySectionToken";
import { ProfileHero } from "../ProfileHero";
import { TabsProfiler } from "../TabsProfiler";

export const GalleryEdit: FC = () => {
  let DireccionWallet="";
  return (
    <GalleryLayout>
      <DndProvider backend={HTML5Backend}>
        <ProfileHero />
        <TabsProfiler href={'/profile'} />
        <div className="contenedorTitulos ">
          <GallerySectionDrop />
          <GallerySectionNFT editable />
          <GallerySectionPoap editable />
          <GallerySectionSnapshot editable />
          <GallerySectionMirror editable />
          <GallerySectionToken editable />
        </div>
      </DndProvider>
    </GalleryLayout>
  );
};
