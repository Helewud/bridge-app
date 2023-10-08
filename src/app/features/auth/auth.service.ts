import { injectable, inject } from "inversify";
import * as argon2 from "argon2";
import { PrismaRepository } from "../../../providers/prisma.repository";
import { AppError } from "../../../utils/error.helper";
import { MailService } from "../../integrations/mail.service";
import { RedisService } from "../../integrations/redis.service";
import { generateNumberToken } from "../../../utils/function.helper";
import { Token } from "./auth.interface";
import { Roles } from "@prisma/client";
import { RegisterUserDto } from "./auth.dto";
import { TokenType } from "../../../common/constant";
import { Dependency } from "../../../utils/container.helper";

@injectable()
export class AuthService extends PrismaRepository {
  constructor(
    @inject(Dependency.MailService) private mailService: MailService,
    @inject(Dependency.RedisService) private redisService: RedisService
  ) {
    super();
  }

  private hashPassword(password: string) {
    return argon2.hash(password);
  }

  private comparePassword(password: string, hash: string) {
    return argon2.verify(hash, password);
  }

  private async makeToken(identifier: string, type: TokenType) {
    const token: Token = {
      type: TokenType.EMAIL_VERIFICATION,
      identifier: identifier,
    };
    const tokenIdentifier = generateNumberToken(6);
    await this.redisService.set(tokenIdentifier, JSON.stringify(token));
    return tokenIdentifier;
  }

  async register(dto: RegisterUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: dto.email,
          },
          {
            username: dto?.username,
          },
        ],
      },
    });

    if (user) {
      throw new AppError("Email or username taken!", "BAD_REQUEST");
    }
    const hash = await this.hashPassword(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto?.username,
        email: dto?.email,
        password: hash,
        isVerified: false,
        role: dto?.role as Roles,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isVerified: true,
        role: true,
        createdAt: true,
      },
    });

    if (!newUser) {
      throw new AppError("Something went wrong creating user!", "BAD_REQUEST");
    }

    const token = await this.makeToken(
      newUser?.id,
      TokenType.EMAIL_VERIFICATION
    );

    await this.mailService.sendVerificationMail({
      email: dto.email,
      token: token,
    });

    return {
      message: "User creation successful, check email inbox to continue.",
      data: newUser,
    };
  }

  login() {}

  getUser() {}

  validateToken() {}

  generateAuthToken() {}

  resetPassword() {}

  generateResetPasswordToken() {}

  changePassword() {}

  generateEmailVerificationToken() {}

  verifyEmail() {}
}
