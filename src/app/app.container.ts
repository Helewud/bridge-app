import { PrismaRepository } from "../providers/prisma.repository";
import { registerDependency } from "../utils/container.helper";
import { AuthController } from "./features/auth/auth.controller";
import { AuthService } from "./features/auth/auth.service";

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
    {
      name: "AuthService",
      injectable: AuthService,
    },
  ]);
})();
