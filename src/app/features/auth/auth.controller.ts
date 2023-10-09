import express from "express";
import { inject } from "inversify";
import {
  interfaces,
  controller,
  httpGet,
  request,
  response,
  httpPost,
  requestParam,
} from "inversify-express-utils";
import { AuthService } from "./auth.service";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterUserDto,
  ResendVerificationEmailDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from "./auth.dto";
import { resolve } from "../../../utils/response.helper";
import {
  bodyValidator,
  paramsValidator,
} from "../../../middlewares/validator.middleware";
import { Dependency, Guard } from "../../../utils/container.helper";
import { User } from "@prisma/client";

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
    @response() res: express.Response,
    @requestParam() params: ResendVerificationEmailDto
  ) {
    try {
      return resolve(this.authService.resendVerificationEmail(params), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpPost("/email", bodyValidator(VerifyEmailDto))
  async verifyEmail(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return resolve(this.authService.verifyEmail(req.body), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpGet("/reset/:email", paramsValidator(ForgotPasswordDto))
  async forgotPassword(
    @response() res: express.Response,
    @requestParam() params: ResendVerificationEmailDto
  ) {
    try {
      return resolve(this.authService.forgotPassword(params), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpPost("/reset", bodyValidator(ResetPasswordDto))
  async resetPassword(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return resolve(this.authService.resetPassword(req.body), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpPost("/change-password", Guard.Auth, bodyValidator(ChangePasswordDto))
  async changePassword(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;
      return resolve(this.authService.changePassword(user.id, req.body), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
