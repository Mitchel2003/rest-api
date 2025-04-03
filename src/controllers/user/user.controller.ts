/** Este módulo proporciona funciones para crear, leer, actualizar y eliminar usuarios */
import { userService } from "@/services/mongodb/user/user.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { accessFactory } from "@/services/auth/access.service";
import firebaseAdmin from "@/services/firebase/admin.service";
import ErrorAPI, { Forbidden, NotFound } from "@/errors";
import { handlerResponse } from "@/errors/handler";
import { User } from "@/types/user/user.type";

import { Response, Request } from "express";

/**
 * Obtiene un usuario específico por su ID.
 * Utiliza un patrón Strategy para aplicar la lógica de acceso según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación.
 * @param {Response} res - Objeto de respuesta Express, envía el usuario encontrado o un mensaje de error.
 * @returns {Promise<void>} - Envía el usuario encontrado o un mensaje de error.
 */
export const getUser = async ({ params, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<User>(userService, 'user').create(user)
    const result = await accessService.getOne(user, params.id)
    if (!result.success) throw new ErrorAPI(result.error)
    send(res, 200, result.data)
  } catch (e) { handlerResponse(res, e, "obtener el usuario") }
}

/**
 * Obtiene todos los usuarios.
 * Utiliza un patrón Strategy para aplicar la lógica de filtrado según el rol del usuario.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía los usuarios filtrados o un mensaje de error.
 * @returns {Promise<void>} - Envía un objeto con los usuarios filtrados
 */
export const getUsers = async ({ query, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<User>(userService, 'user').create(user)
    const users = await accessService.getAll(user, query)
    if (!users.success) throw new ErrorAPI(users.error)
    send(res, 200, users.data)
  } catch (e) { handlerResponse(res, e, "obtener los usuarios") }
}

/**
 * Maneja el proceso de registro de un nuevo usuario.
 * crea el usuario en firebase y envia un email de verificacion (authentication)
 * tambien crea el usuario en la base de datos (mongodb) para modelo relacional
 * @param {Request} req - Objeto de solicitud Express.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.create(credentials(req.body));
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e: unknown) { handlerResponse(res, e, "registrar usuario") }
}

/**
 * Actualiza un usuario existente.
 * Verifica los permisos del usuario antes de realizar la actualización.
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía el usuario actualizado o un mensaje de error
 * @returns {Promise<void>} - Envía el usuario actualizado o un mensaje de error
 */
export const updateUser = async ({ params, body, user = {} as User }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const accessService = accessFactory<User>(userService, 'user').create(user);
    const canUpdate = await accessService.canUpdate(user, params.id);
    if (!canUpdate) throw new Forbidden({ message: "No tienes permisos para actualizar este usuario" });
    const result = await userService.update(params.id, body);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, result.data);
  } catch (e: unknown) { handlerResponse(res, e, "actualizar el usuario") }
}

/**
 * Maneja el proceso de eliminación de un usuario.
 * El param.id debe contener el id de mongoDB y el uid de firebase.
 * Elimina el usuario de Firebase (auth) y las credenciales user de mongoDB (Database).
 * @param {ExtendsRequest} req - Objeto de solicitud Express con información de autenticación
 * @param {Response} res - Objeto de respuesta Express, envía un mensaje de éxito o un mensaje de error.
 * @returns {Promise<void>} - Envía un mensaje de éxito o un mensaje de error.
 */
export const deleteUser = async ({ params }: ExtendsRequest, res: Response): Promise<void> => {
  try {
    const [_id, uid] = params.id.split("-");
    if (!_id || !uid) throw new NotFound({ message: "Invalid user ID" });
    const auth = await firebaseAdmin.deleteAccount(uid);
    if (!auth.success) throw new ErrorAPI(auth.error);
    const result = await userService.delete(_id);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, undefined);
  } catch (e: unknown) { handlerResponse(res, e, "eliminar el usuario") }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Nos permite construir las credenciales del usuario (mongoDB).
 * @param {any} auth - El usuario de firebase, representa la autenticación.
 * @argument photoURL - Es un string que contiene el rol y las sedes, su estructura es la siguiente:
 * @example auth.photoURL = "role;permissions;phone;nit;invima;profesionalLicense"
 * @returns {User} - Retorna las credenciales del usuario en el formato standar (model mongoDB)
 */
const credentials = (auth: any): User => {
  const [role, permissionsData, phone, nit, invima, profesionalLicense] = auth.photoURL?.split(';') || [];
  const permissions: string[] = permissionsData ? JSON.parse(permissionsData) : []
  return {
    email: auth.email, username: auth.displayName,
    nit, invima, profesionalLicense,
    role, phone, permissions,
    inactive: false,
    uid: auth.uid,
  } as User;
}