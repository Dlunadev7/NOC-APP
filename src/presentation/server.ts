import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { fileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { MongoDataSource } from "../infraestructure/datasources/mongo-db.datasource";
import { PostgreSQLDatasource } from "../infraestructure/datasources/postgre-sql.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const postgreRepository = new LogRepositoryImpl(new PostgreSQLDatasource());
const fileSystemRepository = new LogRepositoryImpl(new fileSystemDataSource());
const mongoRepository = new LogRepositoryImpl(new MongoDataSource());

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("server started")

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const date = new Date();

        const url = "http://localhost:3000";

        new CheckServiceMultiple([postgreRepository, fileSystemRepository, mongoRepository],
          () => console.log(`${url} is okey`),
          (error) => console.log(error)
        ).execute(url)
      }
    );
  };
};

