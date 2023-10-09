import express, { Router, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { resolve } from "path";
import envConfig from "../config/env.config";

const { BASE_URL } = envConfig;

const route = "/api/docs";
export const config = swaggerJsDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    servers: [{ url: `${BASE_URL}/docs` }],
    info: {
      title: "API Docs for Bridge",
      description: `Base Url: ${BASE_URL}/docs`,
      contact: { name: "helewud", email: "john@doe.com" },
      version: "1.0.0",
    },
  },
  apis: [resolve(__dirname, "../app/features/**/*.{ts,js}")],
});

export const setupDocs = (app: express.Application) => {
  const swaggerHtml = swaggerUi.generateHTML(config);
  app.use(route, swaggerUi.serveFiles(config));
  app.get(route, (req: Request, res: Response) => res.send(swaggerHtml));

  return app;
};
