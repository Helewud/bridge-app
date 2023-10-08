import { injectable, inject } from "inversify";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { PrismaRepository } from "../../../providers/prisma.repository";
import { AppError } from "../../../utils/error.helper";
import { MailService } from "../../integrations/mail.service";
import { RedisService } from "../../integrations/redis.service";
import { generateNumberToken } from "../../../utils/function.helper";
import { IJwtPayload, Token } from "./auth.interface";
import { Roles } from "@prisma/client";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterUserDto,
  ResendVerificationEmailDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from "./auth.dto";
import { TokenExpiration, TokenType } from "../../../common/constant";
import { Dependency } from "../../../utils/container.helper";
import envConfig from "../../../config/env.config";

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

  private async makeToken(
    identifier: string,
    type: TokenType,
    expires?: TokenExpiration
  ) {
    const tokenIdentifier = generateNumberToken(6);

    const token: Token = {
      type,
      identifier: identifier,
      token: tokenIdentifier,
    };

    await this.redisService.setexp(`${type}:${identifier}`, token, expires);
    return tokenIdentifier;
  }

  private async verifyToken({
    identifier,
    tokenIdentifier,
    type,
  }: {
    identifier: string;
    tokenIdentifier: string;
    type: TokenType;
  }) {
    const payload = await this.redisService.get<Token>(`${type}:${identifier}`);
    await this.redisService.del(`${type}:${identifier}`);

    if (!payload) {
      throw new AppError("Invalid or expired token!", "BAD_REQUEST");
    }

    if (payload.identifier !== identifier) {
      throw new AppError("Invalid token!", "UNAUTHORIZED");
    }

    if (payload.token !== tokenIdentifier) {
      throw new AppError("Invalid token!", "BAD_REQUEST");
    }

    return payload;
  }

  private makeJwtToken(payload: IJwtPayload): string {
    try {
      return jwt.sign(payload, envConfig.JWT_SECRET, {
        expiresIn: TokenExpiration.ONE_WEEK,
      });
    } catch (error) {
      throw new AppError("Something went wrong making token!", "BAD_REQUEST");
    }
  }

  validateJwtToken(token: string): IJwtPayload {
    try {
      return jwt.verify(token, envConfig.JWT_SECRET) as IJwtPayload;
    } catch (error) {
      throw new AppError("Invalid or expired token!", "BAD_REQUEST");
    }
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

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        isVerified: true,
        role: true,
        lastLogin: true,
      },
    });

    if (!user) {
      throw new AppError("Incorrect credentials!", "BAD_GATEWAY");
    }

    const validCredential = await this.comparePassword(
      dto?.password,
      user?.password
    );
    if (!validCredential) {
      throw new AppError("Incorrect credentials!", "BAD_GATEWAY");
    }

    if (!user?.isVerified) {
      throw new AppError("Please verify account!", "BAD_REQUEST");
    }

    const token = this.makeJwtToken({
      id: user?.id,
      role: user?.role,
    });

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date().toISOString(),
      },
    });

    return {
      message: "User logged in successfully.",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
          role: user.role,
          lastLogin: user.lastLogin,
        },
        token,
      },
    };
  }

  async getUser(identifier: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { id: identifier }],
      },
      select: {
        id: true,
        username: true,
        email: true,
        isVerified: true,
        role: true,
        lastLogin: true,
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

  async resendVerificationEmail(dto: ResendVerificationEmailDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto?.email,
      },
      select: {
        id: true,
        isVerified: true,
      },
    });

    if (!user) {
      throw new AppError("User account not found!", "NOT_FOUND");
    }

    if (user.isVerified) {
      throw new AppError("User account verified already!", "BAD_REQUEST");
    }

    const token = await this.makeToken(user?.id, TokenType.EMAIL_VERIFICATION);

    await this.mailService.sendVerificationMail({
      email: dto.email,
      token: token,
    });

    return {
      message: "Token sent successfully, check email inbox to continue.",
      data: {},
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new AppError("User account not found!", "NOT_FOUND");
    }

    await this.verifyToken({
      identifier: user?.id,
      tokenIdentifier: dto?.token,
      type: TokenType.EMAIL_VERIFICATION,
    });

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });

    if (!updatedUser) {
      throw new AppError("Something went wrong updating user!", "BAD_REQUEST");
    }

    return {
      message: "Email verified successfully.",
      data: {},
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto?.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new AppError("User account not found!", "NOT_FOUND");
    }

    await this.prisma.user.update({
      where: {
        email: dto?.email,
      },
      data: {
        password: "",
      },
    });

    const token = await this.makeToken(user?.id, TokenType.PASSWORD_RESET);

    await this.mailService.sendForgotPasswordMail({
      email: dto.email,
      token: token,
    });

    return {
      message: "Token sent successfully, check email inbox to continue.",
      data: {},
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new AppError("User account not found!", "NOT_FOUND");
    }

    await this.verifyToken({
      identifier: user?.id,
      tokenIdentifier: dto?.token,
      type: TokenType.PASSWORD_RESET,
    });

    const hash = await this.hashPassword(dto.password);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });

    if (!updatedUser) {
      throw new AppError("Something went wrong updating user!", "BAD_REQUEST");
    }

    return {
      message: "Password reset successfully, proceed to login.",
      data: {},
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User account not found!", "NOT_FOUND");
    }

    const validCredential = await this.comparePassword(
      dto?.oldPassword,
      user?.password
    );
    if (!validCredential) {
      throw new AppError("Incorrect credentials!", "BAD_GATEWAY");
    }

    const hash = await this.hashPassword(dto.newPassword);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });

    if (!updatedUser) {
      throw new AppError("Something went wrong updating user!", "BAD_REQUEST");
    }

    return {
      message: "Password changed successfully, proceed to login.",
      data: {},
    };
  }
}
