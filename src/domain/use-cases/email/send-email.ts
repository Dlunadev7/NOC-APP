import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, logSeverityLevel } from "../../entitys/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<Boolean>;
}

export class SendEmail implements SendLogEmailUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ){}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailsWithFileSystemLogs(to);

      if(!sent) {
        throw new Error("El email no se ha podido enviar");
      }
      const log = new LogEntity(logSeverityLevel.HIGH, "Email enviado ", "send-email.ts");

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity(logSeverityLevel.HIGH, `${error}`, "send-email.ts");

      this.logRepository.saveLog(log);
    }
    return true;
  };

}