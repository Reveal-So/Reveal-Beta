//import { listaBusqImgAddressAtom, listaImgAddressAtom } from "../../atoms/address";
import { formatAddresslast6Digit, formatAddresslastDigit } from "../../libs/utils";
import { createWalletAvatar, fetchWallet } from "../../libs/wallet";
import { useEffect, useState } from "react";
//import { useRecoilState } from "recoil";
import { classNames } from "./className";

export async function getImagenAvatar(address:string) {
  let query={};
  query = { "query": `query  {  identity(address: \"${address}\"){ address ens avatar } }` };
 // console.log("query",query);
 try {
    
    return await fetchWallet(address).then(async wallet => {
      //console.log("wallet", wallet);
       if (wallet.data)
         if (wallet.data.avatar) {
           return wallet.data.avatar;
         }
         let result;
      try {
        result = await fetch("https://api.cybertino.io/connect/", {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: "POST",
      body: JSON.stringify(query),
    });
    }catch(error){

    }
    if (!result) {
      return null;
    }
    const  {data}  = await result.json();
    //console.log("data666",data);
    if (!data) {
      return null;
    }
   
    if (!data.identity) {
      throw new Error(`Could not resolve ${address} via Follow.`);
    }
     const avatar = data.identity.avatar;
     if(data.identity.avatar!=""){
      //console.log("avatar",avatar);
      try{
        createWalletAvatar(address,data.identity.avatar);
      }catch(err:any){
        console.log("getImagenAvatar Error",err);
      }
      
      return avatar;
     }else {
      return null;
     }
     
     //
    // const  followersCount=data.information.profile.followerCount, 
    // followinsCount=data.information.profile.followingCount,
    // listFollowins=[],
    // listFollowers=[],
    // avatar=data.information.profile.avatar;
    // return {followersCount, followinsCount, listFollowins, listFollowers, avatar};
    

      }).catch(
        () => {
          return null;
        }
      )
    // const result = await fetch(`${API_URL}/api/SocialNetwork/profile?walletAddress=${address}`, {
    //   method: "GET",
    // });
    
  } catch (error) {
    console.log("error",error);
    return "";
  }
  
}

export const Avatars = ({address, tam, icono, bandNoBuscar}:{address?:any, tam?:any, icono?:any, bandNoBuscar?:boolean}) => {
  const [imagen, setimage] = useState("");
  const [listaBusqImgAddress, setlistaBusqImgAddress] = useState<any>();
  const [listaImgAddress, setlistaImgAddress] = useState<any>();
  
  useEffect(() => {
    if (bandNoBuscar){
      setimage(icono??"");
    }else{
      setimage("");
    }
    //console.log("bandBuscar",bandNoBuscar)
    if(!address||address==0||bandNoBuscar) return;
    //console.log("addressAvatar",address)
    if(!listaBusqImgAddress){
      setlistaBusqImgAddress([]);
    }
    if(!listaImgAddress){
      setlistaImgAddress([]);
    }
    // if (listaBusqImgAddress?.find((elem:any)=>elem?.address==address.toLowerCase())==undefined){
    //   //console.log("listaBusqImgAddress",listaBusqImgAddress);
    //   setlistaBusqImgAddress((list:any)=>[...list,{"address":address.toLowerCase()}]);
    //   //console.log("busca la imagen")
      getImagenAvatar( address.toLowerCase()).then((resp:any) => {
        if (resp) setimage(resp);
        // let temp:any={"address":address.toLowerCase(),"srcimage":resp};
        // setlistaImgAddress((list:any)=>[...list,temp]);
      });
    //}
    // if (listaImgAddress?.find((elem:any)=>elem?.address==address.toLowerCase())!=undefined){
    //   let temp=listaImgAddress.find((elem:any)=>elem?.address==address.toLowerCase());
    //   setimage(temp.srcimage);
    // }
  }, [address]);

  // useEffect(() => {
  //   if (!listaImgAddress){return;}
  //   //console.log("listaImgAddress",listaImgAddress);
  //   if (listaImgAddress.find((elem:any)=>elem?.address==address.toLowerCase())!=undefined){
  //     let temp=listaImgAddress.find((elem:any)=>elem?.address==address.toLowerCase());
  //     setimage(temp.srcimage);
  //   }
  // }
  // ,[listaImgAddress]);
  

  if (!address) {
    address = "0";
  }
  const formaterColor = (cadena: string) => {
    let cadResult = "";
    cadena == "0"
      ? (cadResult = "bg-gradient-to-r from-gray-300 to-[#6F41D8]")
      : cadena == "1"
      ? (cadResult = "bg-gradient-to-r from-red-400 to-[#6F41D8]")
      : cadena == "2"
      ? (cadResult = "bg-gradient-to-r from-orange-400 to-[#6F41D8]")
      : cadena == "3"
      ? (cadResult = "bg-gradient-to-r from-yellow-400 to-[#6F41D8]")
      : cadena == "4"
      ? (cadResult = "bg-gradient-to-r from-lime-400 to-[#6F41D8]")
      : cadena == "5"
      ? (cadResult = "bg-gradient-to-r from-green-400 to-[#6F41D8]")
      : cadena == "6"
      ? (cadResult = "bg-gradient-to-r from-teal-400 to-[#6F41D8]")
      : cadena == "7"
      ? (cadResult = "bg-gradient-to-r from-cyan-400 to-[#6F41D8]")
      : cadena == "8"
      ? (cadResult = "bg-gradient-to-r from-blue-400 to-[#6F41D8]")
      : cadena == "9"
      ? (cadResult = "bg-gradient-to-r from-indigo-400 to-[#6F41D8]")
      : cadena == "a"
      ? (cadResult = "bg-gradient-to-r from-purple-400 to-[#6F41D8]")
      : cadena == "b"
      ? (cadResult = "bg-gradient-to-r from-pink-400 to-[#6F41D8]")
      : cadena == "c"
      ? (cadResult = "bg-gradient-to-r from-rose-400 to-[#6F41D8]")
      : cadena == "d"
      ? (cadResult = "bg-gradient-to-r from-gray-900 to-[#6F41D8]")
      : cadena == "e"
      ? (cadResult = "bg-gradient-to-r from-yellow-900 to-[#6F41D8]")
      : cadena == "f"
      ? (cadResult = "bg-gradient-to-r from-teal-900 to-[#6F41D8]")
      : (cadResult = "bg-[#000]");
    return cadResult;
  };
  let dimension;
  dimension =
  tam == 6
      ? "h-24 w-24 ring-4 ring-white px-auto mx-auto"
      : tam == 3
      ? "h-16 w-16"
      : tam == 2
      ? "h-[50px] w-[50px] p-0 m-0"
      : tam == 1
      ? "h-[36px] w-[36px]"
      : "h-8 w-8";
  let clasePersonalizada = classNames(
    dimension,
    "rounded-full",
    formaterColor(formatAddresslastDigit(address).toLowerCase()),
  );
//   if (imagen)
//  console.log("imagen"+address,imagen);

  return (
    <>
      {!imagen? (
        <div className={clasePersonalizada} />
      ) : `${imagen}`.indexOf('webm')!=-1?  
      (
        <video controls={false} autoPlay={true} src={imagen} typeof="video/webm" className={classNames(dimension, "rounded-full")}/>
      )
      :(
        <img
          src={imagen}
          className={classNames(dimension, "rounded-full")}
        />
      )
      
      }
    </>
  );
};
