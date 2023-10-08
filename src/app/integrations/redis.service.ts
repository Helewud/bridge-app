import { injectable } from "inversify";
import { createClient } from "redis";
import envConfig from "../../config/env.config";
import { AppError } from "../../utils/error.helper";

const TWENTY_FOUR_HOURS = 24 * 60 * 60;

@injectable()
export class RedisService {
  constructor() {}

  client = (() => {
    const cl = createClient({
      url: envConfig.REDIS_URL,
    });

    cl.connect();

    // Log when the Redis client is ready
    cl.on("ready", () => {
      console.log("Redis client connected!");
    });

    // Handle Redis errors (optional)
    cl.on("error", (error) => {
      console.error("Redis error:", error);
    });

    return cl;
  })();

  async get<T = any>(key: string): Promise<T> {
    try {
      const value = await this.client.get(key);
      return value
        ? typeof value === "object"
          ? JSON.parse(value)
          : value
        : null;
    } catch (error: any) {
      throw new AppError(error, "BAD_GATEWAY");
    }
  }

  async setexp(key: string, value: unknown, expiresAt = TWENTY_FOUR_HOURS) {
    try {
      return this.client.set(key, JSON.stringify(value), { EX: expiresAt });
    } catch (error: any) {
      throw new AppError(error, "BAD_GATEWAY");
    }
  }

  async set(key: string, value: string | number) {
    try {
      return this.client.set(key, value);
    } catch (error: any) {
      throw new AppError(error, "BAD_GATEWAY");
    }
  }

  async del(keyOrKeys: string | string[]) {
    try {
      return this.client.del(keyOrKeys);
    } catch (error: any) {
      throw new AppError(error, "BAD_GATEWAY");
    }
  }

  async subscribe(channel: string, listener: () => void) {
    try {
      this.client.subscribe(channel, listener);
    } catch (error: any) {
      throw new AppError(error, "BAD_GATEWAY");
    }
  }
}
