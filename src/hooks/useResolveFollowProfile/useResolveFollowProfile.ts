import { API_URL } from "../../const/api";
export const useResolveFollowProfile = async ( address:string): Promise<any>=>{
//export const useResolveFollowProfile = async (address: any): Promise<any> => {
    // console.log("address a buscar",address);
    //address="0x8ddD03b89116ba89E28Ef703fe037fF77451e38E";
    //const [followChange, setfollowChange] = useRecoilState(followChangeAtom);
    let query={};
    query = { "query": `query  { allFollowings(address: \"${address}\"){  address } , identity(address: \"${address}\"){ address followingCount followerCount followers(first:50) { pageInfo { endCursor hasNextPage } list { address } } followings(first:50) { pageInfo { endCursor hasNextPage } list { address } } } }` };
    
    try {
      
      const result = await fetch(`${API_URL}/api/SocialNetwork/profile?walletAddress=${address}`, {
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
      const followProfile = data.information;
      //console.log("followProfile",followProfile);
      const  followersCount=data.information.profile.followerCount, 
      followinsCount=data.information.profile.followingCount,
      avatar=data.information.profile.avatar;
      //return {followersCount, followinsCount, avatar};
      return null;
  
    } catch (error) {
      console.log("error",error);
      return null;
    }
  };