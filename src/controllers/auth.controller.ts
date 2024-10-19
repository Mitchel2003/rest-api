/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { encrypt, verified } from "../services/bcrypt.service"
import { generateAccessToken } from "../services/jwt.service"
import mailtrap from "../services/mailtrap.service"

import { ExtendsRequest, Result, send } from "../interfaces/api.interface"
import { User as UserProps } from "../interfaces/model.interface"
import User from "../models/user.model"

import generateVerificationToken from "../utils/math"
import { Request, Response } from "express"
import { Document } from "mongoose"
import crypto from "crypto"

/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await validateCredentials(req);
    if ('error' in user) return send(res, 403, user.error)
    const token = await generateAccessToken({ id: user.value._id });
    setCookies(res, token);
    send(res, 200, user.value);
  } catch (e) { send(res, 500, `Error al intentar iniciar sesión: ${e}`) }
}

/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    await isAccountFound(req, res);
    const user = await createUserEncrypt(req);
    const emailSend = await mailtrap.sendVerificationEmail(user);
    if ('error' in emailSend) return send(res, 500, emailSend.error);

    //set cookies with token auth
    const token = await generateAccessToken({ id: user._id });
    setCookies(res, token);
    send(res, 200, user);
  } catch (e) { send(res, 500, `Error al intentar registrarse: ${e}`) }
}

/**
 * Maneja el proceso de cierre de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Response<any>} - Envía una respuesta de éxito.
 */
export const logout = (req: Request, res: Response): Response<any> => {
  if (!req.cookies.token) return res.sendStatus(200)
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
}

/**
 * Obtiene el perfil del usuario autenticado.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía los datos del perfil del usuario o un mensaje de error.
 */
export const profile = async (req: ExtendsRequest, res: Response): Promise<void> => {
  const document = await User.findById(req.user?.id);
  if (!document) return send(res, 401, 'Usuario no encontrado');
  send(res, 200, document);
}
/*--------------------------------------------------Verify--------------------------------------------------*/
/**
 * Permite extraer las credenciales del token de las cookies, en caso de que token sea invalido, no se permitirá el acceso
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el token en token.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const verifyAuth = async (req: ExtendsRequest, res: Response): Promise<void> => {
  const userFound = await User.findById(req.token?.id);
  if (!userFound) return send(res, 401, 'No autorizado');
  send(res, 200, userFound);
}

/**
 * still not defined...
 * @param {Request} req - Objeto de solicitud Express. Debe contener el token en las cookies.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const verifyEmail = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const { code } = body;
    const user = await User.findOne({ verificationToken: code, verificationExpiresAt: { $gte: new Date() } });
    if (!user) return send(res, 401, 'Código de verificación inválido o expirado');

    //verify email
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;
    await user.save();
    send(res, 200, 'Email verificado correctamente');
  } catch (e) { send(res, 500, `Error al verificar el email: ${e}`) }
}

/**
 * Maneja el proceso de restablecimiento de contraseña.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el email en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
export const forgotPassword = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const { email } = body;
    const user = await User.findOne({ email });
    if (!user) return send(res, 401, 'Email no encontrado')

    //generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); //1 hour
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    user.resetPasswordToken = resetToken;
    await user.save();

    //send email with reset token
    const emailSend = await mailtrap.sendResetPasswordEmail(user.email, resetToken);
    if ('error' in emailSend) return send(res, 500, emailSend.error);
    send(res, 200, 'Email enviado correctamente');
  } catch (e) { send(res, 500, `Error al enviar el email de restablecimiento de contraseña: ${e}`) }
}

/**
 * Nos permite actualizar la contraseña del usuario, validando un token param y la respectiva expiración
 * @param {Request} req - Objeto de solicitud Express. Debe contener el token en los params y la nueva contraseña en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si la contraseña se actualiza correctamente.
 */
export const resetPassword = async ({ params, body }: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ resetPasswordToken: params.token, resetPasswordExpiresAt: { $gte: new Date() } });//$gte: greater than or equal to
    if (!user) return send(res, 401, 'Token de restablecimiento de contraseña inválido o expirado')

    //update password
    const passHash = await encrypt(body.password, 10);
    user.password = passHash;
    user.resetPasswordToken = '';
    user.resetPasswordExpiresAt = new Date(0);
    await user.save();

    //send email with success reset
    const emailSend = await mailtrap.sendResetSuccessEmail(user.email);
    if ('error' in emailSend) return send(res, 500, emailSend.error);
    send(res, 200, 'Contraseña restablecida correctamente');
  } catch (e) { send(res, 500, `Error al restablecer la contraseña: ${e}`) }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Establece las cookies de autenticación en la respuesta.
 * @param {Response} res - Objeto de respuesta Express.
 * @param {string} token - Token de autenticación a establecer en las cookies.
 */
function setCookies(res: Response, token: string) {
  res.cookie('token', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  })
}

/**
 * Verifica las credenciales del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @returns {Promise<Result<Document>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
 */
async function validateCredentials(req: Request): Promise<Result<Document>> {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  const isMatch = await verified(password, userFound?.password);
  if (!isMatch || !userFound) return { error: 'Credenciales inválidas' };
  return { value: userFound };
}

/**
 * Verifica si ya existe una cuenta con el email proporcionado.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el email en el body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía un mensaje de error si la cuenta ya existe.
 */
async function isAccountFound({ body }: Request, res: Response): Promise<void> {
  const userFound = await User.findOne({ email: body.email });
  if (userFound) return send(res, 403, 'Email en uso')
}

/**
 * Crea un nuevo usuario con la contraseña encriptada y un token de verificación email definido.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<UserProps>} - Retorna el documento del usuario creado.
 */
async function createUserEncrypt(req: Request): Promise<UserProps> {
  const { username, email, password } = req.body;
  const passHash = await encrypt(password, 10);
  const verificationToken = generateVerificationToken();
  const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); //24 hours to verify
  const user = new User({
    username,
    email,
    password: passHash,
    verificationToken,
    verificationExpiresAt
  })
  return await user.save()
}
/*---------------------------------------------------------------------------------------------------------*/