import { injectable } from "inversify";
import { PrismaRepository } from "../../../providers/prisma.repository";

@injectable()
export class AuthService extends PrismaRepository {
  constructor() {
    super();
  }

  ff = (async () => {
    //   await this.prisma.admin.create({
    //     data: {
    //       email: "helewud@gmail.com",
    //       password: "hgjshdjdsksls",
    //       isActive: true,
    //       isVerified: true,
    //     },
    //   });

    console.log(await this.prisma.user.findMany(), 10000);
  })();
}
