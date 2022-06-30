import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react";
import CyberConnect, { Env } from "@cyberlab/cyberconnect";
//import { useRecoilValue, useRecoilState } from "recoil";
//import { followingProfileAtom, } from "../../atoms/follow";

import UserContext from "../../context/User/UserContext";
import { setUpdateFollower } from "../../services/setUpdateFollower";

// const useGetFollowing = async ( {address}={address:null}): Promise<any>=>{
//   let query={};
//   query = { "query": `query  { allFollowings(address: \"${address}\"){   } }` };
//   //query = { "query": `query  { identity(address: \"${address}\"){ followings (first:50)  {    list         {   address   }      }  } }` };

//     //console.log("query",query);//address
//     try {
//       const result = await fetch("https://api.cybertino.io/connect/", {
//         headers: new Headers({ "Content-Type": "application/json" }),
//         method: "POST",
//         body: JSON.stringify(query),
//       });
//       const { data } = await result.json();
//       if (!data) {
//         return;
//       }
//       //allFollowings
//       if (!data.identity) {
//         throw new Error(`Could not resolve ${address} via Follow.`);
//       }

//      // const followProfile = data.allFollowings;
//       const followProfile = data.identity.followings.list;

//       //console.log("followProfile5",followProfile);
//       return followProfile;

//     } catch (error) {
//       console.log("error",error);
//       return null;
//     }
// }

export const ButtonFollow: FC<
  ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
      addressToFollow?: string;
      connectedChildren?: string;
    }
> = ({ children, addressToFollow, connectedChildren, ...props }) => {
  //useWeb3Provider();
  //const { web3Provider,setWeb3Provider } = useContext(UserContext);
  //const web3Modal = useWeb3Modal();
  //const [followingProfile, setfollowingProfile] = useRecoilState(followingProfileAtom);
  //const [followingProfile, setfollowingProfile] = useState<any>([]);
  //const [address, web3Provider] = useContext(UserContext);

  //console.log("user",user);
  //setfollowingProfile
  //const profileContext = useContext(ProfileContext);

  //const {, } = useRecoilState(followingProfileAtom);
  //const { profileAddress, setProfileAddress } = useProfileAddress();
  const [valor, setvalor] = useState(null);
  const { address, web3Provider, followings ,setFollowings } = useContext(UserContext);
  // const connectWallet = useCallback(() => {
  //   return web3Modal?.connect()
  //     .then(provider => {
  //         return new providers.Web3Provider(provider);
  //       })
  //     .then(setWeb3Provider);
  // }, [setWeb3Provider, web3Modal]);

  // useEffect(() => {
  //   if (!web3Modal?.cachedProvider) {
  //     return;
  //   }
  //   connectWallet();
  // }, [connectWallet, web3Modal?.cachedProvider]);

  useEffect(() => {
    if (!followings) return;
    if (addressToFollow)
      setvalor(
        followings.find(
          (el: any) => el.address == addressToFollow.toLowerCase()
        )
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followings, setFollowings]);

  const agregarFollowing = (address: string) => {
    console.log("se agrego", address);
    console.log("se followings", followings);
    let Wallets:any[]=followings;
    Wallets.push({ address: address.toLowerCase() });
    setFollowings(Wallets);
    // setfollowingProfile((Wallets: any) => [
    //   ...Wallets,
    //   ,
    // ]);
  };
  const eliminarFollowing = (address: string) => {
    console.log("se elimino", address);
    let Wallets = followings.filter(
      (e: any) => e.address.toLowerCase() != address.toLowerCase()
    );
    setFollowings(Wallets);
  };
  function Follow() {
    try {
      const cyberConnect = new CyberConnect({
        provider: null,
        namespace: "CyberConnect",
        env: Env.PRODUCTION,
      });
      if (web3Provider) {
        cyberConnect.provider = web3Provider.provider;
      }
      setUpdateFollower({address:address,addressTofollow:addressToFollow,band:true});
      agregarFollowing(addressToFollow ? addressToFollow : "");
      cyberConnect.connect(addressToFollow ? addressToFollow : "");
    } catch (e) {
      console.log(e);
    }
  }
  function Unfollow() {
    try {
      const cyberConnect = new CyberConnect({
        provider: null,
        namespace: "CyberConnect",
        env: Env.PRODUCTION,
      });
      if (web3Provider) {
        cyberConnect.provider = web3Provider.provider;
      }
      setUpdateFollower({address:address,addressTofollow:addressToFollow,band:false});
      eliminarFollowing(addressToFollow ? addressToFollow : "");
      cyberConnect.disconnect(addressToFollow ? addressToFollow : "");
    } catch (e) {
      console.log(e);
    }
  }
  if (!addressToFollow) {
    return <></>;
  }
  // let valor=useMemo(()=>{
  //   console.log("followingProfileff",followingProfile);
  //   return !followingProfile?undefined:followingProfile.find(el=>el.address==addressToFollow.toLowerCase());

  // }
  // ,[followingProfile]);
  //console.log("se refresco")
  return (
    <>
      {address ? (
        addressToFollow.toLowerCase() == address.toLowerCase() ? (
          ""
        ) : web3Provider ? (
          valor ? (
            <button onClick={Unfollow} {...props}>
              <span className="px-3.5">Unfollow</span>{" "}
            </button>
          ) : (
            <button onClick={Follow} {...props}>
              <span className="px-3.5">follow</span>
            </button>
          )
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
};
