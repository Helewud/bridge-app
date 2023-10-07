import { injectable } from "inversify";
import { createClient } from "redis";
import envConfig from "../../config/env.config";

const TWENTY_FOUR_HOURS = 24 * 60 * 60;

@injectable()
export class RedisService {
  private client = (() => {
    return createClient({
      url: envConfig.REDIS_URL,
    });
  })();

  async get<T = any>(key: string): Promise<T> {
    const value = await this.client.get(key);
    return value
      ? typeof value === "object"
        ? JSON.parse(value)
        : value
      : null;
  }

  async setexp(key: string, value: unknown, expiresAt = TWENTY_FOUR_HOURS) {
    return this.client.set(key, JSON.stringify(value), { EX: expiresAt });
  }

  async set(key: string, value: string | number) {
    return this.client.set(key, value);
  }

  async del(keyOrKeys: string | string[]) {
    return this.client.del(keyOrKeys);
  }

  async subscribe(channel: string, listener: () => void) {
    this.client.subscribe(channel, listener);
  }
}
