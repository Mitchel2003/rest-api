import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "../templates/mailtrap.template"
import { MailtrapClient, SendError } from "mailtrap"

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

  private async sendEmail(options: EmailProps): Promise<Result<boolean>> {
    const sender = { email: 'mailtrap@demomailtrap.com', name: 'Gestion Salud' }
    try {
      const response: MailtrapResult = await this.client.send({ ...options, from: sender })
      if (!response.success) return { error: (response as SendError).errors.join(', ') }
      return { value: true }
    } catch (e) { return { error: `Error interno al enviar el email: ${e}` } }
  }

  async sendVerificationEmail(email: string, verificationToken: string): Promise<Result<boolean>> {
    const emailOptions: EmailProps = {
      to: [{ email }],
      subject: "Verifica tu cuenta",
      category: 'Verificación de email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
    }
    return this.sendEmail(emailOptions)
  }

  async sendResetPasswordEmail(email: string, resetToken: string): Promise<Result<boolean>> {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    const emailOptions: EmailProps = {
      to: [{ email }],
      subject: "Restablece tu contraseña",
      category: 'Restablecimiento de contraseña',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', url)
    }
    return this.sendEmail(emailOptions)
  }

  async sendResetSuccessEmail(email: string): Promise<Result<boolean>> {
    const emailOptions: EmailProps = {
      to: [{ email }],
      subject: "Restablecimiento de contraseña exitoso",
      category: 'Restablecimiento de contraseña',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE
    }
    return this.sendEmail(emailOptions)
  }
}

export default new EmailService()