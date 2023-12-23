import { MongoDatabase } from "./data/mongo";
import dotenv from "dotenv";
import { Server } from "./presentation/server";
import { PrismaClient } from "@prisma/client";

dotenv.config();

(async() => {
  Main()
})();


async function Main() {

  await MongoDatabase.connect({mongoURL: process.env.MONGO_URL as string, dbName: "NOCDB"});
  
  Server.start();
}

