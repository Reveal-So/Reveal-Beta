import { providers } from "ethers";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react";
import { useRouter } from "next/router";

const useGetTwitter = async ({ address } = { address: null }): Promise<any> => {
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

export const ButtonEdit: FC<
  ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
      addressToFollow?: string;
      connectedChildren?: string;
    }
> = ({ children, addressToFollow, connectedChildren, ...props }) => {
    const { asPath } = useRouter();


  return (
    <>
    {
        asPath.endsWith("/edit")?
        <Link passHref href="/profile">
                  {/* className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700" */}
                <a 
                className=" inline-flex items-center px-6 py-2 border border-gray-100 text-base font-medium rounded-full 
                
              shadow-sm text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                >
                    <span className="">
                    Done Editing
                    </span>
                  </a>
                </Link> 
        :
        <Link passHref href="/profile/edit">
        {/* className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700" */}
      <a 
      className=" inline-flex items-center px-6 py-2 border border-gray-100 text-base font-medium rounded-full 
      
    shadow-sm text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
      >
          <span className="">
            Edit Profile
          </span>
        </a>
      </Link>         
    }
    
    </>
  );
};


