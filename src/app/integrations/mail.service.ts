import { inject, injectable } from "inversify";
import { MailgunService } from "./mailgun.service";
import { AppError } from "../../utils/error.helper";
import { Dependency } from "../../utils/container.helper";

@injectable()
export class MailService {
  constructor(
    @inject(Dependency.MailgunService) private mailgunService: MailgunService
  ) {}

  async sendVerificationMail(data: { email: string; token: string }) {
    try {
      const response = await this.mailgunService.send({
        from: "Bridge <info@bridge-demo.app>",
        to: data.email,
        subject: "Welcome to Bridge",
        text: `Please verify your email with token ${data.token}`,
      });

      return response;
    } catch (error: any) {
      return new AppError(error, "BAD_GATEWAY");
    }
  }
}
