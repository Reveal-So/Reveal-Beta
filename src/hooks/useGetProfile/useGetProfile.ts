 import { resolveEnsName, lookupEnsAddress } from "../../libs/ens";
 import { utils } from "ethers";
 import { formatAddressShort } from "../../libs/utils";
 import { profile } from "../../types/profile";
import { useResolveFollowProfile } from "../useResolveFollowProfile";
import { fetchWalletENS } from "../../libs/wallet";

const BuscarDBAddress= async(keyword: any )=>{
return await fetchWalletENS(keyword).then(async wallet => {
  console.log("wallet", wallet);
  if (wallet.data)
    if (wallet.data.id) {
      return wallet.data.id;
    }
    return
}).catch(err=>{
  return
});
}
export const useGetProfile= async( keyword :any)=>{
   if (!keyword ) {
     return {};
   }
  //     notFound: true,
  //     revalidate: 300,
  //   };
  // }  
  //const slug = slugs[0];
  let address: any;
  let ensName: any; 
  let respuesta:any;//= new profile();
  //console.log("keyword", keyword);
  if (keyword.endsWith(".eth")) {
    try {
      address = await resolveEnsName(keyword);
    } catch (err) {
      console.log(err);
    }
    if (!address){
      address= await BuscarDBAddress({keyword});
    }
    ensName = keyword;
  } else if (utils.isAddress(keyword)) {
    address = keyword;
    try {
      ensName = await lookupEnsAddress(keyword);
    } catch (err) {
      console.log(err);
    }
  }
   else {
    try {
      address = await resolveEnsName(keyword + ".eth");
    } catch (err) {
      console.log(err);
    }
    ensName = keyword + ".eth";
  }

  if (!utils.isAddress(address)) {
    return {
      notFound: true,
      revalidate: 300,
    };
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {followersCount, followinsCount, avatar}=await useResolveFollowProfile(address);

  // console.log("address",address);
  // console.log("ensName",ensName);
  respuesta ={
    address:address,
    ens:ensName,
    bandEns:(ensName!=undefined),
    addressTrucate:formatAddressShort(address),
    followerCount:followersCount,
    followingCount:followinsCount,
    avatar:avatar,
   };

  return respuesta;

}