import { LogDatasource } from "../../../domain/datasource/log.datasource";
import { LogEntity, logSeverityLevel } from "../../../domain/entitys/log.entity";

describe("Test on log datasources", () => {

  const mockNewLog = new LogEntity(logSeverityLevel.LOW, "Mensaje de testeo", "log.datasource.test.ts");

  class mockLogDataSource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return; 
    }
    async getLogs(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
      return [mockNewLog];
    }

  }


  test("Should test the abstract class", async() => {

    const mockLogDatasource = new mockLogDataSource();

    expect(mockLogDatasource).toBeInstanceOf(mockLogDataSource);
    expect(typeof mockLogDatasource.saveLog).toBe('function');
    expect(typeof mockLogDatasource.getLogs).toBe('function');

    await mockLogDatasource.saveLog(mockNewLog);
    const logs = await mockLogDatasource.getLogs(logSeverityLevel.LOW);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
    

  })

})