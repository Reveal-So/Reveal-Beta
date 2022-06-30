import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import prisma from "../../../libs/prisma";
import { runMiddleware } from "../../../libs/runMiddleware";
import { galleryKeys } from "../../../types/gallery";
import type { Pin } from "../../../types/pin";

const cors = Cors({
  methods: ["GET", "POST"],
});

export const pin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors);

    let walletId = req.query.walletId as string;
    walletId=walletId.toLowerCase()
    console.log("walletId PIN",walletId);
    switch (req.method) {
      case "GET": {
        const [pins] = await Promise.all([
          prisma.pin.findMany({
            orderBy: [
              {
                index: "asc",
              },
            ],
            where: { walletId: walletId },
          }),
        ]);
        console.log("pins",pins)
        res.json({
          data: pins,
        });
        return;
      }
      case "POST": {
        const { index, type, src, value ,bandDrop } = req.body as Pin;
        const uuid = uuidv4();
        console.log("req.body pin",req.body);
        console.log("bandDrop",bandDrop);
        if (!(index >= 0 && index < 6)) {
          throw new Error("Invalid pin index");
        }

        if (!galleryKeys.includes(type)) {
          throw new Error("Invalid type");
        }

        const [wallet] = await Promise.all([
          prisma.wallet.findUnique({
            where: { id: walletId },
          }),
        ]);

        if (!wallet) {
          throw new Error("No wallet recognized");
        }

        if (bandDrop){
          const [pin] = await Promise.all([
            prisma.pin.delete({
              where: { index_walletId: { index: index, walletId: walletId } },
            }),
          ]);
          res.json({
            data: pin,
          });  
        }else{
          const [pin] = await Promise.all([
            prisma.pin.upsert({
              where: { index_walletId: { index: index, walletId: walletId } },
              create: {
                id: uuid,
                index: index,
                walletId: walletId,
                type: type,
                src: src,
                value: value,
              },
              update: {
                id: uuid,
                index: index,
                walletId: walletId,
                type: type,
                src: src ?? null,
                value: value ?? null,
              },
            }),
          ]);
          res.json({
            data: pin,
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

export default pin;
