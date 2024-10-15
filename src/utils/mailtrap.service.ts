import { VERIFICATION_EMAIL_TEMPLATE } from "./mailtrap.template"
import { MailtrapClient, SendResponse } from "mailtrap"

import { MailtrapResult, EmailProps } from "../interfaces/props.interface"
import { Result } from "../interfaces/response.interface"
import "dotenv/config"

export class EmailService {
  private client: MailtrapClient;

  constructor() {
    const token = process.env.MAILTRAP_TOKEN;
    if (!token) throw new Error('MAILTRAP_TOKEN is not defined')
    this.client = new MailtrapClient({ token })
  }

  async sendEmail(options: EmailProps): Promise<MailtrapResult> {
    const sender = { email: 'mailtrap@demomailtrap.com', name: 'Gestion Salud' }
    return this.client.send({
      ...options,
      from: sender,
    })
  }

  async sendVerificationEmail(email: string, verificationToken: string): Promise<Result<boolean>> {
    try {
      const emailOptions: EmailProps = {
        to: [{ email }],
        subject: "Verifica tu cuenta",
        category: 'Verificación de email',
        html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
      }
      const result = await this.sendEmail(emailOptions)
      if (isSuccessResponse(result)) return { value: true }
      return { error: result.errors.join(', ') }
    } catch (error) { return { error: `Error interno al enviar el email de verificación: ${error}` } }
  }
}

export default new EmailService()
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
function isSuccessResponse(result: MailtrapResult): result is SendResponse { return result.success }