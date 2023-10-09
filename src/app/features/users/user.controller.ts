import { inject } from "inversify";
import express from "express";
import {
  controller,
  httpGet,
  interfaces,
  request,
  response,
} from "inversify-express-utils";
import { Dependency, Guard } from "../../../utils/container.helper";
import { UserService } from "./user.service";
import { resolve } from "../../../utils/response.helper";
import { User } from ".prisma/client";
import { GetUserProfileDto } from "./user.dto";
import { paramsValidator } from "../../../middlewares/validator.middleware";

@controller("/users")
export class UserController implements interfaces.Controller {
  constructor(
    @inject(Dependency.UserService) private userService: UserService
  ) {}

  @httpGet("/profile", Guard.Auth)
  async getProfile(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;
      return resolve(this.userService.getProfile(user.id), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpGet("/profile/:id", Guard.Auth, paramsValidator(GetUserProfileDto))
  async getUserProfile(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return resolve(this.userService.getProfile(req.params.id), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
