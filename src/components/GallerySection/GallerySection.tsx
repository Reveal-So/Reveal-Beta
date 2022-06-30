import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import type { FC } from "react";
import { PlusSmIcon } from '@heroicons/react/solid'


import type { GalleryKeys } from "../../types/gallery";

export type GallerySectionKeys = GalleryKeys | "pin";

type Section = Record<GallerySectionKeys, { name: string; emoji: string }>;

export type GallerySectionProps = {
  defaultOpen?: boolean;
  type: GallerySectionKeys;
};

const sections: Section = {
  nft: {
    name: "NFT",
    emoji: "🎨",
  },
  poap: {
    name: "POAP",
    emoji: "📍",
  },
  pin: {
    name: "Pinned",
    emoji: "🏆",
  },
  token: {
    name: "Tokens",
    emoji: "🤑",
  },
  dao: {
    name: "DAO",
    emoji: "🕍",
  },
  mirror: {
    name: "Mirror",
    emoji: "📝",
  },
};

export const GallerySectionLayout = ( props:any ) => {
  return (
    <div className="grid">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 py-3 w-full">
        {props.children}
      </div>
    </div>
  );
};

//: FC<GallerySectionProps>

export const GallerySection = (props:any) => {
  // console.log("children",children);
  // let clon=children;
  // if (clon[1]){
  //   console.log("clon",clon);
  //   if (clon[1].lenght>3){
  //     console.log(" pos 1",clon[1]);
  //   }
  // }

  // {
  //   children,
  //   type,
  //   defaultOpen = false,
  // }
  
  return (
    <div className="py-2 sm:py-3 md:py-4 px-1 sm:px-3 md:px-4 mx-auto w-full max-w-5xl ">
      <Disclosure defaultOpen={props.defaultOpen}>
        {({ open }) => {
          //contendorProfileTitulos
          return (
            <>
              <Disclosure.Button
                className=" flex justify-between items-center py-2 px-4 w-full text-sm font-medium
               text-left hover:bg-gray-200 rounded-lg focus-visible:ring focus-visible:ring-gray-500 
               focus-visible:ring-opacity-75 duration-300 hover:scale-105 focus:outline-none"
              >
                 <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center pl-[65px]" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex items-center justify-between">
                    <span className="pr-3 text-lg font-medium text-gray-900">{sections[props.type].name}</span>
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
              </Disclosure.Button>
              <Disclosure.Panel className=" text-sm text-gray-500 ">
                <GallerySectionLayout>{props.children}</GallerySectionLayout>
              </Disclosure.Panel>
            </>
          );
        }}
      </Disclosure>
    </div>
  );
};
