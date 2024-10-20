"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailtrap_template_1 = require("../templates/mailtrap.template");
const mailtrap_1 = require("mailtrap");
const config_1 = __importDefault(require("../utils/config"));
class EmailService {
    client;
    constructor() {
        const token = config_1.default.mailtrapToken;
        if (!token)
            throw new Error('MAILTRAP_TOKEN is not defined');
        this.client = new mailtrap_1.MailtrapClient({ token });
    }
    /**
     * Configura una solicitud email para enviarla al usuario
     * @params {EmailProps} options - Objeto con los datos del email a enviar
     * @returns {Result<boolean>} - Resultado booleano de la operación
     */
    async sendEmail(options) {
        const sender = { email: 'mailtrap@demomailtrap.com', name: 'Gestion Salud' };
        try {
            const response = await this.client.send({ ...options, from: sender });
            if (!response.success)
                return { error: response.errors.join(', ') };
            return { value: true };
        }
        catch (e) {
            return { error: `Error interno al enviar el email: ${e}` };
        }
    }
    /**
     * Envia un email de verificacion de cuenta al usuario
     * @param {string} email - Email del usuario
     * @param {string} verificationToken - Corresponde a un codigo de 6 digitos
     * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
     */
    async sendVerificationEmail({ email, verificationToken }) {
        const emailOptions = {
            to: [{ email }],
            subject: "Verifica tu cuenta",
            category: 'Verificación de email',
            html: mailtrap_template_1.VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
        };
        return this.sendEmail(emailOptions);
    }
    /**
     * Envia un email de restablecimiento de contraseña al usuario
     * @param {string} email - Email del usuario
     * @param {string} resetToken - Representa un string aleatorio de 20 caracteres
     * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
     */
    async sendResetPasswordEmail(email, resetToken) {
        const url = `${config_1.default.frontendUrl}/reset-password?token=${resetToken}`;
        const emailOptions = {
            to: [{ email }],
            subject: "Restablece tu contraseña",
            category: 'Restablecimiento de contraseña',
            html: mailtrap_template_1.PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', url)
        };
        return this.sendEmail(emailOptions);
    }
    /**
     * Envia un email de confirmacion de restablecimiento de contraseña exitoso al usuario
     * @param {string} email - Email del usuario
     * @returns {Promise<Result<boolean>>} - Resultado booleano de la operación
     */
    async sendResetSuccessEmail(email) {
        const emailOptions = {
            to: [{ email }],
            subject: "Restablecimiento de contraseña exitoso",
            category: 'Restablecimiento de contraseña',
            html: mailtrap_template_1.PASSWORD_RESET_SUCCESS_TEMPLATE
        };
        return this.sendEmail(emailOptions);
    }
}
exports.EmailService = EmailService;
exports.default = new EmailService();
//# sourceMappingURL=mailtrap.service.js.map