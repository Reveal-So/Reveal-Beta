import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
//console.log(" entre en la variable");
//prisma = new PrismaClient();
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  //@ts-ignore
  global["prisma"] = global["prisma"] || new PrismaClient();
  //@ts-ignore
  prisma = global["prisma"];
}
//console.log("prisma:",prisma);
export default prisma;
