import Link from "next/link";
import { Avatars } from "../UtilComponets/Avatars";
import daoimg from "../../images/Group_53.png";
import { difDate } from "../UtilComponets/difDate";
import { Checkens } from "../UtilComponets/Checkens";

export function Mostrar_DAOs({ elem }: { elem: any }) {
  if (elem.type != "dao") return <></>;

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
          <div className="flex-row-reverse  w-1/4 ">
            {/* <img className="w-14 h-14 float-right" src={icoType2.src} /> */}
          </div>
        </div>
        <div className="w-full " >
{/* eslint-disable-next-line @next/next/no-img-element */}
{elem.media ? (
          <a href={elem.link} rel="noreferrer" target={"_blank"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src={elem.media}
              className="w-[75%] mx-auto h-auto rounded-full"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = daoimg.src;
              }}
            />
          </a>
        ) : (
          <a
            href={elem.link ? elem.link : "#"}
            rel="noreferrer"
            target={"_blank"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={daoimg.src} className="w-[75%] mx-auto h-auto rounded-full" />
          </a>
        )}

        </div>
        

        <div className="px-3 pb-2">
          <div className="flex">
          <div className=" w-full inline text-lg font-semibold text-gray-900  ">
              {elem.entityName}
            </div>
            <div className="flex-row-reverse w-1/4  text-lg font-semibold text-gray-900 text-right">
              <span className="inline-block py-1 text-sm font-semibold text-gray-400 ">
                {difDate(elem.receiveDateAt)}
              </span>
            </div>
          </div>
          <div className="w-full inline-block">
              <span className=" pr-1 py-1 text-sm font-semibold text-gray-400 ">
                Voted for
              </span>
              <span className=" px-1 py-1 text-lg font-semibold text-gray-900  mb-2">
                {elem.answer}
              </span>
              <span className="px-1 py-1 text-sm font-semibold text-gray-400 ">
                on
              </span>
              <span className=" text-lg font-semibold text-gray-900 mb-2">
                {elem.name}
              </span>
          </div>
          
        </div>
      </div>
    </>
  );
}
