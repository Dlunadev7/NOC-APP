import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entitys/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  
  constructor(
    private readonly logDataSource: LogDatasource
  ) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log)
  };

  async getLogs(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel)
  }

}