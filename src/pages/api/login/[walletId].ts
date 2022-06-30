import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
//esto SOLO PREUBAS
//import { PrismaClient } from "@prisma/client";
import prisma from "../../../libs/prisma";
import { runMiddleware } from "../../../libs/runMiddleware";
import { noWait } from "recoil";

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
    //console.log("walletId",walletId);
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
        const [wallet] = await Promise.all([
          prisma.login.findMany({
            where: { address: walletId },
          }),
        ]);

        res.json({
          data: wallet,
        });
        return;
      }
      case "POST": {
        //console.log("paso por aqui")
        let temp=new Date().toDateString;
        let time=`${new Date()}`.split("&");
       // console.log("time",time);
        // createdAt: new .toUTCString() 
        //YYYY-MM-DD hh:mm:ss

        const [wallet] = await Promise.all([
          prisma.login.create({
            data: { address: walletId, },
          }),
        ]);

        res.json({
          data: wallet,
        });
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
