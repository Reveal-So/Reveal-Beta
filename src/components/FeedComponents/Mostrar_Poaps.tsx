import Link from "next/link";
import { Avatars } from "../UtilComponets/Avatars";
import icoType from "../../images/ico_type.png";
import { difDate } from "../UtilComponets/difDate";
import { Checkens } from "../UtilComponets/Checkens";

export function Mostrar_Poaps({ elem }: { elem: any }) {
  if (elem.type != "poap") return <></>;

  return (
    <>
      <div className="max-w-lg rounded overflow-hidden shadow-lg place-content-center space-y-2 ">
        <div className="flex mb-1 py-4 px-3 ">
          <div className="w-full font-bold-400 h-12 flex ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Avatars address={elem.address} tam={2} icono={""} />
            <span className="pt-4 pl-2">
              <Checkens address={elem.address} />
            </span>
          </div>
          <div className="flex-row-reverse  pt-1 w-1/4 ">
            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img className="w-auto h-11 float-right" src={icoType.src} />
          </div>
        </div>
        <div className="w-full " >
          <a href={elem.eventUrl} target={"_blank"} rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
          {elem.media ? <img src={elem.media} className="w-[75%] mx-auto" /> : ""}
        </a>
        </div>
        

        <div className="px-3 pb-2">
          <div className="flex">
            <div className="w-full">
              <span className="inline-block px-1 py-1 text-lg font-semibold text-gray-900 ">
                Attended:
              </span>
              <br />
              <span className="inline-block px-1 py-1 text-lg font-semibold text-gray-900 ">
                {elem.name}
              </span>
            </div>
            <div className="flex-row-reverse w-[30%]  text-lg font-semibold text-gray-900 text-right ">
              <span className="inline-block px-1 py-1 text-sm font-semibold text-gray-400 ">
                {difDate(elem.receiveDateAt)}
              </span>
              <br />
              <span className="inline-block px-1 py-1 text-sm font-semibold text-gray-400 ">
                {elem.city}
                {elem.city && elem.country ? "," : ""} {elem.country}
              </span>
            </div>
          </div>
          <div className="w-full text-justify">
            <span className="inline-block px-1 py-1 text-sm font-semibold text-gray-400 ">
            {elem.description.length > 200
                  ? elem.description.slice(0, 200) + "..."
                  : elem.description}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
