import fs from "fs";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entitys/log.entity";

export class fileSystemDataSource implements LogDatasource {

  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-low.log"
  private readonly mediumLogsPath = "logs/logs-medium.log"
  private readonly highLogsPath = "logs/logs-high.log"

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path => {
      if(fs.existsSync(path)) return;
      fs.writeFileSync(path, "")
    })

  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");

    const logs = content.split("\n").map(LogEntity.fromJson)
  
    return logs;

    // return JSON.parse(content);
  }

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(log);
    fs.appendFileSync(this.allLogsPath, `${logAsJson}\n`)
    
    if(log.level === logSeverityLevel.LOW) return;

    if(log.level === logSeverityLevel.MEDIUM) {
      fs.appendFileSync(this.mediumLogsPath, `${logAsJson}\n`)
      return;
    }
    
    if(log.level === logSeverityLevel.HIGH) {
      fs.appendFileSync(this.highLogsPath, `${logAsJson}\n`)
      return;
    }


  }

  async getLogs(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case logSeverityLevel.LOW:
        return this.getLogsFromFile(this.allLogsPath);
    
      case logSeverityLevel.MEDIUM:
        return this.getLogsFromFile(this.mediumLogsPath);
    
      case logSeverityLevel.HIGH:
        return this.getLogsFromFile(this.highLogsPath);
    
      default:
        throw new Error(`${severityLevel} method not allowed`)
    }

  }


}