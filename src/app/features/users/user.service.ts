import { injectable } from "inversify";
import { PrismaRepository } from "../../../providers/prisma.repository";
import { AppError } from "../../../utils/error.helper";

@injectable()
export class UserService extends PrismaRepository {
  constructor() {
    super();
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppError("User account not found!", "NOT_FOUND");
    }

    return {
      message: "User fetched successfully.",
      data: user,
    };
  }
}
