import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import { InversifyExpressServer } from "inversify-express-utils";
import AppContainer from "./app/app.container";
import { errorHandler } from "./utils/error.helper";
import { setupDocs } from "./providers/swaggar.provider";
import { AuthProvider } from "./providers/auth.provider";

function main() {
  const server = new InversifyExpressServer(
    AppContainer,
    null,
    null,
    null,
    AuthProvider
  );

  server
    .setConfig((app) => {
      app.use(helmet());
      app.use(helmet.hidePoweredBy());
      app.use(express.json());

      app.use(setupDocs());
    })
    .setErrorConfig((app) => {
      app.use(errorHandler);
    })
    .build()
    .listen(3000, () => console.log("Server started on port 3000!!!!"));
}

export default main();
