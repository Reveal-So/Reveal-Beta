import type { FC } from "react";

import { GalleryItem } from "../GalleryItem";
import { GallerySection } from "../GallerySection";
import { usePins } from "../../hooks/usePins";

export const GallerySectionPin: FC = () => {
  const { pins } = usePins();

  if (!pins?.length) {
    return null;
  }

  return (
     <GallerySection defaultOpen type="pin">
        {pins &&
         pins.map((pin, index) => {
           return (
             <GalleryItem
               key={`${index}k`}
               type={pin.type}
               value={pin?.value}
               src={pin?.src}
             />
           );
         })} 
    </GallerySection>
  );
};
