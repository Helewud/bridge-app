import { injectable } from "inversify";
import envConfig from "../../config/env.config";
import { AppError } from "../../utils/error.helper";

const { MAILGUN_KEY, MAILGUN_DOMAIN, MAILGUN_HOST } = envConfig;

const mailgun = require("mailgun-js")({
  apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN,
  host: MAILGUN_HOST,
});

@injectable()
export class MailgunService {
  private client() {
    return mailgun;
  }

  async send(data: {
    from: string;
    to: string;
    subject: string;
    html?: string;
    text?: string;
  }) {
    try {
      const response = await this.client().messages().send(data);

      console.log(`SENDING EMAIL - ${data.to} - ${data.subject}`);

      return response;
    } catch (error: any) {
      throw new AppError(error, "BAD_GATEWAY");
    }
  }
}
