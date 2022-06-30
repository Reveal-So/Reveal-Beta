import { FC, LegacyRef, MutableRefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { GalleryEdit } from "../GalleryEdit";

import Image from "next/image";
import img1 from "../../images/profile1.png";
import img2 from "../../images/profile2.png";
import img3 from "../../images/profile3.png";
import img4 from "../../images/profile4.png";
import perfilimg from "../../images/perfil2.png";
import iconoUserimg from "../../images/icono-user2.png";
import iconoMiniUser1 from "../../images/orb1.png";
import iconoMiniUser2 from "../../images/orb2.png";
import iconoMiniUser3 from "../../images/orb3.png";
import iconoMiniUser4 from "../../images/orb4.png";
import iconoMiniUser5 from "../../images/orb5.png";
import iconoMiniUser6 from "../../images/orb6.png";
import iconoMiniUser7 from "../../images/orb7.png";
import { FollowImg } from "../FollowImg";
import { useNearScreen } from "../../hooks/useNearScreen";
import debounce from "just-debounce-it";
import { useRouter } from "next/router";
//import { useRecoilState, useRecoilValue } from "recoil";
//import { conectadoProfileAtom, profileAddressAtom } from "../../atoms/profileAddress";
import { useWalletsRecomendados } from "../../utiles/useWalletsRecomendados";
import { useProfileAddress } from "../../hooks/useProfileAddress";
import { Avatars } from "../UtilComponets/Avatars";
import { ButtonFollow } from "../ButtonFollow";
import Link from "next/link";
import { useWeb3Provider } from "../../hooks/useWeb3Provider";
import { Error } from "../Error";
import { Icospinner } from "../UtilComponets/spinner";
import { useWalletsPopular } from "../../utiles/useWalletsPopular";
import UserContext from "../../context/User/UserContext";
import { getPopular } from "../../services/getPopular";
import { formatAddressShort } from "../../libs/utils";
import axios from "axios";
import ky from 'ky-universal';

// if (typeof window === 'undefined')
//   (global as any).fetch = require('node-fetch');

export const ExploreScreen: FC = () => {
  //const { asPath } = useRouter();
  //const [profile, setProfile] = useRecoilState(consultarProfileAtom);
  //const { profileEns } = useProfileEns();
  //const address = useRecoilValue(addressAtom);
  //const profileAddress = useRecoilValue(profileAddressAtom);
  //const profileAddress = useState<any>();
 // const [profileConectado, setProfileConectado] =useRecoilState(conectadoProfileAtom);
 //const [profileConectado, setProfileConectado] = useState<any>([]);
  //const { profileAddress, setProfileAddress } = useProfileAddress();
  //const  web3Provider   = "";
  const { address } = useContext(UserContext);
  const router = useRouter();
  //const [consBandInicio,setconsBandInicio]=useState(true);
  // const condicion=useMemo(()=>{
  //     return !web3Provider && !profileAddress;
  //   }
  //   ,[web3Provider,profileAddress]);
  // const profileAddressTruncated = useProfileAddressTruncated();

  // if (!profileAddress) {
  //   return <Error/>;
  // }
  //console.log("AddressMostrar", AddressMostrar);
  const [WalletsPopular, setWalletsPopular] = useState<any>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const { loading, Wallets, setPage } = useWalletsRecomendados({
    address: address,
  });

  useEffect(() => {
    if (!address) return;
    setWalletsPopular([]);
    let query = { "query": `query {popular( tags:{list:[FEATURED]}  first:50){ pageInfo { endCursor hasNextPage } list{address ens followerCount isFollowing recommendationReason domain}}}` };
    const options = {
      headers: { "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*', }
    };
    console.log("Axio");
    // axios.post("https://api.cybertino.io/connect/",query,options
    //   ).then((resp:any)=>{
    //     console.log("resp",resp);
        //console.log("valor popular", valor);
    getPopular({ address:address }).then((valor) => {
      let band=false;
      valor.list.map(async (el:any) => {
        const address = el.address;     
        let temp = {
          user: el.domain?el.domain:formatAddressShort(address),
          bandens: !el.domain ? false : true,
          address: address,
          avatar: el.avatar,
          recommendationReason: el.recommendationReason,
          followerCount: el.followerCount,
        };
        let listWallet: any[] = band?WalletsPopular:[];
        band=true;
        listWallet.push(temp);
        setWalletsPopular(listWallet);
        setLoadingPopular(false);
      });
 
      //});
      //getEnsWallets({ list: valor.list });
      //if (valor.followingCount == 0) { setLoading(false); }
    }).catch((err:any)=>{
      console.log ("error 55",err);
    });
  }, [address]);
  // const { loadingPopular, WalletsPopular } = useWalletsPopular({
  //   address: address,
  // });

  
  
  const externalRef = useRef<HTMLDivElement>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleNextPage = useCallback( debounce(() => {
      setPage(prevPage => prevPage + 1);
      console.log("next page");
    }, 200),
    [setPage],
  );

 const { isNearScreen } = useNearScreen( '100px', loading ? undefined : externalRef, false );
  //console.log("isNearScreen",isNearScreen);
  useEffect(
    function () {
      if (isNearScreen) debounceHandleNextPage();
      return () => {
        debounceHandleNextPage.cancel();
      };
    },
    [debounceHandleNextPage, isNearScreen],
  );
////////////////////////////////////////////////////////////
//   useEffect(() => {
//     setTimeout(()=>{
//       ()=>{setconsBandInicio(false);}
//     }, 3000);
// }, [address]);

  // if (!web3Provider && !address){
  //   return (<>{consBandInicio?
  //     <div className="pt-10 h-[400px] pl-[10%] ">
  //       <Icospinner/>
  //     </div>
  //     :<Error/>}</>);
  // }
  

  return (
    <>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-2">
        <div className="text-2xl text-base font-bold text-gray-900 pt-10 ">
        Featured people to follow
        </div>
        <div className="row ">
          <div className="w-full pt-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-3 md:px-0">
              {loadingPopular ? (
                <div className="h-[300px] ">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                WalletsPopular.map((wallet:any) => (
                  //  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500
                  // key={wallet.address}
                  <div
                    key={`${wallet.bandens ? wallet.user : wallet.address}`}
                    className=" rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm  items-center  
                  hover:border-gray-400 "
                  >
                    <div className=" flex w-full ">
                      <div className="flex-shrink-0 pt-1">
                        <Avatars
                          address={wallet.address}
                          tam={2}
                          icono={""}
                        />
                      </div>
                      <div className="w-[87%]  ">
                        <div className=" flex w-full  ">
                          <div className="flex-1 min-w-0 pl-2 text-clip overflow-hidden bg px-0 mx-0  w-[150px] sm:w-[160px]">
                            <Link
                              passHref
                              href={`/${
                                wallet.bandens ? wallet.user : wallet.address
                              }`}
                            >
                              <a className="hover:underline ">
                                <p className="text-sm font-medium text-gray-900 truncate w-[150px] sm:w-[160px]">
                                  {wallet.user}
                                </p>
                                <p className="text-sm text-gray-500 truncate ">
                                  {wallet.followerCount} followers
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="w-1/3 sm:w-1/6 flex flex-row-reverse items-center">
                            <ButtonFollow
                              addressToFollow={wallet.address}
                              className="inline-flex items-center py-2 border border-transparent text-sm leading-4 font-medium 
                        rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-gray-500"
                            />
                          </div>
                        </div>

                        <div className="flex w-full truncate  ">
                          <p className="text-sm text-gray-500  truncate pl-2 w-full ">
                            {wallet.recommendationReason} 
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                // <></>
              )}
              <div id="visor" ref={externalRef as LegacyRef<HTMLDivElement>}></div>
            </div>

          
          </div>
        </div>
        <div className="text-2xl text-base font-bold text-gray-900 pt-10 ">
          Explore people to follow
        </div>
        <div className="text-base font-bold text-gray-400">
          Find people you may know
        </div>
        <div className="row ">
          <div className="w-full pt-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-3 md:px-0">
              {
              loading ? (
                <div className="h-[300px] ">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                Wallets.map((wallet:any) => (
                   //  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500
                //   // key={wallet.address}
                   <div
                     key={`${wallet.address}r`}
                     className=" rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm  items-center  
                   hover:border-gray-400 "
                   >
                      <div className=" flex w-full ">
                       <div className="flex-shrink-0 pt-1">
                         <Avatars
                           address={wallet.address}
                           tam={2}
                           icono={""}
                         /> 
                      </div>
                      <div className="w-[87%]  ">
                         <div className=" flex w-full  ">
                           <div className="flex-1 min-w-0 pl-2 text-clip overflow-hidden bg px-0 mx-0  w-[150px] sm:w-[160px]">
                             <Link
                               passHref
                               href={`/${
                                 wallet.bandens ? wallet.user : wallet.address
                              }`}
                             >
                               <a className="hover:underline ">
                                 <p className="text-sm font-medium text-gray-900 truncate w-[150px] sm:w-[160px]">
                                   {wallet.user}
                                 </p>
                                 <p className="text-sm text-gray-500 truncate ">
                                   {wallet.followerCount} followers
                                 </p>
                               </a>
                             </Link>
                           </div>
                           <div className="w-1/3 sm:w-1/6 flex flex-row-reverse items-center">
                             <ButtonFollow
                               addressToFollow={wallet.address}
                               className="inline-flex items-center py-2 border border-transparent text-sm leading-4 font-medium 
                         rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-gray-500"
                             />
                           </div>
                         </div>
                         <div className="flex w-full truncate  ">
                           <p className="text-sm text-gray-500  truncate pl-2 w-full ">
                             {wallet.recommendationReason} 
                           </p>
                         </div>
                       </div>
                     </div> 
                   </div>
                ))
                //<>reconendados</>
              )
              }
              <div id="visor" ref={externalRef as LegacyRef<HTMLDivElement>}></div>
            </div>

            {/* <ul
              role="list"
              className="space-y-8 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:gap-y-8 sm:space-y-0 lg:grid-cols-2 lg:gap-x-4"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map(index => {
                let value, src;
                if (index == 0) {
                  value = "FWB";
                  src = img1.src;
                }
                if (index == 1) {
                  value = "Launch house";
                  src = img2.src;
                }
                if (index == 2) {
                  value = "SushiSwap";
                  src = img3.src;
                }
                if (index == 3) {
                  value = "MAYC";
                  src = img4.src;
                } else {
                  value = "MAYC";
                  src = img4.src;
                }
                return (
                  <>
                    <li key={index + "b"} className="feedContenedorRecuadro">
                      <div className=" w-full flex items-center justify-between  space-x-8 ">
                        <div className="flex w-full ">
                          <div className="w-1/6  p-3">
                            <img
                              src={perfilimg.src}
                              className="feedImgPerfil py-auto"
                            />
                          </div>
                          <div className="w-2/3 sm:w-2/3  ">
                            <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
                            <div className=" pt-4">
                              <div className="justify-start feedUserName">user.eth</div>
                              <div className=" feedUserFollow">23 followers</div>
                            </div>
                            <div className="pt-6">
                            
                              <FollowImg arregloImg={[]} tammano={8}  />
                              
                            </div>
                            </div>
                          </div>
                          <div className="w-1/4  p-2 pt-5">
                            <button className="w-full h-full feedBotonFlow  justify-center sm:w-30 sm:h-10 ">
                              Follow
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="-mt-px flex ">
                          <div className="w-0 flex-1 flex">
                            <a className="relative -mr-px w-0 flex-1 inline-flex justify-start pl-2 py-2 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                              <span className="ml-3 feedFollowed ">
                                <img
                                  src={iconoUserimg.src}
                                  className="feedImgUser inline mr-2 w-5 h-5 "
                                />{" "}
                                Followed by artcollector.eth and +31 more
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul> */}
          </div>
        </div>
        {/* <div className="row feedContenedorBoton">
          <div className="col-12 mx-auto w-100 px-auto text-center">
            <button className="feedBotonSeeMore w-100-movil">See more</button>
          </div>
        </div> */}
      </div>
    </>
  );
};
