import mongoose from "mongoose"
import { LogModel, MongoDatabase } from "../../../data/mongo"

describe("Log model", () => {
  
  beforeAll(async() => {
    MongoDatabase.connect({mongoURL: process.env.MONGO_URL!, dbName: process.env.MONGO_DB_URL!})
  })
  
  afterAll(async() => {
    mongoose.disconnect()
  })

  test("Should return log model", async() => {
    const logData = {
      origin: "logModel.test.ts",
      message: "test",
      level: "low"
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(expect.objectContaining({
      ...logData,
      created_at: expect.anything(),
      id: expect.any(String)
    }))

    await LogModel.findByIdAndDelete(log.id);
  })
})