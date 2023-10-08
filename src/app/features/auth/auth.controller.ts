import express from "express";
import { inject } from "inversify";
import { z } from "zod";
import {
  interfaces,
  controller,
  httpGet,
  request,
  response,
  requestBody,
  BaseHttpController,
  httpPost,
} from "inversify-express-utils";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterUserDto } from "./auth.dto";
import { resolve } from "../../../utils/response.helper";
import { bodyValidator } from "../../../middlewares/validator.middleware";
import { Dependency } from "../../../utils/container.helper";

@controller("/auth")
export class AuthController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(Dependency.AuthService)
    private readonly authService: AuthService
  ) {
    super();
  }

  @httpPost("/register", bodyValidator(RegisterUserDto))
  async register(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return resolve(this.authService.register(req.body), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpPost("/login", bodyValidator(LoginDto))
  async login(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return resolve(this.authService.login(req.body), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
