import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entitys/log.entity";


export class MongoDataSource implements LogDatasource {



  async saveLog(log: LogEntity): Promise<void> {
    
    const data = await LogModel.create(log);

    await data.save();


  }
  
  async getLogs(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel
    });


    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }

}