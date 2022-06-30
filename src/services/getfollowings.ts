import { API_URL } from "../const/api";

export const getfollowings= async ({ address, page, cantidad }={address:null,page:0,cantidad:20}): Promise<any> =>{
  //const cantidadXpag=50;//,pagina=page+1;
  let query={};
  if(!page){
    query = { "query": `query  { identity(address: \"${address}\"){  address followingCount  followings( first:${cantidad} ) { pageInfo { endCursor hasNextPage } list { address } } }     }` };
  }else{
    query = { "query": `query  { identity(address: \"${address}\"){  address followingCount  followings( first:${cantidad} after:\"${(page*cantidad)-1}\" ) { pageInfo { endCursor hasNextPage } list { address } } }     }` };
  }
 
  //  pageInfo { endCursor hasNextPage }           list { address }         }      
  //query = { "query": `query  {  identity(address: \"${address}\"){ address followingCount followerCount followings(first:50) { pageInfo { endCursor hasNextPage } list { address } } followings(first:50) { pageInfo { endCursor hasNextPage } list { address } } } }` };
  console.log("query",`${API_URL}/api/SocialNetwork/followings?walletAddress=${address}&first=${cantidad}&after=${
    page!=1?(((page-1) * cantidad)-1 ):""
  }`);
  console.log("page kll",page);

  
  try {
    const result = await fetch(`${API_URL}/api/SocialNetwork/followings?walletAddress=${address}&first=${cantidad}&after=${
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
    //const followProfile = data.identity;
    //console.log("data.information",data.information);
    const followingCount=0, 
    // followinsCount=data.identity.followingCount,1
    // listFollowins=data.identity.followings.list,
    listfollowings=data.information.followings;
    return {followingCount, listfollowings};
  } catch (error) { 
    console.log("error",error);
    return null;
  }
};

export const getUpdate= async ( address:string ): Promise<any> =>{

  try {
    const result = await fetch(`${API_URL}/api/Wallet/search?walletAddress=${address}`, {
      method: "GET",
    });
    const  data  = await result.json();
    if (!data) {
      return;
    }

    if (!data.information) {
      throw new Error(`Could not resolve ${address} via Follow.`);
    };
    //return {followingCount, listfollowings};
  } catch (error) { 
    console.log("error",error);
    return null;
  }
};