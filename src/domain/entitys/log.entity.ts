
export enum logSeverityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
};

export class LogEntity {
  public level: logSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(level: logSeverityLevel, message: string, origin: string) {
    this.message = message,
    this.level = level,
    this.createdAt = new Date(),
    this.origin = origin
  };

  static fromJson = (json: string): LogEntity => {

    json = (json === "") ? "{}" : json;

    const { message, level, createdAt } = JSON.parse(json);

    // if(!message) throw new Error("Message is required");

    const log = new LogEntity(level, message, origin);

    log.createdAt = new Date(createdAt);

    return log;

  }

  static fromObject = (object: { [key: string]:any} ): LogEntity => {
    const { message, level, origin } = object;

    const log = new LogEntity(level, message, origin);

    return log;

  }

}