import express, { Router, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { resolve } from "path";
import envConfig from "../config/env.config";
import { writeFileSync } from "fs";

const { BASE_URL } = envConfig;

const route = "/api/docs";
export const config = swaggerJsDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    servers: [{ url: `${BASE_URL}/docs` }],
    info: {
      title: "API Docs for Bridge",
      description: `Base Url: ${BASE_URL}/docs`,
      contact: { name: "helewud", email: "helewud@gmail.com" },
      version: "1.0.0",
    },
  },
  apis: [resolve(__dirname, "../app/features/**/*.{ts,js}")],
});

writeFileSync(
  resolve(__dirname, "swagger.json"),
  JSON.stringify(config, null, 2)
);

export const setupDocs = (app: express.Application) => {
  const swaggerHtml = swaggerUi.generateHTML(config);
  app.use(route, swaggerUi.serveFiles(config));
  app.get(route, (req: Request, res: Response) => res.send(swaggerHtml));

  return app;
};
