import { injectable } from "inversify";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import envConfig from "../../config/env.config";
import { AppError } from "../../utils/error.helper";

const { AWS_REGION, AWS_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } =
  envConfig;

@injectable()
export class AWSService {
  private async client() {
    try {
      const client = new S3({
        region: AWS_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      });

      const { Buckets } = await client.listBuckets({});

      const bucketExist =
        Buckets &&
        Buckets.some(
          (bucket) => (bucket.Name || "").toLowerCase() === AWS_BUCKET_NAME
        );

      if (!bucketExist) {
        await client.createBucket({
          Bucket: AWS_BUCKET_NAME,
        });
      }

      console.log("AWS S3 SERVICE: Bucket Initialized");

      return client;
    } catch (error) {
      console.error("AWS S3 SERVICE: " + error);
      throw new AppError("Error initializing AWS Service", "BAD_GATEWAY");
    }
  }

  private getPublicLink(key: string) {
    return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
  }

  async upload(media: Buffer, mediaIdentifier: string) {
    try {
      const s3 = await this.client();

      const mediaObject = new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: mediaIdentifier,
        Body: media,
        ACL: "public-read",
      });

      await s3.send(mediaObject);

      console.log("S3 upload successful.");

      return {
        mediaIdentifier,
        publicUrl: this.getPublicLink(mediaIdentifier),
      };
    } catch (error: any) {
      throw new AppError(error, "BAD_GATEWAY");
    }
  }
}
