import { Dependency } from "../utils/container.helper";

export enum TokenType {
  EMAIL_VERIFICATION = "email-verification",
  PASSWORD_RESET = "password-reset",
}

export enum TokenExpiration {
  ONE_HOUR = 60 * 60,
  TWENTY_FOUR_HOURS = 60 * 60 * 24,
  ONE_WEEK = 60 * 60 * 24 * 7,
}

export const mediaSupportedFormats = {
  videoSize: 5242880 * 2,
  imageSize: 5242880,
  image: ["jpeg", "jpg", "png", "gif", "webp"],
  video: ["mp4", "webm", "hls"],
};
