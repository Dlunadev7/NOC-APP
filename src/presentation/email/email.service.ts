import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, logSeverityLevel } from "../../domain/entitys/log.entity";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[]
}

export class EmailService {

  constructor() { }

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_SEND,
      pass: process.env.MAILER_SECRET_KEY
    }
  });

  
  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    
    const { htmlBody, subject, to, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })
      
      
      const log = new LogEntity(logSeverityLevel.LOW, "Logs enviados al email", "email.service.ts");
      
      return true;
    } catch (error) {
      console.log("Error en el envio de correo electronico", error);

      const log = new LogEntity(logSeverityLevel.LOW, "Logs no enviados al email", "email.service.ts");
      return false;
    }

  };

  sendEmailsWithFileSystemLogs(to: string | string[]) {
    const subject = "logs del servidor";
    const htmlBody = `Logs del sistema`;
    const attachments: Attachment[] = [
      { filename: "logs-all", path: "./logs/logs-low.log" },
      { filename: "logs-error", path: "./logs/logs-medium.log" },
      { filename: "logs-high", path: "./logs/logs-high.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }

}