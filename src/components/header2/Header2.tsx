import { Popover } from "@headlessui/react";
//import { MenuIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import Link from "next/link";
import iconofeed from "../../images/icono-feed.png";
import iconoLogo from "../../images/Group_42.png";

import iconoLogo2 from "../../images/Group-40.png";

import { HeaderSearchBar } from "../HeaderSearchBar";
import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useProfileAddress } from "../../hooks/useProfileAddress";
import { consultarWallets, updateWallets } from "../../services/prisma";
import { createWallet, createWalletEns, fetchWallet } from "../../libs/wallet";
import { getFollowingsAll } from "../../services/getFollowingsAll";
import { useSegmentPage } from "react-segment-analytics";
import ReactGA from "react-ga";
import { classNames } from "../UtilComponets/className";
import UserContext from "../../context/User/UserContext";
import { lookupEnsAddress, lookupEnsAddressSystem } from "../../libs/ens";
import { getImagenAvatar } from "../UtilComponets/Avatars";
import { getCounterApi } from "../../services/getCounterApi";
import { useWeb3Provider } from "../../hooks/useWeb3Provider";
import { HeaderDropdown } from "../HeaderDropdown";
import { HeaderMobileMenu } from "../HeaderMobileMenu";

// const HeaderDropdown = dynamic<any>(
//   () => {
//     return import("../HeaderDropdown").then((mod) => {
//       return mod.HeaderDropdown;
//     });
//   },
//   {
//     ssr: false,
//   }
// );

// const HeaderMobileMenu = dynamic<any>(
//   () => {
//     return import("../HeaderMobileMenu").then((mod) => {
//       return mod.HeaderMobileMenu;
//     });
//   },
//   {
//     ssr: false,
//   }
// );

export const Header2 = () => {
  useWeb3Provider();
  const { asPath } = useRouter();
  const {
    address,
    followings,
    addressTruncated,
    setFollowings,
    setEns,
    setAvatar,
    setFollowerCount,
    setFollowingCount,
    setAddressTruncated,
    IsAuthenticated,
  } = useContext(UserContext);

// useEffect(() => {
  //   if (asPath === "/profile" || asPath === "/profile/edit") {
  //     // setTimeout(()=>{
  //     // if (!web3Provider && !profileAddress) {
  //     //   router.push("/");
  //     // }
  //     //  }, 15000);
  //   }
  // }, [asPath, profileAddress, router, web3Provider]);

  useEffect(() => {
    ReactGA.initialize("G-LR4SWTTETB");
    // ReactGA.pageview('/homepage');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("resgistra Wallet", address);
      const res = await fetchWallet(address);
      if (!res.data) {
        createWallet(address);
      } else {
        //console.log("res.data",res.data);
        let avatar = res.data.avatar,
          ens = res.data.ens,
          lastEns = res.data.lastEns,
          lastAvatar = res.data.lastAvatar,
          ahora = new Date().getTime(),
          fechalastEns = new Date(lastEns).getTime(),
          fechalastAvatar = new Date(lastAvatar).getTime();
        // console.log("ahora",ahora);
        // console.log("fechaFin",fechaFin);
        // console.log("menos semana",(ahora-604800000));
        setEns(ens);
        setAvatar(avatar);
        //1 semana 604800000 milisegundos
        if (fechalastEns < ahora - 604800000) {
          console.log("Se actualizo el ens");
          lookupEnsAddressSystem(address).then((res: any) => {
            if (res) {
              setEns(res);
            } else console.log("no hay cambio en el ens");
          });
        }
        if (fechalastAvatar < ahora - 604800000) {
          console.log("Se actualizo el avatar");
          getImagenAvatar(address).then((res: any) => {
            if (res) {
              setAvatar(res);
            } else console.log("no hay cambio en el Avatar");
          });
        }
      }
    };
    if (!address) {
      return;
    }
    if (!addressTruncated) {
     // console.log("IsAuthenticated",IsAuthenticated)
      fetchData();
      getCounterApi(address).then((res: any) => {
        //console.log ("res",res);
        if (res) {
          setFollowerCount(res.followersCount);
          setFollowingCount(res.followinsCount);
        }
      });
      getFollowingsAll(address).then((res: any) => {
        //console.log ("res",res);
        if (res) {
          setFollowings(res);
        }
      });
      setAddressTruncated(address);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const page = useSegmentPage();

  useEffect(() => {
    page(`${asPath}`);
    ReactGA.pageview(`${asPath}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);
  if (asPath == "/" && !address) return <></>;
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0 hidden lg:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}{/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <img src={iconoLogo2.src} className=" mr-2 w-auto h-7" />
                </div>
                <div className=" lg:ml-6">
                  <div className="flex space-x-4">
                    <Link passHref href={address ? "/feed" : "/feedFWB"}>
                      <a
                        className={classNames(
                          asPath.startsWith("/feed")
                            ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        )}>
                        Feed
                      </a>
                    </Link>
                    {address ? (
                      <Link passHref href="/explore">
                        <a
                          className={classNames(
                            asPath.startsWith("/explore")
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          )}>
                          Explore
                        </a>
                      </Link>
                    ) : (
                      <></>
                    )}
                    {address ? (
                      <Link passHref href="/profile">
                        <a
                          className={classNames(
                            asPath.startsWith("/profile")
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          )}>
                          Profile
                        </a>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
              <div className=" flex-1 flex justify-center px-1 lg:ml-4 lg:justify-end w-full hidden lg:block ">
                <div className="max-w-lg w-full lg:max-w-sm">
                  <HeaderSearchBar />
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:block lg:ml-4">
                <div className="flex items-center">
                  <a
                    href="https://twitter.com/revealso"
                    target={"_blank"}
                    rel="noreferrer"
                    className="flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white hover:ring-white 
                    hover:ring-2">
                    <span className="sr-only">View notifications</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-6 w-6">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  {/* Profile dropdown */}
                  <HeaderDropdown />
                </div>
              </div>
            </div>
          </div>
          <HeaderMobileMenu />
        </>
      )}
    </Disclosure>
  );
};
