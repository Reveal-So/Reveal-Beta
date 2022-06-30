import { API_URL } from "../const/api";
//import fetch from 'node-fetch';
// if (typeof window === 'undefined')
//   (global as any).fetch = require('node-fetch');

export const getRecomendados= async ({ address, page, cantidad }={address:null,page:0,cantidad:20}): Promise<any> =>{

    //const cantidadXpag=50;//,pagina=page+1;
    let query={};
    if(!page){
      // query  { identity(address: ){  address followingCount  followings(  ) { pageInfo { endCursor hasNextPage } list { address } } }     }
      query = { "query": `query { recommendations (address: \"${address}\" first:${cantidad}) {data{ pageInfo { endCursor hasNextPage } list{ address ens avatar followerCount domain recommendationReason} }} }` };
    }else{
      query = { "query": `query { recommendations (address: \"${address}\" first:${cantidad}  after:\"${(page*cantidad)-1}\") {data{ pageInfo { endCursor hasNextPage } list{ address ens avatar followerCount domain recommendationReason} }} }` };
      
    }
   
    //  pageInfo { endCursor hasNextPage }           list { address }         }      
    //query = { "query": `query  {  identity(address: \"${address}\"){ address followingCount followerCount followings(first:50) { pageInfo { endCursor hasNextPage } list { address } } followings(first:50) { pageInfo { endCursor hasNextPage } list { address } } } }` };
   // console.log("query",query);
    try {
      // const result = await fetch(`${API_URL}/api/SocialNetwork/followings?walletAddress=${address}&first=${cantidad}&after=${
      //   page!=0?((page * cantidad) ):""
      // }`, {
      //   method: "GET",
      // });
      
      const result = await fetch("https://api.cybertino.io/connect/", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify(query),
      });
      const  data:any  = await result.json();
      console.log("data",data);
      if (!data) {
        return;
      }
  
      if (!data?.data?.recommendations) {
        throw new Error(`Could not resolve ${address} via Follow.`);
      }
      //const followProfile = data.identity;
      //console.log("data.recommendations",data.recommendations);
      const pageInfo=data.data?.recommendations.data.pageInfo, 
      list=data.data?.recommendations.data.list;
      return {pageInfo, list};
  
    } catch (error) { 
      console.log("error",error);
      return null;
    }
  };
  