import { MailtrapClient, SendError, SendResponse } from "mailtrap"
import { VERIFICATION_EMAIL_TEMPLATE } from "./mailtrap.template"
import "dotenv/config"

type SendEmailResponse = SendResponse | SendError | { errors: unknown }
interface EmailProps { to: string; subject: string; html: string }

export class EmailService {
  private client: MailtrapClient;

  constructor() {
    const token = process.env.MAILTRAP_TOKEN;
    if (!token) throw new Error('MAILTRAP_TOKEN is not defined')
    this.client = new MailtrapClient({ token })
  }

  async sendEmail({ to, subject, html }: EmailProps): Promise<SendEmailResponse> {
    try {
      const sender = { email: 'auth@gestion_salud.com', name: 'Gestion Salud' }
      return await this.client.send({
        from: sender,
        to: [{ email: to }],
        subject,
        html
      })
    } catch (e: unknown) {
      if (isErrorResponse(e)) return e
      return { errors: e }
    }
  }

  async sendVerificationEmail(email: string, verificationToken: string): Promise<SendEmailResponse> {
    // const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    const emailOptions: EmailProps = {
      to: email,
      subject: "Verifica tu cuenta",
      html: VERIFICATION_EMAIL_TEMPLATE
    }
    return this.sendEmail(emailOptions)
  }
}

export default new EmailService()
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
function isErrorResponse(e: unknown): e is SendError { return (typeof e === "object" && e !== null && "errors" in e) }