//import { consultarProfileAtom } from "../atoms/profileAddress";
import { lookupEnsAddress } from "../libs/ens";
import { formatAddressShort } from "../libs/utils";
import { getfollowings } from "../services/getfollowings";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import debounce from "just-debounce-it";


const INITIAL_PAGE = 1

export function useWalletsfollowings ({ address } = { address: null }) {
  const [loading, setLoading] = useState(false)
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [ultimaPage, setUltimaPage] = useState(0);
  const [error,setError]=useState(false);
  const [Wallets,setWallets]=useState<any>([])
  const [posY, setposY] = useState(0);
  const getEnsWallets=async ({list}:{list:any}= { list: null }) =>{
    let temp:any;
    //console.log("list",list)
    await list?.map(async (el:any) => {
      const ens = null;// await lookupEnsAddress(el.address);
      setposY(window.scrollY);
      if (ens !== null) {
        temp={name:ens,address:el.address,bandens:true,avatar: el.avatar,};
      } else {
        temp={name:formatAddressShort(el.address),address:el.address,bandens:false,avatar: el.avatar,};
      }
      let listWallet: any[] = Wallets;
      listWallet.push(temp);
      setWallets(listWallet);
      setLoading(false);
      });
  }
  
  useEffect( function () {
    window.scrollTo(0, posY);
    //console.log("window.scrollY",window.scrollY)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Wallets,posY] );

  useEffect(()=> {
    if (ultimaPage>INITIAL_PAGE){
      setLoading(true)
      setWallets([]) 
      setPage(INITIAL_PAGE);
      setUltimaPage(0);
    }else return;
    
    //if(address==undefined||address==null) { return }
    // if (page==INITIAL_PAGE){
    //   getfollowings({ address, page:INITIAL_PAGE,cantidad:20 }).then((valor)=>{
    //     getEnsWallets({list:valor.listfollowings});
    //     console.log(`valor ${page}`,valor);
    //     //if (valor.followingCount==0){setLoading(false);}
    //     //setLoading(false);
    //   })
    // }
    console.log(`paso inicio ${page}`);
  }, [])
  //address,profile,setProfile

  useEffect( debounce(()=> {
    console.log("page ",page);
    console.log("ultimaPage ",ultimaPage);
    if(address==undefined||address==null) { return }
  //if (page == INITIAL_PAGE) return
 // if (loadingNextPage) return
  if (ultimaPage===page) return
  setUltimaPage(page);
   console.log("page paso");
   if (!address) return
    setLoadingNextPage(true)
    getfollowings({ address, page,cantidad:20 }).then((valor:any)=>{
      getEnsWallets({list:valor.listfollowings});
      console.log(`valor2 ${page}`,valor);
      setLoadingNextPage(false)
     // setLoading(false);
    });
  },200)
  , [address,page])

   

  return {loading, loadingNextPage, error, Wallets, setPage}
}