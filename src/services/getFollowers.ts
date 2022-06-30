import { API_URL } from "../const/api";

export const getFollowers = async (
    { address, page, cantidad } = { address: null, page: 0, cantidad: 20 },
  ): Promise<any> => {
    let query = {};
    // if (!page) {
    //   query = {
    //     query: `query  { identity(address: \"${address}\"){  address followerCount  followers( first:${cantidad} ) { pageInfo { endCursor hasNextPage } list { address } } }     }`,
    //   };
    // } else {
    //   query = {
    //     query: `query  { identity(address: \"${address}\"){  address followerCount  followers( first:${cantidad} after:\"${
    //       page!=1?(((page-1) * cantidad)-1 ):""
    //     }\" ) { pageInfo { endCursor hasNextPage } list { address } } }     }`,
    //   };
    // }
    //console.log("query",query);
    try {
      const result = await fetch(`${API_URL}/api/SocialNetwork/followers?walletAddress=${address}&first=${cantidad}&after=${
        page!=1?(((page-1) * cantidad)-1 ):""
      }`, {
        method: "GET",
      });
      // const result = await fetch("https://api.cybertino.io/connect/", {
      //   headers: new Headers({ "Content-Type": "application/json" }),
      //   method: "POST",
      //   body: JSON.stringify(query),
      // });
      const  data  = await result.json();
      if (!data) {
        return;
      }
      if (!data.information) {
        throw new Error(`Could not resolve ${address} via Follow.`);
      }
      const followProfile = 0;
     // console.log("data.information", data.information);
      const followersCount = 1,
        // followinsCount=data.identity.followingCount,
        // listFollowins=data.identity.followings.list,
        listFollowers = data.information.followers;
      return { followersCount, listFollowers };
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };