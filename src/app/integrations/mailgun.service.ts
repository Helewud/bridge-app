import Mailgun, { MailgunMessageData } from "mailgun.js";
import FormData from "form-data";
import envConfig from "../../config/env.config";
import { injectable } from "inversify";

const { MAILGUN_KEY, MAILGUN_DOMAIN, MAILGUN_HOST } = envConfig;

@injectable()
export class MailgunService {
  private client() {
    const mailgun = new Mailgun(FormData);
    return mailgun.client({
      username: "api",
      key: MAILGUN_KEY,
      url: MAILGUN_HOST,
    });
  }

  async send(data: MailgunMessageData) {
    const response = await this.client().messages.create(MAILGUN_DOMAIN, data);

    console.log(`SENDING EMAIL - ${data.to} - ${data.subject}`);

    return response;
  }
}
