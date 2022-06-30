import { FC, LegacyRef, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { useMemo } from "react";
//import { useRecoilValue, useRecoilState } from "recoil";
//import { addressAtom } from "../../atoms/address";
//import { profileAddressAtom, profileEnsAtom } from "../../atoms/profileAddress";
import { useProfileAddressTruncated } from "../../hooks/useProfileAddressTruncated";
import { useProfileEns } from "../../hooks/useProfileEns";
import { DndProvider } from "react-dnd";
import { ButtonFollow } from "../ButtonFollow";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GalleryLayout } from "../GalleryLayout";
import { ProfileHero } from "../ProfileHero";
//import { consultarProfileAtom } from "../../atoms/profileAddress";
import { useNearScreen } from "../../hooks/useNearScreen";
import debounce from "just-debounce-it";
import { useWalletsFollowers } from "../../utiles/useWalletsFollowers";
import { Avatars } from "../UtilComponets/Avatars";
import ProfileContext from "../../context/Profile/ProfileContext";
import UserContext from "../../context/User/UserContext";
import { Checkens } from "../UtilComponets/Checkens";


export const ProfileFollowersScreen: FC = () => {
  const { asPath } = useRouter();

  const { address, addressTruncated, ens } = useContext(UserContext);
  const { addressConsulta, ensConsulta, addressTruncatedConsulta } =
    useContext(ProfileContext);

  // const [profile, setProfile] = useState<any>();
  // //const { profileEns } = useProfileEns();
  // const [profileEns, setProfileEns]= useState<any>();
  // //const address = useState();
  // const profileAddress = useState<any>();
  // const profileAddressTruncated = useProfileAddressTruncated();

  const heroAddress = useMemo(() => {
    return asPath.startsWith("/profile")
      ? ens ?? addressTruncated
      : ensConsulta ?? addressTruncatedConsulta;
  }, [asPath, addressTruncated, ens, ensConsulta, addressTruncatedConsulta]);

  const AddressMostrar = useMemo(() => {
    return asPath.startsWith("/profile") ? address : addressConsulta;
  }, [address, asPath, addressConsulta]);

  //console.log("AddressMostrar", AddressMostrar);
  const { loading, Wallets, setPage , loadingNextPage} = useWalletsFollowers({
    address: AddressMostrar,
  });

  const debounceHandleNextPage = useCallback(
    debounce(() => {
      if (!loadingNextPage && AddressMostrar){
        setPage((prevPage:any) => prevPage + 1);
        console.log("next page");
      }
    }, 200),
    [setPage]
  );

  const externalRef = useRef<HTMLDivElement>();
  const { isNearScreen } = useNearScreen(
    "100px",
    loading ? null : externalRef,
    false
  );
  //console.log("isNearScreen",isNearScreen);
  useEffect(
    function () {
      if (isNearScreen) debounceHandleNextPage();
    },
    [debounceHandleNextPage, isNearScreen]
  );

  return (
    <>
      <GalleryLayout>
        <DndProvider backend={HTML5Backend}>
          <ProfileHero />
          <div className="w-full px-2 sm:px-[10%] pt-5">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-lg font-medium text-gray-900">
                  accounts following {heroAddress}
                </span>
              </div>
            </div>
            <div className=" w-full space-y-8 pt-8 sm:px-8 ">
            {loading ||Wallets?.length==0? (
                <div className="h-[300px] ">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                Wallets?.map((el: any) => {
                  return (
                    <div key={el.address} className="w-full flex ">
                      <div className="w-1/3 sm:w-16">
                        <Avatars address={el.address} tam={2} icono={""} />
                      </div>

                      <div className="w-5/6 text-2xl font-bold text-gray-900 flex items-center truncate">
                         <Checkens address={el.address}/>
                      </div>
                      <div className=" w-1/3 sm:w-1/6 flex flex-row-reverse items-center ">
                        <ButtonFollow
                          addressToFollow={el.address}
                          className="inline-flex items-center py-2 border border-transparent text-sm leading-4 font-medium 
                        rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-gray-500"
                        />
                      </div>
                    </div>
                  );
                })
              )}
              <div
                id="visor"
                ref={externalRef as LegacyRef<HTMLDivElement>}></div>
            </div>
          </div>
        </DndProvider>
      </GalleryLayout>
    </>
  );
};
