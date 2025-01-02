/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { DefaultOverwrite, User as UserMDB } from "@/types/user/user.type";
import { authService as authFB } from "@/services/firebase/auth.service";
import { userService } from "@/services/mongodb/user/user.service";
import ErrorAPI, { Unauthorized, Conflict } from "@/errors";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";

import { User as UserFB } from "firebase/auth"
import { Request, Response } from "express"

/*--------------------------------------------------auth--------------------------------------------------*/
/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @argument emailVerified - Hace parte del profile del usuario autenticado (lo usamos para la verificacion de email)
 * @returns {Promise<void>} - Envía el usuario autenticado (UserMDB) o un mensaje de error.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const auth = await authFB.login(email, password);
    if (!auth.success) throw new ErrorAPI(auth.error);
    if (!auth.data.emailVerified) throw new Unauthorized({ message: 'Email no verificado' });
    const user = await getUserCredentials(auth.data);
    send(res, 200, user);
  } catch (e: unknown) { handlerResponse(res, e, "iniciar sesión") }
}
/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authFB.registerAccount(req.body);
    if (!result.success) throw new ErrorAPI(result.error);

    const sendEmail = await authFB.sendEmailVerification();
    if (!sendEmail.success) throw new ErrorAPI(sendEmail.error);
    if (!(await authFB.logout()).success) throw new Conflict({ message: 'Error logout on register' });
    send(res, 200, undefined);
  } catch (e: unknown) { handlerResponse(res, e, "registrarse") }
}
/**
 * Maneja el proceso de cierre de sesión del usuario.
 * tenemos metodos de verificacion como token 'jwt' o auth 'firebase'
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Response<any>} - Envía una respuesta de éxito.
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authFB.logout();
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, req.headers.authorization);
  } catch (e: unknown) { handlerResponse(res, e, "cerrar sesión") }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------verify--------------------------------------------------*/
/**
 * Ayuda a recuperar las userCredencials (mongoDB) de un usuario autenticado (firebase)
 * Nos permite obtener el estado de la autenticación del usuario arrojando el "uid"
 * con el cual podemos buscar las userCredencials (mongoDB)
 * @param {Request} req - Objeto de solicitud Express.
 * @argument req.headers.authorization - Procuramos usar el "req" para evitar errores de (never read)
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export const getOnAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = authFB.onAuth();
    if (!result) return send(res, 200, result);
    const user = await userService.find({ uid: result.uid });
    if (!user.success) throw new ErrorAPI(user.error);
    req.headers.authorization = `Bearer ${user.data[0].uid}`;
    send(res, 200, user.data[0]);
  } catch (e) { handlerResponse(res, e, "obtener estado de usuario") }
}
/**
 * Maneja el proceso de restablecimiento de contraseña.
 * Establece un token de restablecimiento de contraseña para el usuario
 * Envia un email con el token de restablecimiento de contraseña el cual expirará en 1 hora.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el email en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
export const forgotPassword = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await authFB.sendEmailResetPassword(body.email);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, 'Email enviado correctamente');
  } catch (e) { handlerResponse(res, e, "enviar email de restablecimiento de contraseña") }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Nos ayuda a formalizar los datos del usuario (mongoDB),
 * recuerda que el usuario ya existe en firebase (auth).
 * Esta función nos permite buscar un usuario existente
 * o en su defecto crear uno nuevo basado en los datos (auth).
 * @param auth - Datos de autenticación de Firebase
 * @returns Promise con los datos del usuario
 */
const getUserCredentials = async (auth: UserFB): Promise<UserMDB> => {
  const found = await userService.find({ uid: auth.uid })
  if (!found.success) throw new ErrorAPI(found.error)
  if (found.data.length > 0) return found.data[0]

  const result = await userService.create(credentials(auth))
  if (!result.success) throw new ErrorAPI(result.error)
  return result.data
}
/**
 * Nos permite construir las credenciales del usuario (mongoDB).
 * @param {UserFB} auth - El usuario de firebase, representa la autenticación.
 * @argument photoURL - Es un string que contiene el rol y las sedes, su estructura es la siguiente:
 * @example "engineer;headquarters1,headquarters2,headquarters3"
 * @returns {any} - Retornar las credenciales del usuario en el formato standar (model mongoDB)
 */
const credentials = (auth: UserFB): UserMDB => {
  const [role, headquarters] = auth.photoURL?.split(';') || []
  const array = headquarters ? headquarters.split(',') : []

  return {
    role,
    uid: auth.uid,
    email: auth.email,
    username: auth.displayName,
    permissions: array.length > 0 ? { headquarters: array, overwrite: DefaultOverwrite } : undefined
  } as UserMDB
}
/*---------------------------------------------------------------------------------------------------------*/