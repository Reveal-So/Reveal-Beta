export const getFollowingsAll = async ( address:string): Promise<any>=>{
    let query={}; 
    let respuesta:any[]=[];
    //query = { "query": `query  { allFollowings(address: \"${address}\"){   } }` };
    query = { "query": `query  { identity(address: \"${address}\"){ followings(first:50){ pageInfo { endCursor hasNextPage } list{ address }}  }   }` };      
      //console.log("query",query);//address
      try {
        let bandError=false;
        do {
        const result = await fetch("https://api.cybertino.io/connect/", {
          headers: new Headers({ "Content-Type": "application/json" }),
          method: "POST",
          body: JSON.stringify(query),
        });
        const { data } = await result.json();
        if (!data) {
          return;
        }
        //console.log("data",data);
        //allFollowings
        
        if (!data.identity) {
          bandError=true;
          return;
         // throw new Error(`Could not resolve ${address} via Follow.`);
        }
        
        if (!data.identity.followings) {
          bandError=true;
          return;
          //throw new Error(`Could not resolve ${address} via Follow.`);
        }
        //console.log("data.identity",data.identity.followings);
        if (!data.identity.followings.pageInfo) {
          bandError=true;
          return;
        }
        bandError=data.identity.followings.pageInfo.hasNextPage;
        //console.log("data.identity",data.identity.followings);
        respuesta=respuesta.concat(data.identity.followings.list);
       // const followProfile = data.allFollowings;
      }while(bandError)
        
        //console.log("GetFollowingConectado",respuesta);
        return respuesta;
    
      } catch (error) {
        console.log("error",error);
        return null;
      }
  }
  