import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import { InversifyExpressServer } from "inversify-express-utils";
import AppContainer from "./app/app.container";
import { errorHandler } from "./utils/error.helper";
import { setupDocs } from "./providers/swaggar.provider";
import { passportConfig } from "./providers/passport.provider";

(function () {
  try {
    const server = new InversifyExpressServer(AppContainer);

    const app = server.build();

    app.use(helmet());
    app.use(helmet.hidePoweredBy());
    app.use(express.json());
    app.use(passport.initialize());

    passportConfig(passport, app);
    app.use(setupDocs());

    app.use(errorHandler);

    app.listen(3000, () => console.log("Server started on port 3000 :)"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
