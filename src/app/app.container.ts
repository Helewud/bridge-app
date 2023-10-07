import { PrismaRepository } from "../providers/prisma.repository";
import { registerDependency } from "../utils/container.helper";
import { AuthController } from "./features/auth/auth.controller";
import { AuthService } from "./features/auth/auth.service";
import { MailService } from "./integrations/mail.service";
import { MailgunService } from "./integrations/mailgun.service";

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

    //
    // Service Layers
    {
      name: "AuthService",
      injectable: AuthService,
    },
  ]);
})();
