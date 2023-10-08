import "dotenv/config";

export default {
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASS: process.env.DATABASE_PASS,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 3000,

  DATABASE_URL: process.env.DATABASE_URL,
  BASE_URL: process.env.BASE_URL,
  JWT_SECRET: String(process.env.JWT_SECRET),

  MAILGUN_KEY: String(process.env.MAILGUN_KEY),
  MAILGUN_DOMAIN: String(process.env.MAILGUN_DOMAIN),
  MAILGUN_HOST: String(process.env.MAILGUN_HOST),

  REDIS_URL: process.env.REDIS_URL,
};
