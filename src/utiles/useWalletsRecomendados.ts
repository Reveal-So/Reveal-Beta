//import { consultarProfileAtom } from "../atoms/profileAddress";
import { lookupEnsAddress } from "../libs/ens";
import { formatAddressShort } from "../libs/utils";
import { getfollowings } from "../services/getfollowings";
import { getRecomendados } from "../services/getRecomendados";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
//import { useRecoilState } from "recoil";

const INITIAL_PAGE = 0

export function useWalletsRecomendados({ address }:{ address: any }) {
  const [loading, setLoading] = useState(true)
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [error, setError] = useState(false)
  const [Wallets, setWallets] = useState([])
  const getEnsWallets = async ( list:any ) => {
    let temp:any, ens:any, band = true,
      provider:any;
    // try {
    //   const { ethereum } = window;
    //   if (ethereum) {
    //     provider = new ethers.providers.Web3Provider(ethereum);
    //   } else {
    //     band = false;
    //   }
    // } catch (e) {
    //   band = false;
    // }
    //console.log("list Null", list);
    if (!list) { console.log("list Null", list); return [] }
    await list.map(async (el:any) => {
      const address = el.address;
      // if (!el.domain)
      // if( el.ens==""){
      //   if (band) {
      //     try {
      //       ens = await provider.lookupAddress(address);
      //     } catch (e) {
      //       ens = null;
      //     }
      //   } else {
      //     ens = await lookupEnsAddress(address);
      //   }
      // }else{ ens=el.ens; }

      temp = {
        user: el.domain?el.domain:formatAddressShort(address),//!ens ? el.domain?el.domain:formatAddressShort(address) : ens,
        bandens: !el.domain ? false : true,
        address: address,
        avatar: el.avatar,
        recommendationReason: el.recommendationReason,
        followerCount: el.followerCount,
      };
     // console.log("temp",temp);
      let listWallet: any = Wallets;
      listWallet.push(temp);
      setWallets(listWallet);
      setLoading(false);
    });
  }
  useEffect(function () {
    //console.log("valor address Recomendado1", address);
    setLoading(true)
    setWallets([])
    setPage(INITIAL_PAGE);
    if (address == undefined || address == null) {
      setError(true);
      return;
    }
    //if (page==INITIAL_PAGE){
    //  console.log("valor address Recomendado", address);
    getRecomendados({ address:address, page: INITIAL_PAGE, cantidad: 50 }).then((valor:any) => {
      console.log(`valor Recomendado ${page}`, valor);
      if (valor)
      getEnsWallets( valor.list );
      //if (valor.followingCount == 0) { setLoading(false); }
    })
    //}
  }, [])
  //address,profile,setProfile

  useEffect(function () {
    console.log("page", page);
    if (page === INITIAL_PAGE && !error) return
    if (address == undefined || address == null) { return }
    setError(false);
    setLoadingNextPage(true)
    getRecomendados({ address, page, cantidad: 50 }).then((valor) => {
      getEnsWallets( valor.list );
      console.log(`valor Recomendado ${page}`, valor);
      setLoadingNextPage(false)
    });
  }, [address, page])

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

  return { loading, loadingNextPage, error, Wallets, setPage }
}