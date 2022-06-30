import { providers } from "ethers";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react";
import CyberConnect, { Env } from "@cyberlab/cyberconnect";
// import { useRecoilValue, useRecoilState } from "recoil";
// import { followingProfileAtom } from "../../atoms/follow";
import { useProfileAddress } from "../../hooks/useProfileAddress";
import { classNames } from "./className";


const useGetTwitter = async ( address :any): Promise<any> => {
  let query = {};
  if (!address) return;
  //query = { "query": `query  { allFollowings(address: \"${address}\"){   } }` };
  query = {
    query: `query  { identity(address: \"${address}\"){ social{twitter} } }`,
  };

  //console.log("query",query);//address
  try {
    const result = await fetch("https://api.cybertino.io/connect/", {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: "POST",
      body: JSON.stringify(query),
    });
    const { data } = await result.json();
    if (!data) {
      return;
    }
    //allFollowings
    if (!data.identity) {
      throw new Error(`Could not resolve ${address} via Follow.`);
    }

    // const followProfile = data.allFollowings;
    const twitter = data.identity.social.twitter;

    //console.log("followProfile5",followProfile);
    return twitter;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const ButtonTwitter: FC<
  ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
      addressToFollow?: string;
      connectedChildren?: string;
    }
> = ({ children, addressToFollow, connectedChildren, ...props }) => {
  const [followingProfile, setfollowingProfile] =useState<any>();
  const [valor, setvalor] = useState(null);

  useEffect(() => {
    if (!addressToFollow) return;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetTwitter( addressToFollow ).then(res => {
      setvalor(res);
    });
  }, [addressToFollow]);

  return (
    <>
      <div className="sm:w-[130px] pt-1 w-full">
        <div className={classNames(valor?"bg-[#1B90EE]":"bg-[#E4F1FC]",
        " w-7 h-7 rounded-full itens-center text-center pt-1 hover:ring-white hover:ring-2 mx-auto ")}>
          {valor?
          <a
          href={`https://twitter.com/${valor}`}
          target={"_blank"}
          rel="noreferrer" 
          className="mx-auto my-auto text-white hover:text-gray-400 
                   w-full h-full "
        >
          {/* focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white */}
          <span className="sr-only">View notifications</span>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-5 w-5 mx-auto my-auto"
          >
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
          {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
        </a>
          :<a
          className="mx-auto my-auto text-white hover:text-gray-400 
                   w-full h-full "
        >
          {/* focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white */}
          <span className="sr-only">View notifications</span>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-5 w-5 mx-auto my-auto"
          >
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
          {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
        </a>}
        </div>
      </div>

      {/* {profileAddress?addressToFollow.toLowerCase()==profileAddress.toLowerCase()?"":
        (web3Provider)?
        valor?<button onClick={Unfollow} {...props} ><span className="px-3.5">Unfollow</span> </button>:
        <button onClick={Follow} {...props} ><span className="px-3.5">follow</span></button>:"":""} */}
    </>
  );
};
