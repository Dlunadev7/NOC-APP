import { LogEntity, logSeverityLevel } from "../../entitys/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<Boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) { }

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    })
  }


  public async execute(url: string): Promise<Boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error("Error on check service: " + url);
      }
      

      const log = new LogEntity(logSeverityLevel.LOW, `Service ${url} is active`, "check-service");
      
      this.callLogs(log);
      
      this.successCallback();
      
      
      
      return true;
      
    } catch (error) {
      
      const errorMessage = `${error}`;
      const log = new LogEntity(logSeverityLevel.HIGH, errorMessage, "check-service");
      
      this.callLogs(log);

      this.errorCallback(errorMessage);
      return false;
    }
  }
}