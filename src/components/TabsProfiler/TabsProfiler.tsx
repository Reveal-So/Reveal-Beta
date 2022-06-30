import { FC, useContext, useMemo, useState } from "react";
import {
  ChartSquareBarIcon,
  OfficeBuildingIcon,
  UserIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
// import { conectadoProfileAtom, consultarProfileAtom } from "../../atoms/profileAddress";
import { classNames } from "../UtilComponets/className";
import UserContext from "../../context/User/UserContext";
import ProfileContext from "../../context/Profile/ProfileContext";

// {
//   name: "Activity",
//   href: "/profile/active",
//   icon: ChartSquareBarIcon,
//   current: false,
// },
const tabs = [
  { name: "Profile", href: "profile", icon: UserCircleIcon, current: false },
  { name: "Feed", href: "feed", icon: UsersIcon, current: true },
];


export const TabsProfiler = (props:any) => {
  const {
    address,
  } = useContext(UserContext);
  const {
    addressConsulta,
    ensConsulta,
  } = useContext(ProfileContext);

  let band = false;
  const { asPath } = useRouter();
  const [profileConectado, setProfileConectado] =useState<any>();
  const urlWallet = useMemo(() => {
    return asPath.startsWith("/profile")
      ? "profile"
      : !addressConsulta
      ? asPath
      : ensConsulta ?? addressConsulta;
  }, [asPath, addressConsulta, ensConsulta]);

  if (asPath.startsWith("/profile")&&!address) return <></>;
  //if (!asPath.startsWith("/profile")&&!profile) return <></>;
   
  tabs.map(el => {
    //if (!asPath.startsWith("profile"))
    band=el.current=asPath.endsWith(el.href);
    //asPath.endsWith(el.href)&&();

    //console.log(asPath.endsWith(el.href));
    // if (el.href == props.href) {
    //   el.current = true;
    //   band = true;
    // } else {
    //    = false;
    // }
  });
  if(!band) tabs[0].current=true;
  //if(asPath.startsWith("/profile"))
  // console.log("tabs", tabs);
  // console.log("href", props.href);
  
  return (
    <>
      <div className="">
        {/* <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            defaultValue={tabs.find(tab => tab.current).name}
          >
            {tabs.map(tab => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div> 
        hidden sm:block
        */}
        <div className="">
          <div className="border-b border-gray-200 ">
            {/* -mb-px */}
            <nav
              className="place-content-center flex space-x-6"
              aria-label="Tabs"
            >
              {tabs.map(tab => (
                <Link href={tab.href=="profile"?`/${urlWallet}`:`/${urlWallet}/${tab.href}`}  key={tab.name}>
                  <a
                    className={classNames(
                      tab.current
                        ? "border-[#0d1317] text-[#0d1317] "
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ",
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <tab.icon
                      className={classNames(
                        tab.current
                          ? "text-[#0d1317] "
                          : "text-gray-400 group-hover:text-gray-500",
                        "-ml-0.5 mr-2 h-5 w-5 ",
                      )}
                      aria-hidden="true"
                    />
                    <span>{tab.name}</span>
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
