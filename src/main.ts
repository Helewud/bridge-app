import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import { InversifyExpressServer } from "inversify-express-utils";
import AppContainer from "./app/app.container";
import { errorHandler } from "./utils/error.helper";
// import { setupDocs } from "./providers/swaggar.provider";
import swaggerUi from "swagger-ui-express";
import { swaggarConfig } from "./providers/swaggar.provider";
// import swaggarJSON from "./providers/swagger.json";

function main() {
  const server = new InversifyExpressServer(
    AppContainer,
    null,
    { rootPath: "/api" },
    null
  );

  server
    .setConfig((app) => {
      app.use(helmet());
      app.use(helmet.hidePoweredBy());
      app.use(express.json());

      app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggarConfig));
    })
    .setErrorConfig((app) => {
      app.use(errorHandler);
    })
    .build()

    .listen(3000, () => console.log("Server started on port 3000!!!!"));
}

export default main();
