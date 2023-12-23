import { LogEntity, logSeverityLevel } from "../entitys/log.entity";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: logSeverityLevel): Promise<LogEntity[]>;
}