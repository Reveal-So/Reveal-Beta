import Link from "next/link";
import { Avatars } from "../UtilComponets/Avatars";

import icoType2 from "../../images/ico_type2.png";
import { difDate } from "../UtilComponets/difDate";
import { Checkens } from "../UtilComponets/Checkens";
import { Ckecktypenft } from "../UtilComponets/Ckecktypenft";
import { ConvertUTC } from "../UtilComponets/ConvertUTC";

export function Mostrar_nfts({ elem }: { elem: any }) {
  // console.log("elem",elem);
  if (elem.type != "nft") return <></>;
  // if (elem.typeTransaction == "Airdrop") return <></>;

  return (
    <>
      {/* {elem.id} */}
      <div
        key={elem.id}
        className="max-w-lg rounded overflow-hidden shadow-lg place-content-center space-y-2 ">
        <div className="flex mb-1 py-4 px-3 ">
          <div className="w-full font-bold-400 h-12 flex">
            <Avatars key={elem.id} address={elem.address} tam={2} icono={""} />
            <span className="pt-4 pl-2">
              <Checkens address={elem.address} />
            </span>
          </div>
          <div className="flex-row-reverse pt-1  w-1/4 ">
            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img className="h-11 w-auto float-right" src={icoType2.src} />
          </div>
        </div>
        <div className="w-full " >
          <a
            href={`https://opensea.io/assets/${elem.contract}/${elem.nftId}`}
            target={"_blank"}
            rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={elem.media} className="w-[75%] mx-auto" />
          </a>
        </div>
        <div className="flex px-3 w-[100%]">
        <div className=" w-[100%]">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">
            {Ckecktypenft(elem.typeTransaction)}
          </span>
        </div>

        </div>


        <div className="px-3 pb-2">
          {/* flex-wrap -mb-4 */}
          <div className="flex ">
            <div className="w-[100%] font-black text-base ">
              {elem.collectionContract}
            </div>
            <div className="w-1/4 inline-block text-sm font-semibold text-gray-400  text-right ">
            {ConvertUTC(elem.receiveDateAt)}
            {/* {difDate(elem.receiveDateAt)} */}
           </div>
        </div>
        <div className="flex ">
            <div className="w-[100%] font-black font-normal">
               {elem.name}
            </div>
            <div className="w-[40%] inline-block text-sm font-semibold text-gray-400  text-right">
              {elem.price} ETH
            </div>
        </div>

{/*
          <div className="flex ">
            <div className="w-full text-gray-900 text-justify text-base text-clip overflow-hidden ">
              <span className="">
                {elem.description.length > 200
                  ? elem.description.slice(0, 200) + "..."
                  : elem.description}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
