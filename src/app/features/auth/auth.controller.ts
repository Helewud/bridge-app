import express from "express";
import { inject } from "inversify";
import {
  interfaces,
  controller,
  httpGet,
  request,
  response,
  requestBody,
} from "inversify-express-utils";
import { Dependency } from "../../../utils/container.helper";
import { AuthService } from "./auth.service";

@controller("/auth")
export class AuthController implements interfaces.Controller {
  constructor(
    @inject(Dependency.AuthService)
    private readonly authService: AuthService
  ) {}

  @httpGet("/")
  async health(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      //   this.AuthService.ff();

      res.status(200).json({ message: "works" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
