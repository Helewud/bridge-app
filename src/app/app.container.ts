import { Authenticate } from "../middlewares/auth.middleware";
import { LandlordRole, TenantRole } from "../middlewares/role.middleware";
import { PrismaRepository } from "../providers/prisma.repository";
import { registerDependency } from "../utils/container.helper";
import { AuthController } from "./features/auth/auth.controller";
import { AuthService } from "./features/auth/auth.service";
import { PropertyBidController } from "./features/bids/property.bid.controller";
import { PropertyBidService } from "./features/bids/property.bid.service";
import { PropertyController } from "./features/properties/property.controller";
import { PropertyService } from "./features/properties/property.service";
import { UserController } from "./features/users/user.controller";
import { UserService } from "./features/users/user.service";
import { AWSService } from "./integrations/aws.service";
import { MailService } from "./integrations/mail.service";
import { MailgunService } from "./integrations/mailgun.service";
import { RedisService } from "./integrations/redis.service";

export default (function () {
  //
  //
  // Register Controllers
  AuthController;
  UserController;
  PropertyController;
  PropertyBidController;

  //
  //
  // Register Injectables
  return registerDependency([
    {
      name: "AuthMiddleware",
      injectable: Authenticate,
    },
    {
      name: "LandlordRoleMiddleware",
      injectable: LandlordRole,
    },
    {
      name: "TenantRoleMiddleware",
      injectable: TenantRole,
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
    {
      name: "AWSService",
      injectable: AWSService,
    },

    //
    // Service Layers
    {
      name: "AuthService",
      injectable: AuthService,
    },
    {
      name: "UserService",
      injectable: UserService,
    },
    {
      name: "PropertyService",
      injectable: PropertyService,
    },
    {
      name: "PropertyBidService",
      injectable: PropertyBidService,
    },
  ]);
})();
