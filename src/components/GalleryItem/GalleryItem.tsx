import clsx from "clsx";
import { FC, useContext } from "react";
//import { FC, useEffect, useState } from "react";

import type { GalleryKeys } from "../../types/gallery";
import mirrorimg from "../../images/Group_56.png";
//import mirrorimg from "../../images/Mirror_image.png";
import imgTokens from "../../images/Token_image.png";
import imgDAO from "../../images/DAO_image.png";
import { eliminarPin } from "../../libs/pin";
import UserContext from "../../context/User/UserContext";

export type GalleryItemProps = {
  alt?: string;
  src?: string;
  className?: string;
  type: GalleryKeys;
  value?: string;
  profileAddress?: string;
  index?: number;
  isActive?: any;
  setItems?: any;
  setItemProps?: any;
};

export type GalleryItemLayoutProps = Pick<GalleryItemProps, "className">;

export const GalleryItemLayout: FC<
  GalleryItemLayoutProps & { children: any }
> = ({ children, className }) => {
  return (
    <div
      // shadow-xl rounded-xl scale-110 overflow-hidden
      className={clsx(
        "flex  flex-wrap w-full h-full  select-none square ",
        className
      )}>
      {children}
    </div>
  );
};

export const GalleryItem: FC<GalleryItemProps> = ({
  src,
  alt,
  className,
  type,
  value,
  index,
  isActive,
  setItems,
  setItemProps,
}) => {
  const { address, setPin } = useContext(UserContext);
  //const [bandVisible, setbandVisible] = useState(true);
  // useEffect(()=>{
  // },[]);
  //let bandVisible=true;
  //console.log("isActive",isActive);
  if (type === "mirror") {
    return (
      <GalleryItemLayout
        className={clsx(
          className,
          "justify-center items-center  ",
          "bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-600 rounded-xl bg-gray-200"
        )}>
        {/* {bandVisible? */}
        <div className="relative w-full h-full duration-50 hover:-translate-y-2 bg-white border-solid border-2 border-gray-50  rounded-xl">
          <div className="flex absolute w-full h-full inset-y-0 left-0 items-center pl-0 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
            {src ? (<img className="pointer-events-none" src={src} alt={alt} />) : (<img src={mirrorimg.src} className="w-full h-full rounded-xl" />)}
          </div>
          {isActive != undefined ? (
            <div className="absolute top-0 right-0 pt-0 z-10  ">
              <button
                className="bg-white/50 rounded-md hover:text-white"
                onClick={() => {
                  setPin(index);
                  setItems({ index: null, src: null, value: null, type: null });
                  setItemProps({
                    index: null,
                    src: null,
                    value: null,
                    type: null,
                  });
                  eliminarPin(address, {
                    type: type,
                    index: index ? index : 0,
                    src: src,
                    value: value,
                  });
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule={"evenodd"}
                  />
                </svg>
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="flex absolute w-full  inset-y-0 left-0  sm:pt-5 pointer-events-none text-ellipsis overflow-hidden trucate h-[50px] sm:h-full ">
            <h1 className=" text-lg  font-bold text-center text-white sm:pt-5 w-full text-ellipsis overflow-hidden trucate h-[50px] sd:h-full ">
              {value}
            </h1>
          </div>
        </div>
        {/* :<></>}  */}
      </GalleryItemLayout>
    );
  }

  if (type === "dao") {
    return (
      <GalleryItemLayout
        className={clsx(
          className,
          "justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-xl "
        )}>
        <div className="relative w-full h-full duration-50 hover:-translate-y-2">
          {isActive != undefined ? (
            <div className="absolute top-0 right-0 pt-0 z-10  ">
              <button
                className="bg-white/50 rounded-md hover:text-white"
                onClick={() => {
                  setPin(index);
                  setItems({ index: null, src: null, value: null, type: null });
                  setItemProps({
                    index: null,
                    src: null,
                    value: null,
                    type: null,
                  });
                  eliminarPin(address, {
                    type: type,
                    index: index ? index : 0,
                    src: src,
                    value: value,
                  });
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule={"evenodd"}
                  />
                </svg>
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="flex absolute w-full h-full inset-y-0 left-0 items-center pl-0 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={imgDAO.src} className="w-full h-full rounded-xl" />
          </div>
          <div className="flex absolute w-full h-full inset-y-0 left-0  pt-5 pl-0 pointer-events-none items-center justify-center">
            <h1 className=" text-lg font-bold text-center text-white w-full">
              {value}
            </h1>
          </div>
        </div>
      </GalleryItemLayout>
    );
  }

  if (type === "token") {
    return (
      <GalleryItemLayout
        className={clsx(
          className,
          "justify-center items-center bg-gradient-to-tl from-pink-300 via-purple-300 to-indigo-400 rounded-xl "
        )}>
        <div className="relative w-full h-full duration-50 hover:-translate-y-2">
          {isActive != undefined ? (
            <div className="absolute top-0 right-0 pt-0 z-10  ">
              <button
                className="bg-white/50 rounded-md hover:text-white"
                onClick={() => {
                  setPin(index);
                  setItems({ index: null, src: null, value: null, type: null });
                  setItemProps({
                    index: null,
                    src: null,
                    value: null,
                    type: null,
                  });
                  eliminarPin(address, {
                    type: type,
                    index: index ? index : 0,
                    src: src,
                    value: value,
                  });
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule={"evenodd"}
                  />
                </svg>
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="flex absolute w-full h-full inset-y-0 left-0 items-center pl-0 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={imgTokens.src} className="w-full h-full rounded-xl" />
          </div>
          <div className="flex absolute w-full h-full inset-y-0 left-0  pt-5 pl-0 pointer-events-none items-center justify-center">
            <h1 className="  text-lg font-bold text-center text-white w-full">
              ${value}
            </h1>
          </div>
        </div>
      </GalleryItemLayout>
    );
  }
  //itenTextoElementoitenTextoElemento
  if (type === "poap"||type === "nft") {
     return (
      <GalleryItemLayout
      className={clsx(className, " rounded-xl h-full bg-gray-200")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}

      <div
        className="relative w-full  bg-white duration-50 hover:-translate-y-2 py-2 rounded-xl
      border-solid border-2 border-gray-50">
         {isActive != undefined ? (
          <div className="absolute top-0 right-0 pt-0 z-10  ">
            <button
              className="bg-white/50 rounded-md hover:text-white"
              onClick={() => {
                setPin(index);
                setItems({ index: null, src: null, value: null, type: null });
                setItemProps({
                  index: null,
                  src: null,
                  value: null,
                  type: null,
                });
                eliminarPin(address, {
                  type: type,
                  index: index ? index : 0,
                  src: src,
                  value: value,
                });
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule={"evenodd"}
                />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )} 
        <div className=" mx-4  my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            className=" w-full pointer-events-none relative"
            src={src}
            alt={alt}
          />
        </div>
        <div className="pl-3 pt-1 ">{value}</div>
      </div>
    </GalleryItemLayout>
     );
   }

  return (
    <GalleryItemLayout
      className={clsx(className, " rounded-xl h-full bg-gray-200")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}

      <div
        className="relative w-full  bg-white duration-50 hover:-translate-y-2 py-2 rounded-xl
      border-solid border-2 border-gray-50">
        {/* {isActive != undefined ? (
          <div className="absolute top-0 right-0 pt-0 z-10  ">
            <button
              className="bg-white/50 rounded-md hover:text-white"
              onClick={() => {
                setPin(index);
                setItems({ index: null, src: null, value: null, type: null });
                setItemProps({
                  index: null,
                  src: null,
                  value: null,
                  type: null,
                });
                eliminarPin(address, {
                  type: type,
                  index: index ? index : 0,
                  src: src,
                  value: value,
                });
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule={"evenodd"}
                />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )} */}
        <div className=" mx-4  my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            className=" w-full pointer-events-none relative"
            src={src}
            alt={alt}
          />
        </div>
        <div className="pl-3 pt-1 ">{value}</div>
      </div>
    </GalleryItemLayout>
  );
};
