import { FC, useState } from "react";

import { Empty } from "../Empty";
import { GalleryEditItem } from "../GalleryEditItem";
import { GalleryItem } from "../GalleryItem";
import { GallerySection } from "../GallerySection";
import { useTokens } from "../../hooks/useTokens";
import { PlusSmIcon } from "@heroicons/react/solid";

export type GallerySectionTokenProps = {
  editable?: boolean;
};

export const GallerySectionToken: FC<GallerySectionTokenProps> = ({
  editable = false,
}) => {
  const { tokens } = useTokens();

  const [band, setband] = useState(false);
  //console.log("assets",assets)
    return (
      <>
      <div className="py-2 sm:py-3 md:py-4 px-1 sm:px-3 md:px-4 mx-auto w-full max-w-5xl ">
      <button
      onClick={()=>{setband(band=>!band);}}
                  className=" flex justify-between items-center py-2 px-4 w-full text-sm font-medium
                 text-left hover:bg-gray-200 rounded-lg focus-visible:ring focus-visible:ring-gray-500 
                 focus-visible:ring-opacity-75 duration-300 hover:scale-105 focus:outline-none"
                >
                   <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center pl-[65px]" aria-hidden="true">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex items-center justify-between">
                      <span className="pr-3 text-lg font-medium text-gray-900">Token</span>
                      <span
                        className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <PlusSmIcon className="-ml-1 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {/*- <span>Button text</span> */}
                      </span>
                    </div>
                  </div>
                  {/* <span className="profileTitulos ">
                    &ensp;2151
                  </span> */}
                </button>
        <div className=" text-sm text-gray-500 ">
        <div className="grid ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 py-2 w-full ">
        {!tokens?.length && <Empty />}
        {tokens &&
        tokens.map((token, index) => {
            //console.log("index",index);
            if (index<4){
              if (editable) {
                return (
                  <GalleryEditItem
                    key={index}
                    type="token"
                    value={token.tokenInfo.symbol}
                  />
                );
              }
              return (
                <GalleryItem
                  key={index}
                  type="token"
                  value={token.tokenInfo.symbol}
                />
              );
            }else{
              if (band){
                if (editable) {
                  return (
                    <GalleryEditItem
                      key={index}
                      type="token"
                      value={token.tokenInfo.symbol}
                    />
                  );
                }
                return (
                  <GalleryItem
                    key={index}
                    type="token"
                    value={token.tokenInfo.symbol}
                  />
                );
              }
            }
          })}
        </div>
      </div>
      </div>
      </div>
      </>);

  // return (
  //   <GallerySection type="token">
  //     {!tokens?.length && <Empty />}
  //     {tokens &&
  //       tokens.map((token, index) => {
  //         if (editable) {
  //           return (
  //             <GalleryEditItem
  //               key={index}
  //               type="token"
  //               value={token.tokenInfo.symbol}
  //             />
  //           );
  //         }
  //         return (
  //           <GalleryItem
  //             key={index}
  //             type="token"
  //             value={token.tokenInfo.symbol}
  //           />
  //         );
  //       })}
  //   </GallerySection>
  // );
};
