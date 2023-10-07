import { inject, injectable } from "inversify";
import { Dependency } from "../../utils/container.helper";
import { MailgunService } from "./mailgun.service";
import { AppError } from "../../utils/error.helper";
@injectable()
export class MailService {
  constructor(
    @inject(Dependency.MailgunService) private mailgunService: MailgunService
  ) {}

  async sendActivationMail(data: { email: string }) {
    await this.mailgunService
      .send({
        from: "Bridge <info@bridge-demo.app>",
        to: data.email,
        subject: "Welcome to Bridge",
        html: "",
      })
      .catch((error) => {
        return new AppError(error, "BAD_GATEWAY");
      });
  }
}
