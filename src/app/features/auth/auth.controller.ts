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
  requestParam,
} from "inversify-express-utils";
import { AuthService } from "./auth.service";
import {
  LoginDto,
  RegisterUserDto,
  ResendVerificationEmailDto,
} from "./auth.dto";
import { resolve } from "../../../utils/response.helper";
import {
  bodyValidator,
  paramsValidator,
} from "../../../middlewares/validator.middleware";
import { Dependency } from "../../../utils/container.helper";
import { authGuard } from "../../../common/constant";

@controller("/auth")
export class AuthController implements interfaces.Controller {
  constructor(
    @inject(Dependency.AuthService)
    private readonly authService: AuthService
  ) {}

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

  @httpGet("/email/:email", paramsValidator(ResendVerificationEmailDto))
  async resendVerificationEmail(
    @request() req: express.Request,
    @response() res: express.Response,
    @requestParam() param: ResendVerificationEmailDto
  ) {
    try {
      return resolve(this.authService.resendVerificationEmail(param), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
