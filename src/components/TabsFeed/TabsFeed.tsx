import type { FC } from "react";
import {
  ChartSquareBarIcon,
  OfficeBuildingIcon,
  UserIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { classNames } from "../UtilComponets/className";
import img1 from "../../images/Feed_following.png";
import img2 from "../../images/Feed_FWB.png";
import img3 from "../../images/Feed_Lh.png";
import img4 from "../../images/Feed_Twitter.png";

const tabs = [
  { name: "Following", href: "/feed", icon: UserCircleIcon, current: false , img:img1.src , classimg:"w-[80px] h-[80px]" , classtext:"pt-0 pb-3"  },
  { name: "FWB members", href: "/feedFWB", icon: UsersIcon, current: false , img:img2.src , classimg:"w-[60px] h-[60px]" , classtext:"pt-2 pb-0" },
  { name: "Launch House", href: "/feedlaunch", icon: UsersIcon, current: false , img:img3.src , classimg:"w-[60px] h-[60px]" , classtext:"pt-2" },
  { name: "Twitter Curated", href: "/feedTwitter", icon: UsersIcon, current: false , img:img4.src , classimg:"w-[60px] h-[60px]" , classtext:"pt-2" },
];

export const TabsFeed = (props:any) => {
  let band = false;
  tabs.map(el => {
    if (el.href == props.href) {
      el.current = true;
      band = true;
    } else {
      el.current = false;
    }
  });
  // console.log("tabs", tabs);
  // console.log("href", props.href);
  return (
    <>
      <div className="sm:fixed pt-0 w-full bg-white z-30   ">
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
        </div> hidden sm:block*/}
        <div className=" overflow-x-auto">
          <div className="border-b border-gray-200  w-[500px] sm:w-full">
            {/* -mb-px */}
            <nav
              className="place-content-center flex space-x-4"
              aria-label="Tabs"
             >
              {tabs.map((tab,index) => (
                index==0&&props.notAddress?<></>:
                <Link href={tab.href} key={tab.name}>
                  <a
                    className={classNames(
                      tab.current
                      ? "border-[#6F41D8] text-[#6F41D8] "
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "group inline-flex items-center px-1 border-b-2 font-medium text-sm ",
                    props.notAddress
                    ?"py-2":"py-0"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    <div className="w-[110px]">
                      <div className="w-full pt-0 ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={tab.img} alt="" className={classNames("rounded-full mx-auto px-auto",tab.classimg)} />
                      </div>
                      <div className={classNames("w-full text-center",tab.classtext)}>
                        <span className={classNames( tab.current
                        ? "text-[#6F41D8] "
                        : "text-gray-400 group-hover:text-gray-500","inline text-sm")}>{tab.name}</span>
                      </div>
                    </div>
                    {/* <tab.icon
                      className={classNames(
                        tab.current
                        ? "text-[#6F41D8] "
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 h-5 w-5 ",
                      )}
                      aria-hidden="true"
                    /> */}
                    
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
