import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
//esto SOLO PREUBAS
//import { PrismaClient } from "@prisma/client";
import prisma from "../../../libs/prisma";
import { runMiddleware } from "../../../libs/runMiddleware";

const cors = Cors({
  methods: ["GET", "POST"],
});
//esto SOLO PREUBAS
//const prisma = new PrismaClient();
export const wallet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors);
    let walletId = req.query.walletId as string;
    let WalletEns='' as string;
    //console.log("req.query",req.query.walletId);
    //console.log("search",`${req.query.walletId}`.search('&'));
    if (`${req.query.walletId}`.search('&')!=-1){
      let arr=`${req.query.walletId}`.split("&");
      if (arr[1]=="ens"){
        WalletEns=arr[0];     
      }
    }
    walletId=walletId.toLowerCase();
    console.log("req.method",req.method);
    console.log("walletId",walletId);
    //console.log("WalletEns ",WalletEns);    //esto SOLO PREUBAS
    //let prisma = new PrismaClient();
    //throw "no paso";
    //console.log("prisma",prisma._engineConfig.);
    //console.log("walletId",walletId);
    
    
    
     
  //   res.json({
  //   data: wallet,
  //   });
  // return;
  //   // 

    switch (req.method) {
      case "GET": {
        if(WalletEns==''){
          const [wallet] = await Promise.all([
            prisma.wallet.findUnique({
              where: { id: walletId },
            }),
          ]);
  
          res.json({
            data: wallet,
          });
          return;
        }else{
          const [wallet] = await Promise.all([
            prisma.wallet.findFirst({
              where: { ens: WalletEns },
            }),
          ]);
  
          res.json({
            data: wallet,
          });
          return;
        }


        
      }
      case "POST": {
        const { ens, avatar } = req.body?req.body:"" ;
        //let wallet
        if (ens){
          const [wallet] = await Promise.all([
            prisma.wallet.upsert({
             where: { id: walletId },
             create: {
               id: walletId,
               ens:ens,
            
             },
             update: {
              ens:ens,
              lastEns:new Date(),
             },
           }),
         ]);
         
        res.json({
          data: wallet,
        });
        }
        
        if (avatar){
          console.log ("entro avatar",avatar)
          const [wallet] = await Promise.all([
            prisma.wallet.upsert({
             where: { id: walletId },
             create: {
               id: walletId,
               avatar:avatar,
             },
             update: {
              avatar:avatar,
            
             },
           }),
         ]);
         
        res.json({
          data: wallet,
        });
        }
        if (!avatar&&!ens){
          const [wallet] = await Promise.all([
            prisma.wallet.upsert({
             where: { id: walletId },
             create: {
               id: walletId,
             },
             update: {
            
             },
           }),
         ]);
         
        res.json({
          data: wallet,
        });
        }
        return;
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);

      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
  }
};

export default wallet;
