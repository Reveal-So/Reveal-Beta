import Link from "next/link";
import { Avatars } from "../UtilComponets/Avatars";
import imgflecha from "../../images/flecha.png";
import imgError from "../../images/TokenError.png";
import { difDate } from "../UtilComponets/difDate";
import { Currentdecimal } from "../UtilComponets/Currentdecimal";
import { Checkens } from "../UtilComponets/Checkens";
import { Checkvaltokens } from "../UtilComponets/Checkvaltokens";
import { ConvertUTC } from "../UtilComponets/ConvertUTC";
//import { SuspenseImage } from "../UtilComponets/SuspenseImage";

export function Mostrar_TOKENs({ elem }: { elem: any }) {
  if (elem.type != "token") return <></>;
  if (elem.address == elem.destinationAddress) return <></>;
  if (Currentdecimal(elem.valueUSD) == 0) return <></>;
  
  return (
    <>
      <div className="max-w-lg rounded overflow-hidden shadow-lg place-content-center space-y-2 ">
        <div className="flex mb-1 py-4 px-3 ">
          <div className="w-full font-bold-400 h-12 flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Avatars address={elem.address} tam={2} icono={""} />
            <span className="pt-4 pl-2">
              <Checkens address={elem.address} />
            </span>
          </div>
          <div className="flex-row-reverse  w-2/4 pt-3 text-right">
            <span className=" py-1 text-sm font-semibold text-gray-400 text-left  ">
            {ConvertUTC(elem.receiveDateAt)}
            </span>
          </div>
        </div>
        <div className="px-3 pb-2 flex">
          <div className="flex  w-full">
            <div className="sm:flex w-[70px] sm:w-full mx-0 max-w-[70px] sm:max-w-[170px] ">
              <div className="w-full sm:w-[80px] pt-2 ">
                {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                  src={elem.originLogo}
                  className="h-[40px] w-auto mx-auto px-auto rounded-full "
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = imgError.src;
                  }}
                />
              </div>
              <div className="w-full sm:pl-2">
                <div className="w-full max-w-[70px] sm:max-w-[90px] text-ellipsis overflow-hidden sm:text-left text-center">
                  <span className="inline-block text-lg font-semibold text-gray-900  inline text-ellipsis overflow-hidden"> 
                  {Checkvaltokens(elem.originValue)}
                  </span> 
                </div>
                <div className="w-full sm:text-left text-center">
                  <span className="inline-block text-lg font-normal text-gray-900  inline text-ellipsis overflow-hidden">
                  {elem.originCurrency?.length > 11
                  ? elem.originCurrency.slice(0, 11) + "..."
                  : elem.originCurrency}
                    {/* {elem.originCurrency} */}
                  </span>
                </div>
              </div>
            </div>
            <div className=" pt-5  ">
              <svg fill="currentColor" viewBox="0 0 16 16" className="h-6 w-6 "  aria-hidden="true">
              <path
              fillRule="evenodd"
              d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z"
              clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z"
                clipRule="evenodd"
              />
              </svg>
            </div>
            <div className="w-[70px] sm:w-full sm:flex mx-0 max-w-[70px] sm:max-w-[170px]  m-0 sm:pl-5 ">
            <div className="w-full sm:w-[80px] pt-2 ">
                {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                  src={elem.destinationLogo}
                  className="h-[40px] w-auto sm:px-0 mx-auto px-auto sm:mx-0 rounded-full sm:inline"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = imgError.src;
                  }}
                />
              </div>
              <div className="w-full sm:pl-2  ">
                <div className="space-x-reverse w-full max-w-[70px] sm:max-w-[90px] text-ellipsis overflow-hidden sm:text-left text-center">
                 <span className="inline-block  text-lg font-semibold text-gray-900 inline text-ellipsis overflow-hidden ">
                 {Checkvaltokens(elem.destinationValue)}
                </span> 
                </div>
                <div className="w-full sm:text-left text-center ">
                  <span className="inline-block text-lg font-normal text-gray-900 inline text-ellipsis overflow-hidden">
                  {elem.destinationCurrency?.length > 11
                  ? elem.destinationCurrency.slice(0, 11) + "..."
                  : elem.destinationCurrency}
                    {/* {elem.destinationCurrency} */}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[50%] pt-2">
            <div className=" text-right">
            <a target={"_blank"} rel="noreferrer"
             href={`https://etherscan.io/tx/${elem.tokenId}`} className="text-gray-400 hover:text-gray-500">
              <span className="inline-block px-1 py-1 text-lg font-semibold text-gray-900 inline underline ">
                ${Currentdecimal(elem.valueUSD)} Trade
              </span> 
            </a>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
