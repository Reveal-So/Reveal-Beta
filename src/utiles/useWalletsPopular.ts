//import { consultarProfileAtom } from "../atoms/profileAddress";
import { lookupEnsAddress } from "../libs/ens";
import { formatAddressShort } from "../libs/utils";
import { getfollowings } from "../services/getfollowings";
import { getPopular } from "../services/getPopular";
import { getRecomendados } from "../services/getRecomendados";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import debounce from "just-debounce-it";
//import { useRecoilState } from "recoil";

const INITIAL_PAGE = 0

export function useWalletsPopular({ address }:{ address: any }) {
  const [WalletsPopular, setWalletsPopular] = useState<any>([])
  const [loadingPopular, setLoadingPopular] = useState(false)
  const [loadingNextPagePopular, setLoadingNextPagePopular] = useState(false)
  const [page, setPagePopular] = useState(INITIAL_PAGE)
  //const [profile, setProfilePopular] = useRecoilState(consultarProfileAtom);//useState({});//useContext()
 // const [profile, setProfilePopular] = useState<any>();//useState({});//useContext()
  const [errorPopular, setErrorPopular] = useState(false)
  
  const getEnsWallets = async ({ list }:{ list:any } = { list: null }) => {
    let temp:any, ens:any, band = true,
      provider:any;
    try {
      
      const { ethereum } = window;
      if (ethereum) {
        provider = new ethers.providers.Web3Provider(ethereum);
      } else {
        band = false;
      }
    } catch (e) {
      band = false;
    }
    if (!list) { console.log("list Null", list); return [] }
    await list.map(async (el:any) => {
      const address = el.address;
      if (!el.domain)
      if( el.ens==""){
        if (band) {
          try {
            ens = await provider.lookupAddress(address);
          } catch (e) {
            ens = null;
          }
        } else {
          ens = await lookupEnsAddress(address);
        }
      }else{ ens=el.ens; }

      temp = {
        user: !ens ? el.domain?el.domain:formatAddressShort(address) : ens,
        bandens: !ens ? false : true,
        address: address,
        avatar: el.avatar,
        recommendationReason: el.recommendationReason,
        followerCount: el.followerCount,
      };
      let listWallet: any[] = WalletsPopular;
      listWallet.push(temp);
      setWalletsPopular(listWallet);
      setLoadingPopular(false);
    });
  }
  useEffect(()=> {
    //if(loadingPopular==true) return;
    setLoadingPopular(true)
    setWalletsPopular([]);
    setPagePopular(INITIAL_PAGE);
    // if (address == undefined || address == null) {
    //   setError(true);
    //   return;
    // }
    //if (page==INITIAL_PAGE){
    getPopular({ address}).then((valor) => {
      console.log("valor popular", valor);
      getEnsWallets({ list: valor.list });
      
      //if (valor.followingCount == 0) { setLoading(false); }
    })
    //debounce(//},400)
  }, [])
   
  //address,profile,setProfile

//   useEffect(function () {
//     console.log("page", page);
//     if (page === INITIAL_PAGE && !error) return
//     if (address == undefined || address == null) { return }
//     setError(false);
//     setLoadingNextPage(true)
//     getRecomendados({ address, page, cantidad: 50 }).then((valor) => {
//       getEnsWallets({ list: valor.list });
//       //console.log("valor", valor);
//       setLoadingNextPage(false)
//     });
//   }, [address, page])

  // useEffect(function () {
  // // console.log("Wallets",Wallets);
  // if (page === INITIAL_PAGE)  
  //   setLoadingNextPage(true)

  //   // getGifs({ keyword: keywordToUse, page, rating })
  //   //   .then(nextGifs => {
  //   //     setGifs(prevGifs => prevGifs.concat(nextGifs))
  //   //     setLoadingNextPage(false)
  //   //   }), rating, setGifs
  // }, [Wallets,setWallets])

  return { loadingPopular, loadingNextPagePopular, errorPopular, WalletsPopular, setPagePopular }
}