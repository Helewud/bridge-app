import { Container } from "inversify";

export const Dependency = {
  AuthService: Symbol("AuthService"),

  MailgunService: Symbol("MailgunService"),
  MailService: Symbol("MailService"),

  PrismaRepository: Symbol("PrismaRepository"),
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
