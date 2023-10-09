import { injectable } from "inversify";
import { PrismaRepository } from "../../../providers/prisma.repository";
import { LandlordBidActionDto, TenantBidActionto } from "./property.bid.dto";
import { AppError } from "../../../utils/error.helper";
import { PropertyBidStatus, Roles } from "@prisma/client";

@injectable()
export class PropertyBidService extends PrismaRepository {
  constructor() {
    super();
  }

  async tenantBidAction(userId: string, dto: TenantBidActionto) {
    const property = await this.prisma.property.findFirst({
      where: {
        id: dto.propertyId,
      },
    });

    if (!property) {
      throw new AppError("Invalid property id!", "BAD_REQUEST");
    }

    if (property.userId === userId) {
      throw new AppError("User cannot bid on own property!", "BAD_REQUEST");
    }

    const rootBid = await this.prisma.propertyBid.findFirst({
      where: {
        propertyId: dto?.propertyId,
        bidOwnerId: userId,
        rootBid: null,
      },
    });

    let latestBid;

    if (rootBid) {
      const lastBid = await this.prisma.propertyBid.findFirst({
        where: {
          propertyId: dto?.propertyId,
          bidOwnerId: userId,
        },
        select: {
          index: true,
        },
        orderBy: {
          index: "desc",
        },
      });

      latestBid = await this.prisma.propertyBid.create({
        data: {
          propertyId: dto.propertyId,
          propertyOwnerId: property.userId,
          price: dto.price,
          bidOwnerId: userId,
          index: (lastBid?.index || 0) + 1,
          status: PropertyBidStatus.REBID,
          rootBid: rootBid.id,
        },
      });
    } else {
      latestBid = await this.prisma.propertyBid.create({
        data: {
          propertyId: dto.propertyId,
          price: dto.price,
          propertyOwnerId: property.userId,
          bidOwnerId: userId,
          index: 0,
          status: PropertyBidStatus.BID,
        },
      });
    }

    return {
      message: "Bid submitted successfully.",
      data: latestBid,
    };
  }

  async landlordBidAction(userId: string, dto: LandlordBidActionDto) {
    const bid = await this.prisma.propertyBid.findFirst({
      where: {
        id: dto.bidId,
      },
    });

    if (!bid) {
      throw new AppError("Invalid bid id", "BAD_REQUEST");
    }

    const lastBid = await this.prisma.propertyBid.findFirst({
      where: {
        propertyId: bid.propertyId,
        propertyOwnerId: bid.propertyOwnerId,
        bidOwnerId: bid.bidOwnerId,
      },
      select: {
        index: true,
      },
      orderBy: {
        index: "desc",
      },
    });

    let latestBid;

    if (dto.bidAction === PropertyBidStatus.COUNTER_BID) {
      latestBid = await this.prisma.propertyBid.create({
        data: {
          propertyId: bid.propertyId,
          propertyOwnerId: bid.propertyOwnerId,
          bidOwnerId: bid.bidOwnerId,
          price: dto?.price!,
          index: (lastBid?.index || 0) + 1,
          status: PropertyBidStatus.COUNTER_BID,
          rootBid: bid?.rootBid ?? bid?.id,
        },
      });

      // Todo: Send mail informing the tenant about the counter bid
    }

    if (dto.bidAction === PropertyBidStatus.REJECTED) {
      latestBid = await this.prisma.propertyBid.create({
        data: {
          propertyId: bid.propertyId,
          propertyOwnerId: bid.propertyOwnerId,
          bidOwnerId: bid.bidOwnerId,
          price: bid.price,
          index: (lastBid?.index || 0) + 1,
          status: PropertyBidStatus.REJECTED,
          rootBid: bid?.rootBid ?? bid?.id,
        },
      });

      // Todo: Send mail informing the tenant about the rejected bid
    }

    if (dto.bidAction === PropertyBidStatus.ACCEPTED) {
      latestBid = await this.prisma.propertyBid.create({
        data: {
          propertyId: bid.propertyId,
          propertyOwnerId: bid.propertyOwnerId,
          bidOwnerId: bid.bidOwnerId,
          price: bid.price,
          index: (lastBid?.index || 0) + 1,
          status: PropertyBidStatus.ACCEPTED,
          rootBid: bid?.rootBid ?? bid?.id,
        },
      });

      // Todo: Send mail informing the tenant about the accepted bid and payment link to proceed to pay
    }

    return {
      message: "Bid action submitted successfully.",
      data: latestBid,
    };
  }

  async getBidHistory(userId: string, role: Roles) {
    let bids;

    if (role === Roles.TENANT) {
      bids = await this.prisma.propertyBid.findMany({
        where: {
          bidOwnerId: userId,
        },
        distinct: ["bidOwnerId", "propertyId", "propertyOwnerId"],
        include: {
          property: true,
        },
        orderBy: {
          index: "desc",
        },
      });
    }

    if (role === Roles.LANDLORD) {
      bids = await this.prisma.propertyBid.findMany({
        where: {
          propertyOwnerId: userId,
        },
        distinct: ["bidOwnerId", "propertyId", "propertyOwnerId"],
        include: {
          property: true,
        },
        orderBy: {
          index: "desc",
        },
      });
    }

    return { message: "Bids history fetched successfully.", data: bids };
  }

  async getBidInfo(userId: string, bidId: string, role: Roles) {
    const anchorBid = await this.prisma.propertyBid.findFirst({
      where: { id: bidId, bidOwnerId: userId },
    });

    if (!anchorBid) {
      throw new AppError("Invalid bid id!", "BAD_REQUEST");
    }

    if (
      !(anchorBid.bidOwnerId === userId || anchorBid.propertyOwnerId === userId)
    ) {
      throw new AppError("User not authorized for action!", "UNAUTHORIZED");
    }

    const bids = await this.prisma.propertyBid.findMany({
      where: {
        OR: [
          {
            id: anchorBid.id,
          },
          {
            id: anchorBid.rootBid!,
          },
          {
            rootBid: anchorBid.rootBid,
          },
        ],
      },
      orderBy: {
        index: "desc",
      },
    });

    return { message: "Bids history fetched successfully.", data: bids };
  }
}
