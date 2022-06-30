import type { FC } from "react";
import type { DragSourceMonitor } from "react-dnd";
import { useDrag } from "react-dnd";

import type { GalleryItemProps } from "../GalleryItem";
import { GalleryItem } from "../GalleryItem";

export const GalleryEditItem: FC<GalleryItemProps> = ({ ...props }) => {
  const [{ opacity }, drag] = useDrag(() => {
    
    return {
      item: props,
      type: "box",
      collect: (monitor: DragSourceMonitor) => {
       // console.log("monitor.isDragging()",monitor.isDragging());
        if (monitor.isDragging()){ window.scrollTo(0, 0);}
        return {
          opacity: monitor.isDragging() ? 10 : 100,
        };
      },
    };
  }, [props]);

  return (
    <div
      ref={drag}
      className={`p-3 border-4 cursor-pointer  border-cyan-500 border-dotted opacity-${opacity}`}
    >
      <GalleryItem {...props} />
    </div>
  );
};
