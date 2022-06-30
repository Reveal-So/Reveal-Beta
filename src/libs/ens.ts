//import { listaBusqImgAddressAtom, listaENSAtom,listabusqENSAtom } from "../atoms/address";
import wallet from "../pages/api/wallet/[walletId]";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import { createWalletEns, fetchWallet } from "./wallet";

export const lookupEnsAddress = async (
  address: string,
): Promise<string | null> => {
  // const [listabusqENS, setlistabusqENS] = useRecoilState(listabusqENSAtom);
  // const [listaENS, setlistaENS] = useRecoilState(listaENSAtom);
  // if(!listabusqENS){
  //   setlistabusqENS([]);
  // }
  // if(!listaENS){
  //   setlistaENS([]);
  // }
  // if (listabusqENS?.find(elem=>elem?.address==address.toLowerCase())==undefined){
  //   setlistabusqENS(list=>[...list,{"address":address.toLowerCase()}]);
  // }else { return; }
  try {
    const provider = new ethers.providers.CloudflareProvider();
    let temp,
      ens,
      band = true,
      provider2:any;
    // try {
    //   const { ethereum } = window;
    //   if (ethereum) {
    //     provider2 = new ethers.providers.Web3Provider(ethereum);
    //   } else {
    //     band = false;
    //   }
    // } catch (e) {
    //   band = false;
    // }
    

    try {
    const { ethereum } = window;
    if (ethereum) {
      provider2 = new ethers.providers.Web3Provider(ethereum);
    } else {
      band = false;
    }
  } catch (e) {
    band = false;
  }
  //console.log("ENS-address", address);
  //console.log("salio", address);
    if (address=='null'){ return null;} 
    //lstbusqENSAtom
    //lstENSAtom
    
 
    
    return await fetchWallet(address).then(async wallet => {
      //setlistaENS();
      //console.log("wallet", wallet);
      if (wallet.data)
        if (wallet.data.ens) {
          return wallet.data.ens;
        }
        try {
          ens = await provider.lookupAddress(address);
          ////console.log("ens2", ens);
        } catch (e) {
          ens = null;
        }
      
      //console.log("ens1", ens);
      if (ens) {
        createWalletEns(address, ens)
        return ens;
      } else {
        if (band) {
          try {
            ens = await provider2.lookupAddress(address);
            //console.log("ens2", ens);
          } catch (e) {
            ens = null;
          }
          if (ens) {
            createWalletEns(address, ens)
            return ens;
          } else {
            return ens;
          }
        } else
          return;
      }
    }).catch(
      async() => {
        try {
          ens = await provider.lookupAddress(address);
          ////console.log("ens2", ens);
        } catch (e) {
          ens = null;
        }
      
      //console.log("ens1", ens);
      
          try {
            ens = await provider2.lookupAddress(address);
            //console.log("ens2", ens);
          } catch (e) {
            ens = null;
          }
          if (ens) {
            createWalletEns(address, ens)
            return ens;
          } else {
            return ens;
          }
      }
    )
    //const ens = await provider.lookupAddress(address);


    //console.log("paso");
  } catch (error) {
    //console.log("error22",error)
    return null;
  }
};

export const resolveEnsName = async (
  ensName: string,
): Promise<string | null> => {
  try {
    const provider = new ethers.providers.CloudflareProvider();
    const address = await provider.resolveName(ensName);
    return address;
  } catch (error) {
    return null;
  }
};

export const lookupEnsAddressSystem = async (
  address: string,
): Promise<string | null> => {
  // const [listabusqENS, setlistabusqENS] = useRecoilState(listabusqENSAtom);
  // const [listaENS, setlistaENS] = useRecoilState(listaENSAtom);
  // if(!listabusqENS){
  //   setlistabusqENS([]);
  // }
  // if(!listaENS){
  //   setlistaENS([]);
  // }
  // if (listabusqENS?.find(elem=>elem?.address==address.toLowerCase())==undefined){
  //   setlistabusqENS(list=>[...list,{"address":address.toLowerCase()}]);
  // }else { return; }
  try {
    const provider = new ethers.providers.CloudflareProvider();
    let temp,
      ens,
      band = true,
      provider2:any;
    // try {
    //   const { ethereum } = window;
    //   if (ethereum) {
    //     provider2 = new ethers.providers.Web3Provider(ethereum);
    //   } else {
    //     band = false;
    //   }
    // } catch (e) {
    //   band = false;
    // }
    

    try {
    const { ethereum } = window;
    if (ethereum) {
      provider2 = new ethers.providers.Web3Provider(ethereum);
    } else {
      band = false;
    }
  } catch (e) {
    band = false;
  }
  //console.log("ENS-address", address);
  //console.log("salio", address);
    if (address=='null'){ return null;} 
    //lstbusqENSAtom
    //lstENSAtom
    
 
       //setlistaENS();
      //console.log("wallet", wallet);
      
        try {
          ens = await provider.lookupAddress(address);
          ////console.log("ens2", ens);
        } catch (e) {
          ens = null;
        }
      
      //console.log("ens1", ens);
      if (ens) {
        createWalletEns(address, ens)
        return ens;
      } else {
        if (band) {
          try {
            ens = await provider2.lookupAddress(address);
            //console.log("ens2", ens);
          } catch (e) {
            ens = null;
          }
          if (ens) {
            createWalletEns(address, ens)
            return ens;
          } else {
            return ens;
          }
        } else
          return null;
      }
  
    //const ens = await provider.lookupAddress(address);


    //console.log("paso");
  } catch (error) {
    //console.log("error22",error)
    return null;
  }
};