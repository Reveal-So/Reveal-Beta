import Link from "next/link";
import { Avatars } from "../UtilComponets/Avatars";
import mirrorimg from "../../images/Group_55.png";
import { difDate } from "../UtilComponets/difDate";
import { Checkens } from "../UtilComponets/Checkens";

export function Mostrar_Mirrors({ elem }: { elem: any }) {
  if (elem.type != "mirror") return <></>;

  return (
    <>
      <div className="max-w-lg rounded overflow-hidden shadow-lg place-content-center space-y-2 ">
        <div className="flex mb-1 py-4 px-3 ">
          <div className="w-full font-bold-400 h-12 flex ">
            {/* {icoProfile.src} */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Avatars address={elem.address} tam={2} icono={""} />
            <span className="pt-4 pl-2">
              <Checkens address={elem.address} />
            </span>
          </div>
          <div className="flex-row-reverse  w-1/4 "></div>
        </div>
        <a
          href={`https://mirror.xyz/${elem.address}/${elem.mirrorId}`}
          target={"_blank"}
          rel="noreferrer">
          <div className="relative w-full h-[400px]  px-5">
            <div className="flex absolute w-full h-full inset-y-0 left-0 items-center  pointer-events-none px-auto bg-[#007AFF]">
              {/* {elem.media ? (
                  <img
                    className="pointer-events-none"
                    src={elem.media}
                    alt={elem.name}
                  />
                ) : (
                  
                )} */}
              {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                src={mirrorimg.src}
                className="w-auto h-full px-auto mx-auto"
              />
            </div>
            <div className="flex absolute w-full h-full inset-y-0 left-0 px-5  pt-10 pointer-events-none ">
              <h1 className="itenTextoElemento text-xl md:text-3xl font-bold text-center text-white pt-5 w-full">
                {elem.name}
              </h1>
            </div>
          </div>
        </a>
        <div className="px-3 pb-2">
          <div className="flex">
            <div className="w-full">
              <span className="inline-block px-1 py-1 text-lg font-semibold text-gray-900 ">
                Wrote:
              </span>
              <br />
              <span className="inline-block px-1 py-1 text-lg font-semibold text-gray-900 ">
                {elem.name}
              </span>
            </div>
            <div className="flex-row-reverse w-1/4 text-right  ">
              <span className="inline-block px-1 py-1 text-sm font-semibold text-gray-400 ">
                {difDate(elem.receiveDateAt)}
              </span>
              <br />
              <span className="inline-block px-1 py-1 text-lg font-semibold text-gray-400 ">
                {elem.contadorMirror} Mirror
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
