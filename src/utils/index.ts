import { Result } from "../interfaces/response.interface"
import { User } from "../interfaces/model.interface"
import emailService from "./mailtrap.service"
import { SendError } from 'mailtrap'

/**
 * Envia un email de verificación al usuario para autenticar su cuenta.
 * @param {User} user - Documento del usuario a verificar, contiene las propiedades email, verificationToken, entre otras.
 */
export async function sendVerificationEmail(user: User): Promise<Result<boolean>> {
  const success = await emailService.sendVerificationEmail(user.email, user.verificationToken)
  if ('errors' in success) return { error: success.errors }
  return { value: true }
  //working here...
  // } catch (error) { return { error: "Error interno al enviar el email de verificación" } }
}