import { userService } from "@/services/mongodb/user/user.service";
import adminService from "@/services/firebase/admin.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import ErrorAPI, { NotFound } from "@/errors";

import { Request, Response } from "express";

/**
 * Nos permite enviar una notificación al usuario mediante Firebase Cloud Messaging (FCM).
 * @param {Request} req - Objeto de solicitud Express. Debe contener el id del usuario, el título y el cuerpo de la notificación en el body.
 * @returns {Promise<void>} - Envía un mensaje de éxito si la notificación se envía correctamente.
 */
export const sendNotification = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.findById(body.id);
    if (!user.success) throw new NotFound({ message: 'usuario' });
    if (!user.data?.fcmToken) throw new NotFound({ message: 'token de notificación (FCM)' });
    const result = await adminService.sendNotification(body.title, body.body, user.data.fcmToken);
    if (!result.success) throw new ErrorAPI(result.error);
    send(res, 200, { message: "Notificación enviada con éxito" });
  } catch (e: unknown) { handlerResponse(res, e, "enviar notificación") }
}