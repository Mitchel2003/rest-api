/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { Request, Response } from "express";
import { Document } from "mongoose";

import { verifyAccessToken, generateAccessToken } from "../libs/jwt.handle";
import { Result, send } from "../interfaces/response.interface";
import ExtendsRequest from "../interfaces/request.interface";
import generateVerificationToken from "../libs/math.handle";
import { encrypt, verified } from "../libs/bcrypt.handle";
import User from "../models/user.model";

/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await verifyCredentials(req);
    if ('error' in user) return send(res, 403, user.error)
    const token = await generateAccessToken({ id: user.value._id });
    res.cookie('token', token);
    send(res, 200, user.value);
  } catch (e) { send(res, 500, `Error al intentar iniciar sesión: ${e}`) }
};

/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    await isAccountFound(req, res);
    const user = await createUserEncrypt(req);
    const token = await generateAccessToken({ id: user._id });
    res.cookie('token', token);
    send(res, 200, user);
  } catch (e) { send(res, 500, `Error al intentar registrarse: ${e}`) }
};

/**
 * Maneja el proceso de cierre de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Response<any>} - Envía una respuesta de éxito.
 */
export const logout = (req: Request, res: Response): Response<any> => {
  if (!req.cookies.token) return res.sendStatus(200)
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
};

/**
 * Obtiene el perfil del usuario autenticado.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía los datos del perfil del usuario o un mensaje de error.
 */
export const profile = async (req: ExtendsRequest, res: Response): Promise<void> => {
  const document = await User.findById(req.user?.id);
  if (!document) return send(res, 401, 'Usuario no encontrado');
  send(res, 200, document);
}

/**
 * Verifica las credenciales del usuario a partir del token en las cookies.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el token en las cookies.
 * @param {Response} res - Objeto de respuesta Express.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const tokenCredentials = async ({ cookies }: Request, res: Response): Promise<void> => {
  const token = await verifyAccessToken(cookies.token);
  const userFound = await User.findById(token.id);
  if ('error' in token) return send(res, 401, token.error)
  if (!userFound) return send(res, 401, 'No autorizado')
  send(res, 200, userFound);
};
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Verifica las credenciales del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @returns {Promise<Result<Document>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
 */
async function verifyCredentials(req: Request): Promise<Result<Document>> {
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
 * @returns {Promise<Document>} - Retorna el documento del usuario creado.
 */
async function createUserEncrypt(req: Request): Promise<Document> {
  const { username, email, password } = req.body;
  const passHash = await encrypt(password, 10);
  const verificationToken = generateVerificationToken();
  const verificationExpiresAt = Date.now() + 24 * 60 * 60 * 1000 //24 hours 
  const user = new User({
    username,
    email,
    password: passHash,
    verificationToken,
    verificationExpiresAt
  });
  return await user.save();
}
/*---------------------------------------------------------------------------------------------------------*/