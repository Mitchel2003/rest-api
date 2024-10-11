import { Result } from "../interfaces/response.interface";
import { User } from "../interfaces/model.interface";
// import { emailService } from "./emailService";

/**
 * Envia un email de verificación al usuario para autenticar su cuenta.
 * @param {User} user - Documento del usuario a verificar, contiene las propiedades email, verificationToken, entre otras.
 */
export async function sendVerificationEmail(user: User): Promise<Result<boolean>> {
  try {
    const success = await emailService.sendVerificationEmail(user.email, user.verificationToken);
    if (!success) return { error: "No se pudo enviar el email de verificación" }
    return { value: true };
  } catch (error) { return { error: "Error interno al enviar el email de verificación" } }
}
