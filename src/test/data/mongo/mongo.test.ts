import mongoose from "mongoose";
import { MongoDatabase } from "../../../data/mongo"

describe("Testing on mongoDB", () => {

  afterAll(() => {
    mongoose.disconnect();
  })

  test("should connect to mongoDB", async() => {
    const dbConnect = await MongoDatabase.connect({mongoURL: process.env.MONGO_URL! , dbName: process.env.MONGO_DB_URL! });

    expect(dbConnect).toBe(true);
  });

  test("should not connect to mongoDB", async() => {
    const dbConnect = await MongoDatabase.connect({mongoURL: process.env.MONGO_URL! , dbName: process.env.MONGO_DB_URL! });

    expect(!dbConnect).toBe(false);
  })
})