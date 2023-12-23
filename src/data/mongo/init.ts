import mongoose from "mongoose";

interface ConnectionOptions {
  mongoURL: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions){
    const { dbName, mongoURL } = options;
    
    try {
      await mongoose.connect(mongoURL, { dbName });

      return true;
    } catch (error) {
      throw new Error(`Database error ${error}`)  
    }

  }
}