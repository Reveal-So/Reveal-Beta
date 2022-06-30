import { API_URL } from "../const/api";

export const setUpdateFollower = async (
    { address, addressTofollow ,band } :{ address: any, addressTofollow: any ,band:any}
  ): Promise<any> => {
   
    try {
      const result = await fetch(`${API_URL}/api/SocialNetwork/UpdateFollower?Wallet=${address}&WalletToFollow=${addressTofollow}&ToFollowing=${band}`, {
        method: "GET",
      });
      const  data  = await result.json();
      if (!data) {
        return;
      }
      if (!data.information) {
        throw new Error(`Could not resolve ${address} via Follow.`);
      }
      return data.information;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };