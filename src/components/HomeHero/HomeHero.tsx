import { useContext, useEffect } from 'react'
import { LandingScreen } from "../LandingScreen/LandingScreen";
import { useRouter } from "next/router";
import UserContext from "../../context/User/UserContext";

export const HomeHero = () => {
  const router = useRouter();
  //const { address } = useContext(UserContext);
  const {  address, web3Provider} = useContext(UserContext);
  // useEffect(() => {
  //   if (address&&web3Provider){router.push("/feed");}
  //   else{ router.push("/"); }
  //   console.log("use effect address",address)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address]);
  if (!address){
    return <LandingScreen/>;
  }else{
    router.push("/feed");
    return <></>
  }
};