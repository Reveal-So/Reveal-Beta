import { FC, LegacyRef, useContext, useMemo } from "react";
import { useEffect, useState, useCallback, useRef } from "react";
//import { useRecoilValue, useRecoilState } from "recoil";
import { ethers } from "ethers";
import Link from "next/link";
import { formatAddressShort } from "../../libs/utils";
import { resolveEnsName, lookupEnsAddress } from "../../libs/ens";

import icoAvatar from "../../images/ico_avatar.png";
import icoType from "../../images/ico_type.png";
import icoProfile from "../../images/ico_profile.png";
import icoType2 from "../../images/ico_type2.png";
import { API_URL } from "../../const/api";
import { useNearScreen } from "../../hooks/useNearScreen";
import debounce from "just-debounce-it";
import mirrorimg from "../../images/Mirror_image.png";
import imgTokens from "../../images/Token_image.png";
import imgflecha from "../../images/flecha.png";
//import { conectadoProfileAtom, consultarProfileAtom, profileAddressAtom } from "../../atoms/profileAddress";
import { TabsFeed } from "../TabsFeed";

import { Mostrar_nfts } from "../FeedComponents/Mostrar_nfts";
import { Mostrar_Poaps } from "../FeedComponents/Mostrar_Poaps";
import { Mostrar_Mirrors } from "../FeedComponents/Mostrar_Mirrors";
import { Mostrar_TOKENs } from "../FeedComponents/Mostrar_TOKENs";
import { Mostrar_DAOs } from "../FeedComponents/Mostrar_DAOs";
import { dateNum } from "../UtilComponets/dateNum";
import { useRouter } from "next/router";
import { classNames } from "../UtilComponets/className";
import UserContext from "../../context/User/UserContext";
import ProfileContext from "../../context/Profile/ProfileContext";

const PrimaryNavigation = [
  { name: "All", href: "#" },
  { name: "NFT", href: "#" },
  { name: "POAP", href: "#" },
  { name: "DAO", href: "#" },
  { name: "Mirror", href: "#" },
  { name: "Token", href: "#" },
];


