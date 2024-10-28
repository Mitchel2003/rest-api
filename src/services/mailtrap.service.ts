import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "../templates/mailtrap.template"
import { MailtrapClient, SendError } from "mailtrap"
import config from "../utils/config"

import { MailtrapResult, EmailProps } from "../interfaces/props.interface"
import { Result } from "../interfaces/api.interface"
import { User } from "../types/user/user.type"

export class EmailService {
  private client: MailtrapClient;

  constructor() {
    const token = config.mailtrapToken;
    if (!token) throw new Error('MAILTRAP_TOKEN is not defined')
    this.client = new MailtrapClient({ token })
  }

  /**
   * Configura una solicitud email para enviarla al usuario
   * @params {EmailProps} options - Objeto con los datos del email a enviar
   * @returns {Result<boolean>} - Resultado booleano de la operación
   */
  private async sendEmail(options: EmailProps): Promise<Result<boolean>> {
    const sender = { email: 'mailtrap@demomailtrap.com', name: 'Gestion Salud' }
    try {
      const response: MailtrapResult = await this.client.send({ ...options, from: sender })
      if (!response.success) return { error: (response as SendError).errors.join(', ') }
      return { value: true }
    } catch (e) { return { error: `Error interno del servidor al enviar el email: ${e}` } }
  }

  /**
   * Envia un email de verificacion de cuenta al usuario
   * @param {User} user - Objeto de usuario
   * @param {string} user.email - Email del usuario
   * @param {string} user.verificationToken - Corresponde a un codigo de 6 digitos
   * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
   */
  async sendVerificationEmail({ email, verificationToken }: User): Promise<Result<boolean>> {
    const emailOptions: EmailProps = {
      to: [{ email }],
      subject: "Verifica tu cuenta",
      category: 'Verificación de email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken as string)
    }
    return this.sendEmail(emailOptions)
  }

  /**
   * Envia un email de restablecimiento de contraseña al usuario
   * @param {string} email - Email del usuario
   * @param {string} resetToken - Representa un string aleatorio de 20 caracteres
   * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
   */
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

  /**
   * Envia un email de confirmacion de restablecimiento de contraseña exitoso al usuario
   * @param {string} email - Email del usuario
   * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
   */
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