//import { consultarProfileAtom } from "../atoms/profileAddress";
import { lookupEnsAddress } from "../libs/ens";
import { formatAddressShort } from "../libs/utils";
import { getFollowers } from "../services/getFollowers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import debounce from "just-debounce-it";
//import { useRecoilState } from "recoil";

const INITIAL_PAGE = 1;

export function useWalletsFollowers({ address } = { address: null }) {
  const [Wallets,setWallets]=useState<any>([]);
  const [loading, setLoading] = useState(false)
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [ultimaPage, setUltimaPage] = useState(0);
  const [error,setError]=useState(false);
  
  const [posY, setposY] = useState(0);

  const getEnsWallets=async ({list}:{list:any}= { list: null }) =>{
    
    await list?.map(async (el:any) => {
      let temp:any;
      const ens = null;//await lookupEnsAddress(el.address);
      setposY(window.scrollY);
      if (ens !== null) {
        temp={name:ens,address:el.address,bandens:true,avatar: el.avatar,};
      } else {
        temp={name:formatAddressShort(el.address),address:el.address,bandens:false,avatar: el.avatar,};
      }
      let listWallet: any = Wallets;
      listWallet.push(temp);
      setWallets(listWallet);
      // console.log("listWallet",listWallet);
      // console.log("temp",temp);
      // console.log("Wallets",Wallets);
      setLoading(false);
      });
  }
  useEffect( function () {
      window.scrollTo(0, posY);
      //console.log("window.scrollY",window.scrollY)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Wallets,posY] );

  useEffect(()=> {
    //if (ultimaPage>INITIAL_PAGE){
      console.log("reseteo")
      setLoading(true)
      setWallets([]) 
      setPage(INITIAL_PAGE);
      setUltimaPage(0);
   // }else return;
    
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //address,profile,setProfile

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
     getFollowers({ address, page,cantidad:20 }).then((valor:any)=>{
      console.log(`valor2 ${page}`,valor);
      //if ()
      getEnsWallets({list:valor.listFollowers});
      
      setLoadingNextPage(false)
     // setLoading(false);
    });
  },200)
  , [address,page])

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
//   const [loading, setLoading] = useState(true);
//   const [loadingNextPage, setLoadingNextPage] = useState(false);
//   const [page, setPage] = useState(INITIAL_PAGE);
//   const [profile, setProfile] = useState<any>();
//   const [error, setError] = useState(false);
//   const [Wallets, setWallets] = useState([profile]);
//   const getEnsWallets = async ({ list }:{ list:any} = { list: null }) => {
//     let temp:any, ens;
//       await list.map(async (el:any) => {
//         const ens = await lookupEnsAddress(el.address);
//         if (ens !== null) {
//           temp = { name: ens, address: el.address, bandens: true };
//         } else {
//           temp = {
//             name: formatAddressShort(el.address),
//             address: el.address,
//             bandens: false,
//             avatar: el.avatar,
//           };
//         }
//         setWallets(Wallets => [...Wallets, temp]);
//         setLoading(false);
//       });
    
//   };
//   useEffect(
//     function () {
//       setLoading(true);
//       setWallets([]);
//       setPage(INITIAL_PAGE);
//       if (address == undefined || address == null) {
//         return;
//       }
//       if (page == INITIAL_PAGE) {
//         getFollowers({ address, page:INITIAL_PAGE, cantidad: 20 }).then(valor => {
//           getEnsWallets({ list: valor.listFollowers });
//           ///console.log("valor", valor);
//          // if (valor.followersCount == 0) {
//            // setLoading(false);
//           //}
//         });
//       }
//     },  []);
// //address, profile, setProfile
//   useEffect(
//     function () {
//       console.log("page", page);
//       if (page === INITIAL_PAGE) return;

//       setLoadingNextPage(true);
//       getFollowers({ address, page, cantidad: 20 }).then(valor => {
//         if (valor)
//         getEnsWallets({ list: valor.listFollowers });
//         setLoading(false);
//        // console.log("valor", valor);
//       });
//     },
//     [address, page],
//   );

//   // useEffect(function () {
//   // // console.log("Wallets",Wallets);
//   // if (page === INITIAL_PAGE)
//   //   setLoadingNextPage(true)

//   //   // getGifs({ keyword: keywordToUse, page, rating })
//   //   //   .then(nextGifs => {
//   //   //     setGifs(prevGifs => prevGifs.concat(nextGifs))
//   //   //     setLoadingNextPage(false)
//   //   //   }), rating, setGifs
//   // }, [Wallets,setWallets])

  return { loading, loadingNextPage, error, Wallets, setPage, setWallets };
}