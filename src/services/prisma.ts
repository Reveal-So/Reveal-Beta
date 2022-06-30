//import prisma from "../../libs/prisma";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const consultarWallets =async()=>{
    const allWallet= await prisma.wallet.findMany();
    console.log("allWallet",allWallet);
} 
export const updateWallets =async(address:any,ens:string)=>{
    if (!address) return
     await prisma.wallet.upsert({
        where: { id: address },
        create: {
            id: address,
            ens: ens
        },
        update: { ens: ens },
      })
    //prisma.wallet.findMany();
    //console.log("allWallet",allWallet);
} 