/////////////////////////////////////////////////////////////////
const getFeedsNFTs = async (
  { address, page, cantidad } = { address: null, page: 0, cantidad: 20 },
): Promise<any> => {
  try {
    let result, data;
    //NFTs
    let consulta = address
      ? `${API_URL}/api/Feed/GetNfts?page=${page}&walletAddress=${address}&IsFwb=true&IsProfile=true`
      : `${API_URL}/api/Feed/GetNfts?page=${page}&IsFwb=true`;
    result = await fetch(consulta, {
      method: "GET",
    });
    data = await result.json();
    //console.log("data", data);
    if (!data) {
      return;
    }
    if (!data.information) {
      return;
    }
    const NFTs = data.information.nfts;
    //console.log("NFTs",NFTs);
    return {
      NFTs: NFTs,
    };
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const getFeedsDAOs = async (
  { address, page, cantidad } = { address: null, page: 0, cantidad: 20 },
): Promise<any> => {
  try {
    let result, data;
    //DAOs
    let consulta = address
      ? `${API_URL}/api/Feed/GetDaos?page=${page}&walletAddress=${address}&IsFwb=true&IsProfile=true`
      : `${API_URL}/api/Feed/GetDaos?page=${page}&IsFwb=true`;
    result = await fetch(consulta, {
      method: "GET",
    });
    data = await result.json();
    //console.log("data", data);
    if (!data) {
      return;
    }
    if (!data.information) {
      return;
    }
    const DAOs = data.information.daos;
    //console.log("DAOs",DAOs);
    return {
      DAOs: DAOs,
    };
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const getFeedsTOKENs = async (
  { address, page, cantidad } = { address: null, page: 0, cantidad: 20 },
): Promise<any> => {
  try {
    let result, data;
    //TOKENs
    let consulta = address
      ? `${API_URL}/api/Feed/GetTokens?page=${page}&walletAddress=${address}&IsFwb=true&IsProfile=true`
      : `${API_URL}/api/Feed/GetTokens?page=${page}&IsFwb=true`;
    result = await fetch(consulta, {
      method: "GET",
    });
    data = await result.json();
    //console.log("data", data);
    if (!data) {
      return;
    }
    if (!data.information) {
      return;
    }
    const TOKENs = data.information.tokens;
    //console.log("TOKENs",TOKENs);
    return {
      TOKENs: TOKENs,
    };
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const getFeedsPOAPs = async (
  { address, page, cantidad } = { address: null, page: 0, cantidad: 20 },
): Promise<any> => {
  try {
    let result, data;
    //Poaps
    let consulta = address
      ? `${API_URL}/api/Feed/GetPoaps?page=${page}&walletAddress=${address}&IsFwb=true&IsProfile=true`
      : `${API_URL}/api/Feed/GetPoaps?page=${page}&IsFwb=true`;
    result = await fetch(consulta, {
      method: "GET",
    });
    data = await result.json();
    //console.log("data", data);
    if (!data) {
      return;
    }
    if (!data.information) {
      return;
    }
    const Poaps = data.information.poaps;
    //console.log("Poaps",Poaps);
    return {
      Poaps: Poaps,
    };
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

const getFeedsMIRRORs = async (
  { address, page, cantidad } = { address: null, page: 0, cantidad: 20 },
): Promise<any> => {
  try {
    let result, data;
    //Mirrors
    let consulta = address
      ? `${API_URL}/api/Feed/GetMirrors?page=${page}&walletAddress=${address}&IsFwb=true&IsProfile=true`
      : `${API_URL}/api/Feed/GetMirrors?page=${page}&IsFwb=true`;
    result = await fetch(consulta, {
      method: "GET",
    });
    data = await result.json();
    //console.log("data", data);
    if (!data) {
      return;
    }
    if (!data.information) {
      return;
    }
    const Mirrors = data.information.mirrors;
    //console.log("Mirrors",Mirrors);
    return {
      Mirrors: Mirrors,
    };
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

/////////////////////////////////////////////////////////////////////////
const INITIAL_PAGE = 1;

type listaEns={
  NFTs?:any[];
  DAOs?:any[];
  TOKENs?:any[];
  Poaps?:any[];
  Mirrors?:any[];
}
// const useGetFeeds: any = ({ address } = { address: null }) => {
//   const [loading, setLoading] = useState(false);
//   const [loadingNextPage, setLoadingNextPage] = useState(false);
//   const [page, setPage] = useState(INITIAL_PAGE);
//   const [error, setError] = useState(false);
//   const [errorNft, setErrorNft] = useState(false);
//   const [errorDaos, setErrorDaos] = useState(false);
//   const [errorTokens, setErrorTokens] = useState(false);
//   const [errorMirrors, setErrorMirrors] = useState(false);
//   const [errorPoaps, setErrorPoaps] = useState(false);
//   const [contadorError, setcontadorError] = useState(0);
//   //let contadorMirror=0;
//   const [BandErrorAddress, setBandErrorAddress] = useState(false);
//   const [Feeds, setFeeds] = useState<any[]>([]);
//   //console.log("inicio declaracion")
//   const [Feedsupdate, setFeedsupdate] = useState<any>([]);
//   const [posY, setposY] = useState(0);

//   const getEnsWallets = async (list: listaEns) => {
//     let temp: any, ens;

//     if (!list) {
//       return [];
//     }

//     if (list?.NFTs) {
//       list.NFTs.map(async (el: any) => {
//         const address = el.walletId;
//         //ens = await lookupEnsAddress(address);
//         setposY(window.scrollY);
//         temp = {
//           id: el.id,
//           type: "nft",
//           user: formatAddressShort(address),
//           bandens: false,
//           name: el.name,
//           address: address,
//           avatar: el.avatar,
//           media: el.media,
//           description: el.description,
//           collectionContract: el.collectionContract,
//           price: el.price,
//           typeTransaction: el.typeTransaction,
//           contract: el.contract,
//           nftId: el.nftId,
//           receiveDateAt: el.receiveDateAt,
//           fechaOrd: dateNum(el.receiveDateAt),
//         };
//         //console.log("Feeds",Feeds);
//         if (
//           Feeds.find((valor: any) => {
//             // console.log("valor0",valor);
//             if (valor.type == "nft") {
//               //if (valor.id == temp.id) console.log("valor Repetido", valor);
//               return valor.id == temp.id;
//             } else return false;
//           }) == undefined
//         ) {
//           if (page > 1) {
//             if (
//               Feeds.find((valor: any) => {
//                 //console.log("valor",valor)
//                 return valor.fechaOrd < temp.fechaOrd && valor.type == "nft";
//               }) == undefined
//             ) {
//               let listFedd: any[] = Feeds;
//               listFedd.push(temp);
//               //.concat()
//               //(Feeds:any[]) => [...Feeds, temp]
//               //console.log("listFedd",listFedd);
//               setFeeds(listFedd);
//             } else {
//               console.log("Tiempo menor al mostrado", temp);
//               setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
//             }
//           } else {
//             let listFedd: any[] = Feeds;
//             listFedd.push(temp);
//             setFeeds(listFedd);
//           }
//         } else {
//           //console.log("se repitio NFT");
//           //setFeedsupdate((Feedsupdates:any) => [...Feedsupdates, temp]);
//         }
//         setLoading(false);
//       });
//     }
//     if (list?.DAOs) {
//       list.DAOs.map(async (el) => {
//         const address = el.walletId;
//        // ens = await lookupEnsAddress(address);
//         setposY(window.scrollY);
//         temp = {
//             id: el.id,
//             type: "dao",
//             user: formatAddressShort(address),
//             bandens: false,
//             address: address,
//             avatar: el.avatar,
//             link: el.link,
//             media: el.media,
//             answer: el.answer,
//             entityName: el.entityName,
//             name: el.proposalName,
//             description: el.proposalDescription,
//             receiveDateAt: el.receiveDateAt,
//             fechaOrd: dateNum(el.receiveDateAt),
//           }
//         ;
//         if (
//           Feeds.find((valor: any) => {
//             // console.log("valor0",valor);
//             if (valor.type == "dao") {
//               //if (valor.id == temp.id) console.log("valor Repetido", valor);
//               return valor.id == temp.id;
//             } else return false;
//           }) == undefined
//         ) {
//         if (page > 1) {
//             if (
//               Feeds.find(
//                 (valor: any) => (valor.fechaOrd < temp.fechaOrd && valor.type == "dao")
//               ) == undefined
//             ) {
//               let listFedd: any[] = Feeds;
//               listFedd.push(temp);
//               setFeeds(listFedd);
//             } else {
//               setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
//               // console.log("Feedsupdate",Feedsupdate);
//             }
//           } else {
//             let listFedd: any[] = Feeds;
//             listFedd.push(temp);
//             setFeeds(listFedd);
//           }
//         } else {
//          // console.log("Se repitio dao",temp);
//         }
//         setLoading(false);
//       });
//     }
//     if (list?.TOKENs) {
//       list.TOKENs.map(async (el) => {
//         const address = el.walletId;
//         //ens = await lookupEnsAddress(address);
//         setposY(window.scrollY);
//         temp = {
//           id: el.id,
//           type: "token",
//           user: formatAddressShort(address),
//           bandens: false,
//           address: address,
//           media: el.destinationLogo,
//           originLogo: el.originLogo,
//           destinationLogo: el.destinationLogo,
//           originCurrency: el.originCurrency,
//           destinationCurrency: el.destinationCurrency,
//           destinationAddress: el.destinationAddress,
//           destinationValue: el.destinationValue,
//           originValue: el.originValue,
//           valueUSD: el.valueUSD,
//           avatar: el.avatar,
//           tokenId:el.tokenId,
//           receiveDateAt: el.receiveDateAt,
//           fechaOrd: dateNum(el.receiveDateAt),
//         };
//         if (temp.address==temp.destinationAddress){
//          // console.log("valor excluido", temp);
//         }else
//         if (
//           Feeds.find((valor: any) => {
//             // console.log("valor0",valor);
//             if (valor.type == "token") {
//               //if (valor.id == temp.id) console.log("valor Repetido", valor);
//               return valor.id == temp.id;
//             } else return false;
//           }) == undefined
//         ) {
//         if (page > 1) {
//             if (
//               Feeds.find(
//                 (valor: any) => (valor.fechaOrd < temp.fechaOrd && valor.type == "token")
//               ) == undefined
//             ) {
//               let listFedd: any[] = Feeds;
//               listFedd.push(temp);
//               setFeeds(listFedd);
//             } else {
//               setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
//               // console.log("Feedsupdate",Feedsupdate);
//             }
//           } else {
//             let listFedd: any[] = Feeds;
//             listFedd.push(temp);
//             setFeeds(listFedd);
//           }
//         } else {
//          // console.log("Se repitio token",temp);
//         }

//         setLoading(false);
//       });
//     }
//     if (list?.Mirrors) {
//       //console.log("list", list);
//       list.Mirrors.map(async (el) => {
//         const address = el.walletId;
//         //ens = await lookupEnsAddress(address);
//         setposY(window.scrollY);
//         // console.log("window.scrollY",window.scrollY)
//         // user: !ens ? formatAddressShort(address) : ens,
//         // bandens: !ens ? false : true,
//         temp ={
//             id: el.id,
//             type: "mirror",
//             user: formatAddressShort(address),
//             bandens: false,
//             address: address,
//             media: el.media,
//             name: el.title,
//             date: el.receiveDateAt,
//             avatar: el.avatar,
//             mirrorId: el.mirrorId,
//             receiveDateAt: el.receiveDateAt,
//             fechaOrd: dateNum(el.receiveDateAt),
//           };
//         // contadorMirror:`${(page*20)-20+contadorMirror}`,
//         // contadorMirror=contadorMirror+1;
//         //setFeeds(Feeds => [...Feeds, temp]);
//         // console.log("temp",temp);
//         // console.log("valor.fechaOrd",temp.fechaOrd);
//         // console.log("valor.fechaOrd>dateNum(el.receiveDateAt)",Feeds.find(valor=>(valor.fechaOrd<temp.fechaOrd&&valor.type=="mirror")));
//         if (
//           Feeds.find((valor: any) => {
//             // console.log("valor0",valor);
//             if (valor.type == "mirror") {
//               //if (valor.id == temp.id) console.log("valor Repetido", valor);
//               return valor.id == temp.id;
//             } else return false;
//           }) == undefined
//         ) {
//         if (page > 1) {
//             if (
//               Feeds.find(
//                 (valor: any) => (valor.fechaOrd < temp.fechaOrd && valor.type == "mirror")
//               ) == undefined
//             ) {
//               let listFedd: any[] = Feeds;
//               listFedd.push(temp);
//               setFeeds(listFedd);
//             } else {
//               setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
//               // console.log("Feedsupdate",Feedsupdate);
//             }
//           } else {
//             let listFedd: any[] = Feeds;
//             listFedd.push(temp);
//             setFeeds(listFedd);
//           }
//         } else {
//           //console.log("Se repitio mirror",temp);
//         }

//         //setcontadorMirror(contadorMirror =>contadorMirror+1)

//         setLoading(false);
//       });
//     }
//     if (list?.Poaps) {
//       list.Poaps.map(async (el) => {
//         const address = el.walletId;
//         //ens = await lookupEnsAddress(address);
//         setposY(window.scrollY);
//         temp = {
//           id: el.id,
//           type: "poap",
//           user: formatAddressShort(address),
//           bandens: false,
//           address: address,
//           avatar: el.avatar,
//           name: el.name,
//           description: el.description,
//           media: el.src,
//           country: el.country,
//           city: el.city,
//           poapId: el.poapId,
//           receiveDateAt: el.receiveDateAt,
//           eventUrl: el.eventUrl,
//           fechaOrd: dateNum(el.receiveDateAt),
//         };
//         if (
//           Feeds.find((valor: any) => {
//             // console.log("valor0",valor);
//             if (valor.type == "poap") {
//              // if (valor.id == temp.id) console.log("valor Repetido poap", valor);
//               return valor.id == temp.id;
//             } else return false;
//           }) == undefined
//         ) {
//         if (page > 1) {
//           if (
//             Feeds.find(
//               (valor: any) =>
//                 valor?.eventUrl == temp.eventUrl &&
//                 valor.fechaOrd == temp.fechaOrd
//             ) == undefined
//           ) {
//             if (
//               Feeds.find(
//                 (valor: any) =>
//                   valor.fechaOrd < temp.fechaOrd && valor.type == "poap"
//               ) == undefined
//             ) {
//               let listFedd: any[] = Feeds;
//               listFedd.push(temp);
//               setFeeds(listFedd);
//             } else {
//               setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
//               // console.log("Feedsupdate",Feedsupdate);
//             }
//           } else {
//             console.log("Se repitio poap", temp);
//           }
//         } else {
//           let listFedd: any[] = Feeds;
//           listFedd.push(temp);
//           setFeeds(listFedd);
//         }
//         }else {
//          // console.log("Se repitio poap");
//         }
//         setLoading(false);
//       });
//     }
//   };

//   useEffect(
//     function () {
//       window.scrollTo(0, posY);
//       //console.log("window.scrollY",window.scrollY)
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     },
//     [Feeds,posY]
//   );
//   useEffect(function () {
//     setLoading(true);
//     setFeeds([]);
//     console.log("Se reseteo");
//     setFeedsupdate([]);
//     setPage(INITIAL_PAGE);
//     //setcontadorMirror(0);
//     //console.log("useGetFeeds address",address)
//     // if (!address){
//     //   setBandErrorAddress(true);
//     //   return
//     // }
//     // setLoadingNextPage(true);
//     // if (page == INITIAL_PAGE) {
//     //   getFeedsNFTs({ address, page, cantidad: 20 }).then((valor:any) => {
//     //     getEnsWallets({NFTs: valor.NFTs});
//     //     console.log("getFeedsNFTs", valor);
//     //     if (valor.length==0){setErrorNft(true);}
//     //     setLoadingNextPage(false);
//     //   });
//     //   getFeedsPOAPs({ address, page, cantidad: 20 }).then((valor:any) => {
//     //     getEnsWallets({ Poaps: valor.Poaps });
//     //     console.log("getFeedsPOAPs", valor);
//     //     if (valor.length==0){setcontadorError(contadorError+1);}
//     //     setLoadingNextPage(false);
//     //   });
//     //   // getFeedsMIRRORs({ address, page, cantidad: 20 }).then(valor => {
//     //   //   getEnsWallets({ Mirrors: valor.Mirrors });
//     //   //   console.log("getFeedsMIRRORs", valor);
//     //   //   if (valor.length==0){setcontadorError(contadorError+1);}
//     //   // });
//     //   // getFeedsDAOs({ address, page, cantidad: 20 }).then((valor:any) => {
//     //   //   getEnsWallets({ DAOs: valor.DAOs });
//     //   //   console.log("getFeedsDAOs", valor);
//     //   //   if (valor.length==0){setcontadorError(contadorError+1);}

//     //   // });
//     //   // getFeedsTOKENs({ address, page, cantidad: 20 }).then((valor:any) => {
//     //   //   getEnsWallets({ TOKENs: valor.TOKENs });
//     //   //   console.log("getFeedsTOKENs", valor);
//     //   //   if (valor.length==0){setcontadorError(contadorError+1);}

//     //   // });
//     // }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // useEffect(
//   //   function () {
//   //     if(contadorError>4){}
//   //   }, [contadorError]);
//   useEffect(
//     function () {
//       console.log("page", page);
//       if (!address) {
//         return;
//       }
//       //if (page == INITIAL_PAGE)
//       //if (page == INITIAL_PAGE && !BandErrorAddress) {console.log("Logagin true");return;  }
//       //if (loadingNextPage) {console.log(" repitio el cargado"); return;}
//       setBandErrorAddress(false);
//       setLoadingNextPage(true);

//       getFeedsNFTs({ address, page, cantidad: 20 }).then((valor: any) => {
//         if(valor?.NFTs){
//           getEnsWallets({ NFTs: valor.NFTs });
//         }else { console.log ("Error NFTs" )}
        
//         if (valor?.length==0||!valor){setErrorNft(true);setcontadorError(contadorError+1);}
//         console.log(`getFeedsNFTs ${page}`, valor);
//         setLoadingNextPage(false);
//       });
//       getFeedsPOAPs({ address, page, cantidad: 20 }).then((valor: any) => {
//         if(valor?.Poaps){
//           getEnsWallets({ Poaps: valor.Poaps });
//         }else { console.log ("Error Poaps")}
//         console.log(`getFeedsPOAPs ${page}`, valor);
//         if (valor?.length==0||!valor){setErrorPoaps(true);setcontadorError(contadorError+1);}
//         setLoadingNextPage(false);
//       });
//       getFeedsMIRRORs({ address, page, cantidad: 20 }).then((valor:any) => {
//         if(valor?.Mirrors){
//           getEnsWallets({ Mirrors: valor.Mirrors });
//         }else { console.log ("Error Mirrors")}
//         console.log(`getFeedsMIRRORs ${page}`, valor);
//         if (valor?.length==0||!valor){setErrorMirrors(true);setcontadorError(contadorError+1);}
//         setLoadingNextPage(false);
//       });
//       getFeedsDAOs({ address, page, cantidad: 20 }).then((valor:any) => {
//         if(valor?.DAOs){
//           getEnsWallets({ DAOs: valor.DAOs });
//         }else { console.log ("Error DAOs")}
//         console.log(`getFeedsDAOs ${page}`, valor);
//         if (valor?.length==0||!valor){setErrorDaos(true);setcontadorError(contadorError+1);}
//         setLoadingNextPage(false);
//       });
//       getFeedsTOKENs({ address, page, cantidad: 20 }).then((valor:any) => {
//         if(valor?.TOKENs){
//           getEnsWallets({ TOKENs: valor.TOKENs });
//         }else { console.log ("Error TOKENs")}
//         console.log("getFeedsTOKENs", valor);
//         if (valor?.length==0||!valor){setErrorTokens(true);setcontadorError(contadorError+1);}
//         setLoadingNextPage(false);
//       });
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [address, page]
//   );
//   return { loading, loadingNextPage, error, Feeds, setPage, setLoading, errorNft,errorDaos,errorTokens,errorMirrors,errorPoaps };
// };

////////////////////////////////////////////////////////////////////////////////////
export const ProfileFeedScreen: FC = () => {
  
  const { asPath } = useRouter();
  const { address } = useContext(UserContext);
  const { addressConsulta } = useContext(ProfileContext);
  
  const addressWallet = useMemo(() => {
    if ((asPath.startsWith("/profile")&&!address)||(!asPath.startsWith("/profile")&&!addressConsulta)) return;
    //if (!asPath.startsWith("/profile")&&!profile) return;
    return asPath.startsWith("/profile")
      ? address
      : addressConsulta;
  }, [address,addressConsulta,asPath]);

  //const { loading, Feeds, setPage, errorNft,errorDaos,errorTokens,errorMirrors,errorPoaps,loadingNextPage } = useGetFeeds({ address: addressWallet });
////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [loading, setLoading] = useState(false);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [error, setError] = useState(false);
  const [errorNft, setErrorNft] = useState(false);
  const [errorDaos, setErrorDaos] = useState(false);
  const [errorTokens, setErrorTokens] = useState(false);
  const [errorMirrors, setErrorMirrors] = useState(false);
  const [errorPoaps, setErrorPoaps] = useState(false);

  const [cargaNft, setcargaNft] = useState(true);
  const [cargaDaos, setcargaDaos] = useState(true);
  const [cargaTokens, setcargaTokens] = useState(true);
  const [cargaMirrors, setcargaMirrors] = useState(true);
  const [cargaPoaps, setcargaPoaps] = useState(true);
  
  const [loadingNextNft, setloadingNextNft] = useState(true);
  const [loadingNextDaos, setloadingNextDaos] = useState(true);
  const [loadingNextTokens, setloadingNextTokens] = useState(true);
  const [loadingNextMirrors, setloadingNextMirrors] = useState(true);
  const [loadingNextPoaps, setloadingNextPoaps] = useState(true);
  
  const [contadorError, setcontadorError] = useState(0);
  //let contadorMirror=0;
  const [BandErrorAddress, setBandErrorAddress] = useState(false);
  const [Feeds, setFeeds] = useState<any[]>([]);
  //console.log("inicio declaracion")
  const [Feedsupdate, setFeedsupdate] = useState<any>([]);
  const [posY, setposY] = useState(0);

  const getEnsWallets = async (list: listaEns) => {
    let temp: any, ens;

    if (!list) {
      return [];
    }

    if (list?.NFTs) {
      list.NFTs.map(async (el: any) => {
        const address = el.walletId;
        //ens = await lookupEnsAddress(address);
        setposY(window.scrollY);
        temp = {
          id: el.id,
          type: "nft",
          user: formatAddressShort(address),
          bandens: false,
          name: el.name,
          address: address,
          avatar: el.avatar,
          media: el.media,
          description: el.description,
          collectionContract: el.collectionContract,
          price: el.price,
          typeTransaction: el.typeTransaction,
          contract: el.contract,
          nftId: el.nftId,
          receiveDateAt: el.receiveDateAt,
          fechaOrd: dateNum(el.receiveDateAt),
        };
        setcargaNft(false);
        setErrorNft(false);
        setloadingNextNft(false);
        //console.log("Feeds",Feeds);
        if (
          Feeds.find((valor: any) => {
            // console.log("valor0",valor);
            if (valor.type == "nft") {
              //if (valor.id == temp.id) console.log("valor Repetido", valor);
              return valor.id == temp.id;
            } else return false;
          }) == undefined
        ) {
          if (page > 1) {
            if (
              Feeds.find((valor: any) => {
                //console.log("valor",valor)
                return valor.fechaOrd < temp.fechaOrd && valor.type == "nft";
              }) == undefined
            ) {
              let listFedd: any[] = Feeds;
              listFedd.push(temp);
              //.concat()
              //(Feeds:any[]) => [...Feeds, temp]
              //console.log("listFedd",listFedd);
              setFeeds(listFedd);
            } else {
              console.log("Tiempo menor al mostrado", temp);
              setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
            }
          } else {
            let listFedd: any[] = Feeds;
            listFedd.push(temp);
            setFeeds(listFedd);
          }
        } else {
          //console.log("se repitio NFT");
          //setFeedsupdate((Feedsupdates:any) => [...Feedsupdates, temp]);
        }
        setLoading(false);
      });
    }
    if (list?.DAOs) {
      list.DAOs.map(async (el) => {
        const address = el.walletId;
       // ens = await lookupEnsAddress(address);
        setposY(window.scrollY);
        temp = {
            id: el.id,
            type: "dao",
            user: formatAddressShort(address),
            bandens: false,
            address: address,
            avatar: el.avatar,
            link: el.link,
            media: el.media,
            answer: el.answer,
            entityName: el.entityName,
            name: el.proposalName,
            description: el.proposalDescription,
            receiveDateAt: el.receiveDateAt,
            fechaOrd: dateNum(el.receiveDateAt),
          };
          setcargaDaos(false);
          setErrorDaos(false);
          setloadingNextDaos(false);
        if (
          Feeds.find((valor: any) => {
            // console.log("valor0",valor);
            if (valor.type == "dao") {
              //if (valor.id == temp.id) console.log("valor Repetido", valor);
              return valor.id == temp.id;
            } else return false;
          }) == undefined
        ) {
        if (page > 1) {
            if (
              Feeds.find(
                (valor: any) => (valor.fechaOrd < temp.fechaOrd && valor.type == "dao")
              ) == undefined
            ) {
              let listFedd: any[] = Feeds;
              listFedd.push(temp);
              setFeeds(listFedd);
            } else {
              setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
              // console.log("Feedsupdate",Feedsupdate);
            }
          } else {
            let listFedd: any[] = Feeds;
            listFedd.push(temp);
            setFeeds(listFedd);
          }
        } else {
         // console.log("Se repitio dao",temp);
        }
        setLoading(false);
      });
    }
    if (list?.TOKENs) {
      list.TOKENs.map(async (el) => {
        const address = el.walletId;
        //ens = await lookupEnsAddress(address);
        setposY(window.scrollY);
        temp = {
          id: el.id,
          type: "token",
          user: formatAddressShort(address),
          bandens: false,
          address: address,
          media: el.destinationLogo,
          originLogo: el.originLogo,
          destinationLogo: el.destinationLogo,
          originCurrency: el.originCurrency,
          destinationCurrency: el.destinationCurrency,
          destinationAddress: el.destinationAddress,
          destinationValue: el.destinationValue,
          originValue: el.originValue,
          valueUSD: el.valueUSD,
          avatar: el.avatar,
          tokenId:el.tokenId,
          receiveDateAt: el.receiveDateAt,
          fechaOrd: dateNum(el.receiveDateAt),
        };
        setcargaTokens(false);
        setErrorTokens(false);
        setloadingNextTokens(false);
        if (temp.address==temp.destinationAddress){
         // console.log("valor excluido", temp);
        }else
        if (
          Feeds.find((valor: any) => {
            // console.log("valor0",valor);
            if (valor.type == "token") {
              //if (valor.id == temp.id) console.log("valor Repetido", valor);
              return valor.id == temp.id;
            } else return false;
          }) == undefined
        ) {
        if (page > 1) {
            if (
              Feeds.find(
                (valor: any) => (valor.fechaOrd < temp.fechaOrd && valor.type == "token")
              ) == undefined
            ) {
              let listFedd: any[] = Feeds;
              listFedd.push(temp);
              setFeeds(listFedd);
            } else {
              setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
              // console.log("Feedsupdate",Feedsupdate);
            }
          } else {
            let listFedd: any[] = Feeds;
            listFedd.push(temp);
            setFeeds(listFedd);
          }
        } else {
         // console.log("Se repitio token",temp);
        }

        setLoading(false);
      });
    }
    if (list?.Mirrors) {
      //console.log("list", list);
      list.Mirrors.map(async (el) => {
        const address = el.walletId;
        //ens = await lookupEnsAddress(address);
        setposY(window.scrollY);
        // console.log("window.scrollY",window.scrollY)
        // user: !ens ? formatAddressShort(address) : ens,
        // bandens: !ens ? false : true,
        temp ={
            id: el.id,
            type: "mirror",
            user: formatAddressShort(address),
            bandens: false,
            address: address,
            media: el.media,
            name: el.title,
            date: el.receiveDateAt,
            avatar: el.avatar,
            mirrorId: el.mirrorId,
            receiveDateAt: el.receiveDateAt,
            fechaOrd: dateNum(el.receiveDateAt),
          };
          setcargaMirrors(false);
          setErrorMirrors(false);
          setloadingNextMirrors(false);
        // contadorMirror:`${(page*20)-20+contadorMirror}`,
        // contadorMirror=contadorMirror+1;
        //setFeeds(Feeds => [...Feeds, temp]);
        // console.log("temp",temp);
        // console.log("valor.fechaOrd",temp.fechaOrd);
        // console.log("valor.fechaOrd>dateNum(el.receiveDateAt)",Feeds.find(valor=>(valor.fechaOrd<temp.fechaOrd&&valor.type=="mirror")));
        if (
          Feeds.find((valor: any) => {
            // console.log("valor0",valor);
            if (valor.type == "mirror") {
              //if (valor.id == temp.id) console.log("valor Repetido", valor);
              return valor.id == temp.id;
            } else return false;
          }) == undefined
        ) {
        if (page > 1) {
            if (
              Feeds.find(
                (valor: any) => (valor.fechaOrd < temp.fechaOrd && valor.type == "mirror")
              ) == undefined
            ) {
              let listFedd: any[] = Feeds;
              listFedd.push(temp);
              setFeeds(listFedd);
            } else {
              setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
              // console.log("Feedsupdate",Feedsupdate);
            }
          } else {
            let listFedd: any[] = Feeds;
            listFedd.push(temp);
            setFeeds(listFedd);
          }
        } else {
          //console.log("Se repitio mirror",temp);
        }

        //setcontadorMirror(contadorMirror =>contadorMirror+1)

        setLoading(false);
      });
    }
    if (list?.Poaps) {
      list.Poaps.map(async (el) => {
        const address = el.walletId;
        //ens = await lookupEnsAddress(address);
        setposY(window.scrollY);
        temp = {
          id: el.id,
          type: "poap",
          user: formatAddressShort(address),
          bandens: false,
          address: address,
          avatar: el.avatar,
          name: el.name,
          description: el.description,
          media: el.src,
          country: el.country,
          city: el.city,
          poapId: el.poapId,
          receiveDateAt: el.receiveDateAt,
          eventUrl: el.eventUrl,
          fechaOrd: dateNum(el.receiveDateAt),
        };
        setcargaPoaps(false);
        setErrorPoaps(false);
        setloadingNextPoaps(false);
        if (
          Feeds.find((valor: any) => {
            // console.log("valor0",valor);
            if (valor.type == "poap") {
             // if (valor.id == temp.id) console.log("valor Repetido poap", valor);
              return valor.id == temp.id;
            } else return false;
          }) == undefined
        ) {
        if (page > 1) {
          if (
            Feeds.find(
              (valor: any) =>
                valor?.eventUrl == temp.eventUrl &&
                valor.fechaOrd == temp.fechaOrd
            ) == undefined
          ) {
            if (
              Feeds.find(
                (valor: any) =>
                  valor.fechaOrd < temp.fechaOrd && valor.type == "poap"
              ) == undefined
            ) {
              let listFedd: any[] = Feeds;
              listFedd.push(temp);
              setFeeds(listFedd);
            } else {
              setFeedsupdate((Feedsupdates: any) => [...Feedsupdates, temp]);
              // console.log("Feedsupdate",Feedsupdate);
            }
          } else {
            console.log("Se repitio poap", temp);
          }
        } else {
          let listFedd: any[] = Feeds;
          listFedd.push(temp);
          setFeeds(listFedd);
        }
        }else {
         // console.log("Se repitio poap");
        }
        setLoading(false);
      });
    }
  };

  useEffect(
    function () {
      window.scrollTo(0, posY);
      //console.log("window.scrollY",window.scrollY)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [Feeds,posY]
  );
  useEffect(function () {
    window.scrollTo(0, 0);
    setLoading(true);
    setcargaNft(true);
    setcargaDaos(true);
    setcargaTokens(true);
    setcargaMirrors(true);
    setcargaPoaps(true);
    setFeeds([]);
    console.log("Se reseteo");
    setFeedsupdate([]);
    setPage(INITIAL_PAGE);
  }, []);

  // useEffect(
  //   function () {
  //     if(contadorError>4){}
  //   }, [contadorError]);
  useEffect(
    function () {
      console.log("page", page);
      if (!addressWallet) {
        return;
      }
      //if (page == INITIAL_PAGE)
      //if (page == INITIAL_PAGE && !BandErrorAddress) {console.log("Logagin true");return;  }
      //if (loadingNextPage) {console.log(" repitio el cargado"); return;}
      setBandErrorAddress(false);
      setLoadingNextPage(true);
      setloadingNextNft(true);
      setloadingNextDaos(true);
      setloadingNextTokens(true);
      setloadingNextMirrors(true);
      setloadingNextPoaps(true);

      getFeedsNFTs({ address:addressWallet, page, cantidad: 20 }).then((valor: any) => {
        if(valor?.NFTs){
          getEnsWallets({ NFTs: valor.NFTs });
        }else { console.log ("Error NFTs" )}
        
        if (valor?.NFTs?.length==0||!valor){setErrorNft(true);setcontadorError(contadorError+1);setLoading(false);}
        console.log(`getFeedsNFTs ${page}`, valor);
        setLoadingNextPage(false);
      });
      getFeedsPOAPs({ address:addressWallet, page, cantidad: 20 }).then((valor: any) => {
        if(valor?.Poaps){
          getEnsWallets({ Poaps: valor.Poaps });
        }else { console.log ("Error Poaps")}
        console.log(`getFeedsPOAPs ${page}`, valor);
        if (valor?.Poaps?.length==0||!valor){
          setErrorPoaps(true);
          setcontadorError(contadorError+1);
          setLoading(false);
        }
        setLoadingNextPage(false);
      });
      getFeedsMIRRORs({ address:addressWallet, page, cantidad: 20 }).then((valor:any) => {
        if(valor?.Mirrors){
          getEnsWallets({ Mirrors: valor.Mirrors });
        }else { console.log ("Error Mirrors")}
        console.log(`getFeedsMIRRORs ${page}`, valor);
        if (valor?.Mirrors?.length==0||!valor){
          setErrorMirrors(true);
          setcontadorError(contadorError+1);
          setLoading(false);
        }
        setLoadingNextPage(false);
      });
      getFeedsDAOs({ address:addressWallet, page, cantidad: 20 }).then((valor:any) => {
        if(valor?.DAOs){
          getEnsWallets({ DAOs: valor.DAOs });
        }else { console.log ("Error DAOs")}
        console.log(`getFeedsDAOs ${page}`, valor);
        if (valor?.DAOs?.length==0||!valor){
          setErrorDaos(true);
          setcontadorError(contadorError+1);
          setLoading(false);
        }
        setLoadingNextPage(false);
      });
      getFeedsTOKENs({ address:addressWallet, page, cantidad: 20 }).then((valor:any) => {
        if(valor?.TOKENs){
          getEnsWallets({ TOKENs: valor.TOKENs });
        }else { console.log (`Error TOKENs ${page}`)}
        console.log(`getFeedsTOKENs ${page}`, valor);
        if (valor?.TOKENs?.length==0||!valor){
          setcontadorError(contadorError+1);
          setLoading(false);
          setErrorTokens(true);
        }
        setLoadingNextPage(false);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addressWallet, page,setErrorDaos,setErrorMirrors,setErrorPoaps,setErrorNft,setErrorTokens,getFeedsTOKENs,getFeedsDAOs,getFeedsMIRRORs,getFeedsPOAPs,getFeedsNFTs]
  );
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [nameCat, setnameCat] = useState("All");
  const debounceHandleNextPage = useCallback(
    debounce(() => {
      setPage((prevPage:any) => prevPage + 1);
      console.log("next page");
    }, 200),
    [setPage],
  );

  const externalRef = useRef<HTMLDivElement>();
  const { isNearScreen } = useNearScreen('100px',loading ? null : externalRef,false);

  
  const bandCargandoNextPage = useMemo(() => {
    // console.log("feed filter",Feeds);
    // console.log("feed filter",Feeds.filter(element=>element.type=="nft").length);
    if(nameCat == "All"&&loadingNextPage ){return true}
    if(nameCat == "POAP"&&loadingNextPoaps){return true}
    if(nameCat == "Token"&&loadingNextTokens){return true}
    if(nameCat == "NFT"&&loadingNextNft){return true}
    if(nameCat == "DAO"&&loadingNextDaos){return true}
    if(nameCat == "Mirror"&&loadingNextMirrors){return true}
    return false;
  },[loadingNextNft,loadingNextDaos,loadingNextTokens,loadingNextMirrors,loadingNextPoaps,nameCat,loadingNextPage]);

  const bandCargando = useMemo(() => {
    // console.log("feed filter",Feeds);
    // console.log("feed filter",Feeds.filter(element=>element.type=="nft").length);
    if(nameCat == "All"&&loading ){return true}
    if(nameCat == "POAP"&&cargaPoaps){return true}
    if(nameCat == "Token"&&cargaTokens){return true}
    if(nameCat == "NFT"&&cargaNft){return true}
    if(nameCat == "DAO"&&cargaDaos){return true}
    if(nameCat == "Mirror"&&cargaMirrors){return true}
    return false;
  },[cargaNft,cargaDaos,cargaTokens,cargaMirrors,cargaPoaps,nameCat,loading]);

  const bandError = useMemo(() => {
    // console.log("feed filter",Feeds);
    // console.log("feed filter",Feeds.filter(element=>element.type=="nft").length);
    if(nameCat == "All"&&errorNft&&errorDaos&&errorTokens&&errorMirrors&&errorPoaps
    ){return true}
    if(nameCat == "POAP"&&errorPoaps){return true}
    if(nameCat == "Token"&&errorTokens){return true}
    if(nameCat == "NFT"&&errorNft){return true}
    if(nameCat == "DAO"&&errorDaos){return true}
    if(nameCat == "Mirror"&&errorMirrors){return true}
    return false;
    
  },[errorNft,errorDaos,errorTokens,errorMirrors,errorPoaps,nameCat]);

  //var bandCargando=false;
  
  //if(nameCat == "POAP"&&Feeds.filter(element=>element.type=="POAP")){bandCargando=true}
  
  //console.log("isNearScreen",isNearScreen);
  useEffect(
    function () {
      if (isNearScreen) debounceHandleNextPage();
    },
    [debounceHandleNextPage, isNearScreen]
  );
  // useEffect(() => {
    
  //   if(!loading)
  //   setPage(0);
  //  // setTimeout(()=>{setLoading(false)}, 30000);
  // }, []);
  //console.log("nameCat",nameCat);
  
  return (
    <>
      <div className=" max-w-5xl mx-auto px-4 sm:px-6 lg:px-8  bg-white ">
        {/* <TabsFeed href={"/feedFWB"} />   sm:px-[10%] lg:px-[20%]*/}
        <div className=" sm:flex  w-full  ">
        {/* sm:fixed z-30 */}
        <div className=" w-full  sm:w-[200px] lg:w-[300px] pt-2 sm:left-[10%]  ">
            <div className="flex flex-col flex-grow pt-1 pb-2  overflow-y-auto w-full  ">
              <div className="sm:mt-5 flex-grow flex flex-col  ">
        {/* <div className="sm:fixed w-full z-30 sm:w-[100px]  lg:w-[150px] sm:pt-[50px] left-0 sm:left-[1%] md:left-[5%] lg:left-[10%]  ">
            <div className="flex flex-col flex-grow pt-1 pb-4  overflow-y-auto w-full  ">
              <div className="sm:mt-5 flex-grow flex flex-col  "> */}
                <nav
                  className="flex-1 px-2 space-y-8 bg-white"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1">
                    <div
                      className="space-y-1"
                      role="group"
                      aria-labelledby="projects-headline"
                    >
                      {PrimaryNavigation.map(item => (
                        <button
                          key={item.name}
                          onClick={() => {
                            setnameCat(item.name);
                            window.scrollTo(0, 0);
                          }}
                          className={classNames(
                            item.name == nameCat
                            ? 'bg-gray-100 text-gray-900' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'flex items-center text-sm font-medium px-3 py-1 rounded-md w-full'
                          )}
                          // tabsslidenavbar
                        >
                          <span className="truncate text-center sm:text-left w-full">
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          {/* aqui va el listado que llega flex justify-center items-center  relative*/}
          {/* loading:{loading?"true":"false"}
          bandCargando:{bandCargando?"true":"false"}
          bandError:{bandError?"true":"false"} */}

          <div className=" w-full h-full px-2 sm:px-0  ">
          {/* sm:pl-[38%] lg:pl-[38%] xl:pl-[38%] 2xl:pl-[40%] */}
          {/* w-full sm:pl-[10%] lg:pl-[20%] 2xl:pl-[30%] */}
          <div className=" px-auto mx-auto pt-3 sm:pt-2   space-y-4   max-w-2xl ">
              {loading? (
                <div className="h-[300px] ">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              ) : bandCargando ? 
                bandError?<div className="text-sm text-gray-900">No items</div>
                :<div className="h-[300px] ">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              : (
                Feeds.sort((elem1: any, elem2: any) => {
                  // console.log("elem1",elem1)
                  return elem2.fechaOrd - elem1.fechaOrd;
                }).map((el: any) => {
                  //console.log("el",el)
                  return (
                    <>
                      {nameCat == "All" || nameCat == "POAP" ? (
                        <Mostrar_Poaps elem={el} />
                      ) : (
                        ""
                      )}
                      {nameCat == "All" || nameCat == "Token" ? (
                        <Mostrar_TOKENs elem={el} />
                      ) : (
                        ""
                      )}
                      {nameCat == "All" || nameCat == "NFT" ? (
                        <Mostrar_nfts elem={el} />
                      ) : (
                        ""
                      )}
                      {nameCat == "All" || nameCat == "DAO" ? (
                        <Mostrar_DAOs elem={el} />
                      ) : (
                        ""
                      )}
                      {nameCat == "All" || nameCat == "Mirror" ? (
                        <Mostrar_Mirrors elem={el} />
                      ) : (
                        ""
                      )}
                    </>
                  );
                })
              )}
              {loading||bandCargando?<></>
              :bandCargandoNextPage&&(
                <div className="h-[300px] ">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              )}
            </div>
            <div className="flex absolute w-full h-[5%] inset-y-0 top-[95%] left-0 items-center  pointer-events-none px-5  ">
              <div
                id="visor"
                ref={externalRef as LegacyRef<HTMLDivElement>}
                className={"h-[full] w-[100px]  "}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[300px] "></div>
    </>
  );
};

