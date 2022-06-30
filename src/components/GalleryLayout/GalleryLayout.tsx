import type { FC } from "react";

export const GalleryLayout= ( props :any) => {
  return <div className="flex flex-col bg-white">{props.children}</div>;
};
  