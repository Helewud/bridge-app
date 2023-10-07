import { Router, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { resolve } from "path";
import envConfig from "../config/env.config";

const { BASE_URL } = envConfig;

const route = "/docs";
const config = swaggerJsDoc({
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
  apis: [resolve(__dirname, "../app/features/**/*.doc.ts")],
});

export const setupDocs = () => {
  const router = Router();

  const swaggerHtml = swaggerUi.generateHTML(config);
  router.use(route, swaggerUi.serveFiles(config));
  router.get(route, (req: Request, res: Response) => res.send(swaggerHtml));

  return router;
};
