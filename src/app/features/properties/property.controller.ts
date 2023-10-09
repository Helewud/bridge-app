import { inject } from "inversify";
import express from "express";
import { User } from "@prisma/client";
import multer from "multer";
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import { Dependency, Guard } from "../../../utils/container.helper";
import { PropertyService } from "./property.service";
import {
  bodyValidator,
  paramsValidator,
  queryValidator,
} from "../../../middlewares/validator.middleware";
import { resolve } from "../../../utils/response.helper";
import {
  AddPropertyDto,
  EditPropertyDto,
  GetPropertiesDto,
  GetPropertyByIdDto,
} from "./property.dto";

const upload = multer({ storage: multer.memoryStorage() });

@controller("/properties")
export class PropertyController implements interfaces.Controller {
  constructor(
    @inject(Dependency.PropertyService) private propertyService: PropertyService
  ) {}

  @httpGet("/listing", Guard.Auth, queryValidator(GetPropertiesDto))
  async getProperties(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return resolve(this.propertyService.getProperties(req.query), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpGet("/listing/:id", Guard.Auth, paramsValidator(GetPropertyByIdDto))
  async getPropertyById(
    @response() res: express.Response,
    @requestParam() param: GetPropertyByIdDto
  ) {
    try {
      return resolve(this.propertyService.getPropertyById(param.id), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpGet(
    "/user",
    Guard.Auth,
    Guard.Landlord,
    queryValidator(GetPropertiesDto)
  )
  async getPersonalProperties(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;

      return resolve(
        this.propertyService.getProperties(req.query, user.id),
        res
      );
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpGet(
    "/user/:id",
    Guard.Auth,
    paramsValidator(GetPropertyByIdDto),
    queryValidator(GetPropertiesDto)
  )
  async getUserProperties(
    @request() req: express.Request,
    @response() res: express.Response,
    @requestParam() param: GetPropertyByIdDto
  ) {
    try {
      return resolve(
        this.propertyService.getProperties(req.query, param.id),
        res
      );
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpPost(
    "/listing/add",
    Guard.Auth,
    Guard.Landlord,
    bodyValidator(AddPropertyDto)
  )
  async addProperty(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;

      return resolve(this.propertyService.addProperty(user.id, req.body), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpPost(
    "/listing/edit",
    Guard.Auth,
    Guard.Landlord,
    bodyValidator(EditPropertyDto)
  )
  async editProperty(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;
      return resolve(this.propertyService.editProperty(user.id, req.body), res);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpPost("/upload", upload.single("media"), Guard.Auth, Guard.Landlord)
  async uploadPropertyMedia(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;

      return resolve(
        this.propertyService.uploadPropertyMedia(user.id, req.file!),
        res
      );
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
