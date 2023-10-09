import { Container } from "inversify";

export const Dependency = {
  AuthMiddleware: Symbol("AuthMiddleware"),
  TenantRoleMiddleware: Symbol("TenantRoleMiddleware"),
  LandlordRoleMiddleware: Symbol("LandlordRoleMiddleware"),

  AuthService: Symbol("AuthService"),
  UserService: Symbol("UserService"),
  PropertyService: Symbol("PropertyService"),
  PropertyBidService: Symbol("PropertyBidService"),

  MailgunService: Symbol("MailgunService"),
  MailService: Symbol("MailService"),
  RedisService: Symbol("RedisService"),
  AWSService: Symbol("AWSService"),

  PrismaRepository: Symbol("PrismaRepository"),
};

export const Guard = {
  Auth: Dependency.AuthMiddleware,
  Tenant: Dependency.TenantRoleMiddleware,
  Landlord: Dependency.LandlordRoleMiddleware,
};

export function registerDependency(
  dependencies: {
    injectable: new (...args: never[]) => any;
    name: keyof typeof Dependency;
  }[]
) {
  const container = new Container({ defaultScope: "Singleton" });

  dependencies.forEach((dependency) =>
    container.bind(Dependency[dependency.name]).to(dependency.injectable)
  );

  return container;
}
