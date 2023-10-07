import { injectable } from "inversify";
import { PrismaRepository } from "../../../providers/prisma.repository";

@injectable()
export class AuthService extends PrismaRepository {
  constructor() {
    super();
  }

  register() {}

  login() {}

  getUser() {}

  validateToken() {}

  generateAuthToken() {}

  hashPassword() {}

  comparePassword() {}

  resetPassword() {}

  generateResetPasswordToken() {}

  changePassword() {}

  generateEmailVerificationToken() {}

  verifyEmail() {}
}
