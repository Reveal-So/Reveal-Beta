import { request } from "graphql-request";
import { ARWEAVE_BASE_URL } from "../const/api";
import { arweave } from "./arweave";
import { MIRROR_QUERY } from "../queries/mirror";
//import { string } from "zod";

const formatEntry = async (entry:any, transactionId:any) => {
  //console.log("entry",entry);
  return {
    title: entry.content.title,
    body: entry.content.body,
    timestamp: entry.content.timestamp,
    digest: entry.originalDigest||"",
    contributor: entry.authorship.contributor,
    transaction: transactionId,
    cover_image:
      (entry.content.body
        .split("\n\n")[0]
        .match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/m) || [])?.[1] ||
      null,
  };
};

export const fetchMirrorArticles = async (
  profileAddress: string,
): Promise<{
  [x: string]: any;
}|null> => {
  try {
   // console.log(" busca la data:");
    const data = await request(ARWEAVE_BASE_URL, MIRROR_QUERY, {
      profileAddresses: [profileAddress],
    });
   // console.log("data:",data);

    if (!data.transactions.edges) {
      throw new Error(`Could not resolve ${profileAddress} via Mirror.`);
    }
    const {
      transactions: { edges },
    } = data;

   // console.log("edges:",edges);

    const paths = edges.map(({node}:{node:any})  => {
     // console.log("node",node);
        const tags = Object.fromEntries(
          node.tags.map((tag:any) => {
            return [tag.name, tag.value];
          }),
        );

       // console.log("tags",tags);
        return { slug: tags["Original-Content-Digest"], path: node.id };
      })
      .filter((entry:any) => {
        return entry.slug && entry.slug !== "";
      })
      .reduce((acc:any, current:any) => {
        const x = acc.find((entry:any) => {
          return entry.slug === current.slug;
        });
        if (!x) return acc.concat([current]);
        else return acc;
      }, []);

      //console.log("paths:",paths);
      //const data =
      
      // arweave.transactions.getData('gPW7s17YyQ_-BsxQAevVdVd5g9f62YBzEPvXxzTqQ-k', {decode: true, string: true}).then(data => {
      //   console.log(data);
      //   // <!DOCTYPE HTML>...
      // });

      // paths.map(async entry =>{
      //   console.log("entry",  entry.path);

      //   let prueba= await arweave.transactions.getData("mefBJx6jFe_hxcWV_Ynlzse7NMDYoF_Br1R64AHrdUU", {
      //     decode: true,
      //     string: true,
      //   });
      //   console.log("prueba",prueba);
      // });
      
        //console.log("paths(0).path:",);
      // const transactionData = await arweave.transactions.getData(paths(0).path);
      // console.log(
      //   "transaction data",
      //   Buffer.from(<String>transactionData, "base64").toString()
      // );
      // console.log("articles2",await arweave.transactions.getData(paths(0).path as string, {
      //   decode: true,
      //   string: true,
      // }) );
      // const Arweave = require("arweave");
      // const ArweaveTransaction = require("arweave/node/lib/transaction.js");
      // const fs = require("fs");
      
      // const arweave = Arweave.init({
      //   host: "arweave.net",
      //   port: 443,
      //   protocol: "https",
      // });
      
      // let data2 = fs.readFileSync(
      //   "./txData.txt"
      // );
      
      // let txHeaders = require("./txHeaders.json"); 
      
      // (async () => {
      //   const tx = new ArweaveTransaction.default(txHeaders);
      
      //   let uploader = await arweave.transactions.getUploader(tx, data2);
      
      //   while (!uploader.isComplete) {
      //     await uploader.uploadChunk();
      //   }
      
      // })();

      ////////////////
      const axios = require('axios').default;

      const descarga =async(txid:any)=>{
        //const txid = 'A34cM0jBT6CxKGxLDCrM7IaYws6XlDM34aHT5VNM9O0'

        const { data } = await axios.get('https://arweave.net/' + txid, {
          responseType: 'arraybuffer',
        })
        
        //console.log("DATAdescarga:",data);
        const uploader =  await arweave.transactions.getUploader(txid, data)
            
        while(!uploader.isComplete){
          await uploader.uploadChunk()
          // console.log(`chunkUploaded: ${uploader.uploadedChunks}/${uploader.totalChunks} %${uploader.pctComplete}`)
          // console.log(`lastResponseStats: ${uploader.lastResponseStatus}`)
        }
        //console.log("uploader",uploader);
      }
         


      const articles = await Promise.all(
      paths.map(async (entry:any) => {
        //console.log("consulta",`https://arweave.net/${entry.path}`);
        // {
        //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, *cors, same-origin
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: 'same-origin', // include, *same-origin, omit
        //   headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //   },
        //   redirect: 'follow', // manual, *follow, error
        //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //  // body: JSON.stringify(data) // body data type must match "Content-Type" header
        // }
        //method: 'GET',

        // let url=async()=>{ await arweave.transactions.getData(`${entry.path}`, {decode: true, string: true}).then(data => {
        //   console.log("returnData3:",data);
        //   // <!DOCTYPE HTML>...
        // });}  

        //console.log("descarga:",);

        // fetch(`https://arweave.net/${entry.path}`).then(data => {
        //   console.log("returnData:",JSON.stringify(data));
        //   // url=data.url;
        //   //   fetch(url).then(data2 => {
        //   //    console.log("returnData2:",data2);
        //   //  });
        //   // <!DOCTYPE HTML>...
        // });
        try{
          return formatEntry(
            JSON.parse(
              //@ts-ignore arweave.transactions.getData(, {
                // decode: true,
                // string: true,
                //as string
                //await arweave.transactions.getData(entry.path,{decode: true, string: true})
                //await fetch(`https://arweave.net/${entry.path}`)
              //await fetch(´´,
              await arweave.transactions.getData(`${entry.path}`, {decode: true, string: true})
            ),
            entry.slug,
          );
        } catch (error2) {
          descarga(entry.path);
          return;
        }
        
      }),
    );
   // console.log("articles:",articles);
    return articles;
  } catch (error) {
    console.log("error",error);
    return null;
  }
};
