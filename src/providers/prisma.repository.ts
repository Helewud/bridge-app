import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class PrismaRepository {
  prisma = (() => {
    const prisma = new PrismaClient({
      log: [{ level: "info", emit: "stdout" }],
      errorFormat: "pretty",
    });
    return prisma;
  })();
}
