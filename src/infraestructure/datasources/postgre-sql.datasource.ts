import { Prisma, PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entitys/log.entity";


const prisma = new PrismaClient();

const severityLevelEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgreSQLDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    const normalizedLevel = severityLevelEnum[log.level];
    
    await prisma.logModel.create({
      data: {
        ...log,
        level: normalizedLevel
      }
    });

  }

  async getLogs(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
    const prisma = new PrismaClient();
    
    const normalizedLevel = severityLevelEnum[severityLevel];
    const logs = await prisma.logModel.findMany({
      where: {
        level: normalizedLevel
      }
    })

    return logs.map((logsMapped) => LogEntity.fromObject(logsMapped));
  }

}