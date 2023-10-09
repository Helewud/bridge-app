import { inject, injectable } from "inversify";
import { PrismaRepository } from "../../../providers/prisma.repository";
import {
  AddPropertyDto,
  EditPropertyDto,
  GetPropertiesDto,
} from "./property.dto";
import { PropertyStatus } from "@prisma/client";
import { AppError } from "../../../utils/error.helper";
import { Dependency } from "../../../utils/container.helper";
import { AWSService } from "../../integrations/aws.service";
import { getFileExtension } from "../../../utils/media.helper";
import { mediaSupportedFormats } from "../../../common/constant";
import { generateUniqueIdentifier } from "../../../utils/function.helper";

@injectable()
export class PropertyService extends PrismaRepository {
  constructor(@inject(Dependency.AWSService) private awsService: AWSService) {
    super();
  }

  async addProperty(userId: string, dto: AddPropertyDto) {
    const property = await this.prisma.property.create({
      data: {
        ...dto,
        userId,
        status: PropertyStatus.OPEN,
      },
    });

    //   send email to user

    return {
      message: "Property added for listing successfully.",
      data: property,
    };
  }

  async editProperty(userId: string, dto: EditPropertyDto) {
    const property = await this.prisma.property.findFirst({
      where: {
        id: dto.propertyId,
        userId,
      },
    });

    if (!property) {
      throw new AppError("Property not found", "NOT_FOUND");
    }

    if (property.status !== PropertyStatus.OPEN) {
      throw new AppError(
        "Only properties with open status can be edited",
        "BAD_REQUEST"
      );
    }

    const updatedProperty = await this.prisma.property.update({
      where: {
        id: dto.propertyId,
      },
      data: {
        price: dto?.price,
        address: dto?.address,
        city: dto?.city,
        state: dto?.state,
        numberOfRooms: dto?.numberOfRooms,
        amenities: dto?.amenities,
        description: dto?.description,
        media: dto?.media,
      },
    });

    if (!updatedProperty) {
      throw new AppError("Error editing property!", "BAD_REQUEST");
    }

    return {
      message: "Property updated succesfully.",
      data: updatedProperty,
    };
  }

  async getPropertyById(propertyId: string) {
    const property = await this.prisma.property.findFirst({
      where: {
        id: propertyId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    if (!property) {
      throw new AppError("Property not found", "NOT_FOUND");
    }

    return {
      message: "Property fetched succesfully.",
      data: property,
    };
  }

  async getProperties(dto: GetPropertiesDto, userId?: string) {
    const take = Number(dto?.limit ?? 20);
    const page = Number(dto.page ?? 1);
    const skip = take * page <= 1 ? 0 : page - 1;

    const property = await this.prisma.property.findMany({
      where: {
        ...(userId && { userId }),
        ...(dto?.status && { status: dto.status }),
        ...(dto?.startDate &&
          dto?.endDate && {
            createdAt: {
              gte: dto.startDate,
              lte: dto.endDate,
            },
          }),
        ...(dto?.startNumberOfRooms &&
          dto?.endNumberOfRooms && {
            numberOfRooms: {
              gte: dto?.startNumberOfRooms,
              lte: dto?.endNumberOfRooms,
            },
          }),
        ...(dto?.startPrice &&
          dto?.endPrice && {
            price: {
              gte: +dto?.startPrice,
              lte: +dto?.endPrice,
            },
          }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },

      take,
      skip,
    });

    return {
      message: "Properties fetched succesfully.",
      data: property,
    };
  }

  async uploadPropertyMedia(userId: string, file: Express.Multer.File) {
    const fileExtension = getFileExtension(file.mimetype);

    if (
      ![
        ...mediaSupportedFormats.image,
        ...mediaSupportedFormats.video,
      ].includes(fileExtension)
    ) {
      throw new AppError("Media type not supported!", "BAD_REQUEST");
    }

    if (
      mediaSupportedFormats.image.includes(fileExtension) &&
      file.size > mediaSupportedFormats.imageSize
    ) {
      throw new AppError("Image size greater than 5mb", "BAD_REQUEST");
    }

    if (
      mediaSupportedFormats.video.includes(fileExtension) &&
      file.size > mediaSupportedFormats.videoSize
    ) {
      throw new AppError("Image size greater than 10mb", "BAD_REQUEST");
    }

    const fileName = generateUniqueIdentifier(userId) + "." + fileExtension;

    const response = await this.awsService.upload(file.buffer, fileName);

    return {
      message: "Media uploaded successfully!",
      data: response,
    };
  }
}
