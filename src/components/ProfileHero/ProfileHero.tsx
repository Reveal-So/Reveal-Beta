import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { useEffect, useState } from "react";
import { useMemo } from "react";
// import { addressAtom } from "../../atoms/address";
// import { profileAddressAtom, profileEnsAtom } from "../../atoms/profileAddress";
import { ProfileHeroButton } from "../ProfileHeroButton";
import { useAddressTruncated } from "../../hooks/useAddressTruncated";
import { useEns } from "../../hooks/useEns";
import { useProfileAddressTruncated } from "../../hooks/useProfileAddressTruncated";
import { useProfileEns } from "../../hooks/useProfileEns";
import perfilimg from "../../images/perfil2.png";
import { FollowProfiler } from "../FollowProfiler";
import { ButtonFollow } from "../ButtonFollow";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";

import icontwiter2 from "../../images/icon-twiter2.png";

// import { useRecoilValue, useRecoilState } from "recoil";
// import {
//   consultarProfileAtom,
//   conectadoProfileAtom,
// } from "../../atoms/profileAddress";
import { formatAddresslast6Digit, formatAddressShort } from "../../libs/utils";
import { useGetProfile } from "../../hooks/useGetProfile";
//import { classNames } from "../utiles/ClassNames";
import { Avatars } from "../UtilComponets/Avatars";
import { createWalletEns } from "../../libs/wallet";
import Link from "next/link";
import { ButtonTwitter } from "../UtilComponets/ButtonTwitter";
import { ButtonEdit } from "../UtilComponets/ButtonEdit";
import { classNames } from "../UtilComponets/className";
import UserContext from "../../context/User/UserContext";
import ProfileContext from "../../context/Profile/ProfileContext";


export const ProfileHero: FC = () => {
  const {
    address,
    ens,
    addressTruncated,
    avatar,
  } = useContext(UserContext);
  const {
    addressConsulta,
    ensConsulta,
    addressTruncatedConsulta,
    avatarConsulta,
  } = useContext(ProfileContext);
  const { asPath } = useRouter();
  
  const heroAddress = useMemo(() => {
    //console.log("profileEns5",profileEns);
   // if (asPath.startsWith("/profile")&&profileEns)createWalletEns (profileAddress.toString(),profileEns);
    //if (profile)
    //if (!asPath.startsWith("/profile")&&profile.bandEns)createWalletEns (profile.address,profile.ens);

    return asPath.startsWith("/profile")
      ? ens ?? addressTruncated
      : ensConsulta ?? addressTruncatedConsulta
      //!profile
      // ? address
      // : profile.bandEns
      // ? profile.ens
      // : profile.addressTrucate;
  }, [asPath, addressTruncated,ens,ensConsulta , addressTruncatedConsulta]);

  const urlWallet = useMemo(() => {
    return asPath.startsWith("/profile")
      ? "profile"
      : !addressConsulta
      ? asPath
      : ensConsulta ?? addressConsulta;
  }, [asPath, addressConsulta, ensConsulta]);

  // const urlWallet = useMemo(() => {
  //   return asPath.startsWith("/profile")
  //     ? "profile"
  //     : !addressConsulta
  //      ? asPath
  //      : ensConsulta ?? addressConsulta
  //     // : profile.bandEns
  //     // ? profile.ens
  //     // : profile.address;
  // }, [asPath, ensConsulta, addressConsulta]);

  const copyAddress = useMemo(() => {
    return asPath.startsWith("/profile")
      ? ens ?? address
      : ensConsulta ?? addressConsulta
      // !profile
      // ? address
      // : profile.ens ?? profile.address;
  }, [asPath, ens, address,ensConsulta, addressConsulta]);

  const valueMostrarCopy = useMemo(() => {
    return asPath.startsWith("/profile")
      ? addressTruncated
      : addressTruncatedConsulta
      // !profile
      // ? address
      // : profile.addressTrucate;
  }, [addressTruncated,asPath,addressTruncatedConsulta]);

  const AddressMostrar = useMemo(() => {
    return asPath.startsWith("/profile")
      ? address
      : addressConsulta
      // !profile
      // ? address
      // : profile.address ?? address;
  }, [address, asPath, addressConsulta]);

  const avatarIco = useMemo(() => {
    return asPath.startsWith("/profile") 
    ? avatar 
    : avatarConsulta
    //!profile ? "" : ;
  }, [asPath, avatar, avatarConsulta]);

  //let lastDigAddress=`bg-[#${formatAddresslast6Digit(AddressMostrar).toLowerCase()}]`;

  // const lastDigAddress= useMemo(() => {
  //   return } ,[AddressMostrar]);

  // useEffect(() => {
  //   if (asPath.startsWith("/profile") && !profileConectado) {
  //     if (!profileAddress) {
  //       return;
  //     }
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useGetProfile( profileAddress ).then((Profile: any) => {
  //       console.log("Profile", Profile);
  //       if (Profile.notFound) {
  //         //          setError(true);
  //       }
  //       setProfileConectado(Profile);
  //     });
  //   }
  // }, [profileAddress]);

  return (
    <div>
      <div className="h-32 w-full object-cover  bg-[#F8F9FA]">
        {/* <img  src={profile2.backgroundImage} alt="" /> lg:h-3*/}
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className={classNames("text-center items-center h-full ",asPath.startsWith("/profile")?"sm:pb-16 ":"sm:pb-6 ")}>
            <Avatars address={AddressMostrar} tam={6} icono={avatarIco} bandNoBuscar={true} />
            {/* <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src={profile2.avatar} alt="" /> 
            sm:hidden md:block*/}
          </div>
          <div className="sm:mt-11 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className=" mt-6 min-w-0 flex-1 text-center sm:text-left">
              <div className="w-full">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
               <Link href={`/${urlWallet}`}>  
               <a>
               {heroAddress}
               </a>
               </Link>  
              </h1>
              <ProfileHeroButton
                value={copyAddress}
                valueMostrar={valueMostrarCopy}
              />

              </div>
              
              <div className="pt-2">
                { asPath.startsWith("/profile")?
                <ButtonEdit/>
              :<></>}
              {/* <button className="items-center py-1 text-sm text-center bg-[#1B90EE] font-bold-800 px-auto mx-auto rounded-full text-white leading-4  px-3.5">
                 <img src={icontwiter2.src} className=" inline mr-2 w-auto h-4" /> 
                <svg fill="currentColor" viewBox="0 0 24 24" className="inline mr-1 h-5 w-5" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                @Follow
              </button>  */}
              </div>
             
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-[80px]">
               <ButtonTwitter
                addressToFollow={AddressMostrar}
                />
              </div>
              <FollowProfiler />
              {/* inline-flex  */}
              <ButtonFollow
                addressToFollow={AddressMostrar}
                className=" leading-4 items-center
                text-center   px-auto mx-auto
            py-2 border border-transparent text-sm  font-medium 
            rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-gray-500"
              />
              {/*  leading-4 text-center align-middle content-center  */}
            </div>
          </div>
        </div>
        {/* <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">profile2.name</h1>
        </div> */}
      </div>
    </div>
  );

};
