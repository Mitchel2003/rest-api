import { Result } from "../interfaces/api.interface";
import { User } from "../interfaces/model.interface";
export declare class EmailService {
    private client;
    constructor();
    /**
     * Configura una solicitud email para enviarla al usuario
     * @params {EmailProps} options - Objeto con los datos del email a enviar
     * @returns {Result<boolean>} - Resultado booleano de la operación
     */
    private sendEmail;
    /**
     * Envia un email de verificacion de cuenta al usuario
     * @param {string} email - Email del usuario
     * @param {string} verificationToken - Corresponde a un codigo de 6 digitos
     * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
     */
    sendVerificationEmail({ email, verificationToken }: User): Promise<Result<boolean>>;
    /**
     * Envia un email de restablecimiento de contraseña al usuario
     * @param {string} email - Email del usuario
     * @param {string} resetToken - Representa un string aleatorio de 20 caracteres
     * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
     */
    sendResetPasswordEmail(email: string, resetToken: string): Promise<Result<boolean>>;
    /**
     * Envia un email de confirmacion de restablecimiento de contraseña exitoso al usuario
     * @param {string} email - Email del usuario
     * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
     */
    sendResetSuccessEmail(email: string): Promise<Result<boolean>>;
}
declare const _default: EmailService;
export default _default;
