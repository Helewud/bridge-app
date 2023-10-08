export enum TokenType {
  EMAIL_VERIFICATION = "email-verification",
  PASSWORD_RESET = "password-reset",
}

export enum TokenExpiration {
  ONE_HOUR = 60 * 60,
  TWENTY_FOUR_HOURS = 60 * 60 * 24,
  ONE_WEEK = 60 * 60 * 24 * 7,
}
