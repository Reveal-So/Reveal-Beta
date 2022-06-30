import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UserContext from "../../context/User/UserContext";

// import { authenticatedAtom } from "../../atoms/authenticated";
// import { profileAddressAtom } from "../../atoms/profileAddress";
// import { web3ProviderAtom } from "../../atoms/web3Provider";
import { fetchWallet, createWallet, registrarLogWallet } from "../../libs/wallet";
import { getUpdate } from "../../services/getfollowings";
//import debounce from "just-debounce-it";

export const useWeb3Provider = () => {
  
  const {setAddress,address,web3Provider, setWeb3Provider} = useContext(UserContext);
  const router = useRouter();

  useEffect( () => {
    if (!web3Provider) {
      return;
    }
    try{
      //console.log("Web3profileAddress",profileAddress)
      //async()=>await
      if (!address)
      web3Provider.getSigner().getAddress().then((address:any)=>{
        setAddress(address);
        getUpdate(address);
        registrarLogWallet(address);  
        //router.push("/feed"); 
        });
    }catch(e){
      console.log("error de login",e)
    }
    //setAddress
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Provider]);

  //const [isBuscado, setisBuscado] =useState(false);
//   const debounceHandlefetchData = useCallback(
//     debounce(() => {
//       console.log("call fetchData() ")
//       fetchData();
//     }, 800),
//     [],
//   );

    // useEffect(() => {
      
    // if(profileAddress) {
    //   fetchData();
    //   console.log("call fetchData() ")
    //   setIsAuthenticated(true);
    // }
    // }, [isBuscado]);

    

  

  //return { web3Provider, setWeb3Provider };
};
