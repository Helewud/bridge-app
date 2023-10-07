import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class PrismaRepository {
  prisma = (() => {
    const prisma = new PrismaClient({
      log: [{ level: "info", emit: "stdout" }],
      errorFormat: "pretty",
      //   __internal: {
      //     log: (log: any) => {
      //       if (
      //         log.level === "info" &&
      //         log.message === "Client connected to database"
      //       ) {
      //         console.log("Prisma successfully connected to the database");
      //       }
      //     },
      //   },
    });
    return prisma;
  })();
}
