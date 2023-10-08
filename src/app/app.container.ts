import { Authenticate } from "../middlewares/auth.middleware";
import { PrismaRepository } from "../providers/prisma.repository";
import { registerDependency } from "../utils/container.helper";
import { AuthController } from "./features/auth/auth.controller";
import { AuthService } from "./features/auth/auth.service";
import { MailService } from "./integrations/mail.service";
import { MailgunService } from "./integrations/mailgun.service";
import { RedisService } from "./integrations/redis.service";

export default (function () {
  //
  //
  // Register Controllers
  AuthController;

  //
  //
  // Register Injectables
  return registerDependency([
    {
      name: "AuthMiddleware",
      injectable: Authenticate,
    },
    {
      name: "PrismaRepository",
      injectable: PrismaRepository,
    },

    //
    // Intergration Services
    {
      name: "MailgunService",
      injectable: MailgunService,
    },
    {
      name: "MailService",
      injectable: MailService,
    },
    {
      name: "RedisService",
      injectable: RedisService,
    },

    //
    // Service Layers
    {
      name: "AuthService",
      injectable: AuthService,
    },
  ]);
})();
