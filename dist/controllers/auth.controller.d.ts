import { ExtendsRequest } from "../interfaces/api.interface";
import { Request, Response } from "express";
/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export declare const login: (req: Request, res: Response) => Promise<void>;
/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export declare const register: (req: Request, res: Response) => Promise<void>;
/**
 * Maneja el proceso de cierre de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Response<any>} - Envía una respuesta de éxito.
 */
export declare const logout: (req: Request, res: Response) => Response<any>;
/**
 * Obtiene el perfil del usuario autenticado.
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el ID del usuario en user.id.
 * @returns {Promise<void>} - Envía los datos del perfil del usuario o un mensaje de error.
 */
export declare const profile: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * Permite extraer las credenciales del token de las cookies, en caso de que token sea invalido, no se permitirá el acceso
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido. Debe contener el token en token.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export declare const verifyAuth: (req: ExtendsRequest, res: Response) => Promise<void>;
/**
 * still not defined...
 * @param {Request} req - Objeto de solicitud Express. Debe contener el token en las cookies.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export declare const verifyEmail: ({ body }: Request, res: Response) => Promise<void>;
/**
 * Maneja el proceso de restablecimiento de contraseña.
 * @param {Request} req - Objeto de solicitud Express. Debe contener el email en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
export declare const forgotPassword: ({ body }: Request, res: Response) => Promise<void>;
/**
 * Nos permite actualizar la contraseña del usuario, validando un token param y la respectiva expiración
 * @param {Request} req - Objeto de solicitud Express. Debe contener el token en los params y la nueva contraseña en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si la contraseña se actualiza correctamente.
 */
export declare const resetPassword: ({ params, body }: Request, res: Response) => Promise<void>;
