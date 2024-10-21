"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.verifyEmail = exports.verifyAuth = exports.profile = exports.logout = exports.register = exports.login = void 0;
/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
const bcrypt_service_1 = require("../services/bcrypt.service");
const jwt_service_1 = require("../services/jwt.service");
const mailtrap_service_1 = __importDefault(require("../services/mailtrap.service"));
const api_interface_1 = require("../interfaces/api.interface");
const user_model_1 = __importDefault(require("../models/user.model"));
const math_1 = __importDefault(require("../utils/math"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
const login = async (req, res) => {
    try {
        const user = await validateCredentials(req);
        if ('error' in user)
            return (0, api_interface_1.send)(res, 403, user.error);
        const token = await (0, jwt_service_1.generateAccessToken)({ id: user.value._id });
        setCookies(res, token);
        (0, api_interface_1.send)(res, 200, user.value);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error al intentar iniciar sesión: ${e}`);
    }
};
exports.login = login;
/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
const register = async (req, res) => {
    try {
        await isAccountFound(req, res);
        const user = await createUserEncrypt(req);
        const emailSend = await mailtrap_service_1.default.sendVerificationEmail(user);
        if ('error' in emailSend)
            return (0, api_interface_1.send)(res, 500, emailSend.error);
        //set cookies with token auth
        const token = await (0, jwt_service_1.generateAccessToken)({ id: user._id });
        setCookies(res, token);
        (0, api_interface_1.send)(res, 200, user);
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error al intentar registrarse: ${e}`);
    }
};
exports.register = register;
/**
 * Maneja el proceso de cierre de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Response<any>} - Envía una respuesta de éxito.
 */
const logout = (req, res) => {
    if (!req.cookies.token)
        return res.sendStatus(200);
    res.cookie('token', '', { expires: new Date(0) });
    return res.sendStatus(200);
};
exports.logout = logout;
/**
 * Obtiene el perfil del usuario autenticado.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía los datos del perfil del usuario o un mensaje de error.
 */
const profile = async (req, res) => {
    const document = await user_model_1.default.findById(req.user?.id);
    if (!document)
        return (0, api_interface_1.send)(res, 401, 'Usuario no encontrado');
    (0, api_interface_1.send)(res, 200, document);
};
exports.profile = profile;
/*--------------------------------------------------Verify--------------------------------------------------*/
/**
 * Permite extraer las credenciales del token de las cookies, en caso de que token sea invalido, no se permitirá el acceso
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el token en token.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
const verifyAuth = async (req, res) => {
    const userFound = await user_model_1.default.findById(req.token?.id);
    if (!userFound)
        return (0, api_interface_1.send)(res, 401, 'No autorizado');
    (0, api_interface_1.send)(res, 200, userFound);
};
exports.verifyAuth = verifyAuth;
/**
 * still not defined...
 * @param {Request} req - Objeto de solicitud Express. Debe contener el token en las cookies.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
const verifyEmail = async ({ body }, res) => {
    try {
        const { code } = body;
        const user = await user_model_1.default.findOne({ verificationToken: code, verificationExpiresAt: { $gte: new Date() } });
        if (!user)
            return (0, api_interface_1.send)(res, 401, 'Código de verificación inválido o expirado');
        //verify email
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiresAt = undefined;
        await user.save();
        (0, api_interface_1.send)(res, 200, 'Email verificado correctamente');
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error al verificar el email: ${e}`);
    }
};
exports.verifyEmail = verifyEmail;
/**
 * Maneja el proceso de restablecimiento de contraseña.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el email en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
const forgotPassword = async ({ body }, res) => {
    try {
        const { email } = body;
        const user = await user_model_1.default.findOne({ email });
        if (!user)
            return (0, api_interface_1.send)(res, 401, 'Email no encontrado');
        //generate reset token
        const resetToken = crypto_1.default.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); //1 hour
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        user.resetPasswordToken = resetToken;
        await user.save();
        //send email with reset token
        const emailSend = await mailtrap_service_1.default.sendResetPasswordEmail(user.email, resetToken);
        if ('error' in emailSend)
            return (0, api_interface_1.send)(res, 500, emailSend.error);
        (0, api_interface_1.send)(res, 200, 'Email enviado correctamente');
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error al enviar el email de restablecimiento de contraseña: ${e}`);
    }
};
exports.forgotPassword = forgotPassword;
/**
 * Nos permite actualizar la contraseña del usuario, validando un token param y la respectiva expiración
 * @param {Request} req - Objeto de solicitud Express. Debe contener el token en los params y la nueva contraseña en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si la contraseña se actualiza correctamente.
 */
const resetPassword = async ({ params, body }, res) => {
    try {
        const user = await user_model_1.default.findOne({ resetPasswordToken: params.token, resetPasswordExpiresAt: { $gte: new Date() } }); //$gte: greater than or equal to
        if (!user)
            return (0, api_interface_1.send)(res, 401, 'Token de restablecimiento de contraseña inválido o expirado');
        //update password
        const passHash = await (0, bcrypt_service_1.encrypt)(body.password, 10);
        user.password = passHash;
        user.resetPasswordToken = '';
        user.resetPasswordExpiresAt = new Date(0);
        await user.save();
        //send email with success reset
        const emailSend = await mailtrap_service_1.default.sendResetSuccessEmail(user.email);
        if ('error' in emailSend)
            return (0, api_interface_1.send)(res, 500, emailSend.error);
        (0, api_interface_1.send)(res, 200, 'Contraseña restablecida correctamente');
    }
    catch (e) {
        (0, api_interface_1.send)(res, 500, `Error al restablecer la contraseña: ${e}`);
    }
};
exports.resetPassword = resetPassword;
/*---------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Establece las cookies de autenticación en la respuesta.
 * @param {Response} res - Objeto de respuesta Express.
 * @param {string} token - Token de autenticación a establecer en las cookies.
 */
function setCookies(res, token) {
    res.cookie('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });
}
/**
 * Verifica las credenciales del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @returns {Promise<Result<Document>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
 */
async function validateCredentials(req) {
    const { email, password } = req.body;
    const userFound = await user_model_1.default.findOne({ email });
    const isMatch = await (0, bcrypt_service_1.verified)(password, userFound?.password);
    if (!isMatch || !userFound)
        return { error: 'Credenciales inválidas' };
    return { value: userFound };
}
/**
 * Verifica si ya existe una cuenta con el email proporcionado.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el email en el body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un mensaje de error si la cuenta ya existe.
 */
async function isAccountFound({ body }, res) {
    const userFound = await user_model_1.default.findOne({ email: body.email });
    if (userFound)
        return (0, api_interface_1.send)(res, 403, 'Email en uso');
}
/**
 * Crea un nuevo usuario con la contraseña encriptada y un token de verificación email definido.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<UserProps>} - Retorna el documento del usuario creado.
 */
async function createUserEncrypt(req) {
    const { username, email, password } = req.body;
    const passHash = await (0, bcrypt_service_1.encrypt)(password, 10);
    const verificationToken = (0, math_1.default)();
    const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); //24 hours to verify
    const user = new user_model_1.default({
        username,
        email,
        password: passHash,
        verificationToken,
        verificationExpiresAt
    });
    return await user.save();
}
/*---------------------------------------------------------------------------------------------------------*/ 
//# sourceMappingURL=auth.controller.js.map