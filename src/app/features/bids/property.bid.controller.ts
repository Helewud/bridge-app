import express from "express";
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
import { inject } from "inversify";
import { User } from "@prisma/client";
import { PropertyBidService } from "./property.bid.service";
import {
  bodyValidator,
  paramsValidator,
} from "../../../middlewares/validator.middleware";
import {
  GetBidInfoDto,
  LandlordBidActionDto,
  TenantBidActionto,
} from "./property.bid.dto";
import { resolve } from "../../../utils/response.helper";

@controller("/bids")
export class PropertyBidController implements interfaces.Controller {
  constructor(
    @inject(Dependency.PropertyBidService)
    private propertyBidService: PropertyBidService
  ) {}

  @httpPost(
    "/tenant",
    Guard.Auth,
    Guard.Tenant,
    bodyValidator(TenantBidActionto)
  )
  async tenantBidAction(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;

      return resolve(
        this.propertyBidService.tenantBidAction(user.id, req.body),
        res
      );
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpPost(
    "/landlord",
    Guard.Auth,
    Guard.Landlord,
    bodyValidator(LandlordBidActionDto)
  )
  async landlordBidAction(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;

      return resolve(
        this.propertyBidService.landlordBidAction(user.id, req.body),
        res
      );
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpGet("/history", Guard.Auth)
  async getBidHistory(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const user = req.user as User;

      return resolve(
        this.propertyBidService.getBidHistory(user.id, user.role),
        res
      );
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  @httpGet("/info/:bidId", Guard.Auth, paramsValidator(GetBidInfoDto))
  async getBidInfo(
    @request() req: express.Request,
    @response() res: express.Response,
    @requestParam() param: GetBidInfoDto
  ) {
    try {
      const user = req.user as User;

      return resolve(
        this.propertyBidService.getBidInfo(user.id, param.bidId, user.role),
        res
      );
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}
