import { API_URL } from "../const/api";
import axios from 'axios';

export const getPopular= async ({ address }={address:null}): Promise<any> =>{

    //const cantidadXpag=50;//,pagina=page+1;
    let query={};
    //if(!page){
      // query  { identity(address: ){  address followingCount  followings(  ) { pageInfo { endCursor hasNextPage } list { address } } }     }
      //query = { "query": `query { recommendations (address: \"${address}\" first:${cantidad}) {data{ pageInfo { endCursor hasNextPage } list{ address ens avatar followerCount domain recommendationReason} }} }` };
      query = { "query": `query {popular( tags:{list:[FEATURED]}  first:50){ pageInfo { endCursor hasNextPage } list{address ens followerCount isFollowing recommendationReason domain}}}` };
      
    //}else{
     // query = { "query": `query { recommendations (address: \"${address}\" first:${cantidad}  after:\"${(page*cantidad)-1}\") {data{ pageInfo { endCursor hasNextPage } list{ address ens avatar followerCount domain recommendationReason} }} }` }; 
   // }
   
    //  pageInfo { endCursor hasNextPage }           list { address }         }      
    //query = { "query": `query  {  identity(address: \"${address}\"){ address followingCount followerCount followings(first:50) { pageInfo { endCursor hasNextPage } list { address } } followings(first:50) { pageInfo { endCursor hasNextPage } list { address } } } }` };
    console.log("query",query);
    try {
      // const result = await fetch(`${API_URL}/api/SocialNetwork/followings?walletAddress=${address}&first=${cantidad}&after=${
      //   page!=0?((page * cantidad) ):""
      // }`, {
      //   method: "GET",
      // });
      
      const options = {
        headers: { "Content-Type": "application/json" }
      };
      // const result = await  axios.post("https://api.cybertino.io/connect/",JSON.stringify(query),options
      // ).then((resp:any)=>{
      //   console.log("resp",resp);
      //   return resp.data;
      // });
      //post(
        const result = await fetch("https://api.cybertino.io/connect/", {
          headers: new Headers({ "Content-Type": "application/json" }),
          method: "POST",
          body: JSON.stringify(query),
        });
      const  {data}  = await result.json();
      if (!data) {
        return;
      }
  
      if (!data.popular) {
        throw new Error(`Could not resolve ${address} via Follow.`);
      }
      //const followProfile = data.identity;
      console.log("data",data);
      const pageInfo=data.popular.pageInfo, 
      list=data.popular.list;
      return {pageInfo, list};
  
    } catch (error:any) { 
      console.log("error",error);
      return null;
    }
  };
  