import { storageService } from "@/services/firebase/storage.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import { Request, Response } from "express";

/**
 * Obtiene los metadatos de los archivos en una ruta específica
 * @param {Request} req - body debe contener { path: string, reference: string }
 */
export const getFiles = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await storageService.getFilesWithMetadata(`${body.path}/${body.reference}`);
    if (!result.success) throw result.error;
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, 'obtener archivos') }
}

/**
 * Sube múltiples archivos
 * @param {Request} req - body debe contener { path: string, reference: string, files: File[] }
 */
export const uploadFiles = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await storageService.uploadFiles(`${body.path}/${body.reference}`, body.files);
    if (!result.success) throw result.error;
    send(res, 201, result.data);
  } catch (e) { handlerResponse(res, e, 'subir archivos') }
}

/**
 * Elimina un archivo específico
 * @param {Request} req - body debe contener { path: string, reference: string, filename: string }
 */
export const deleteFile = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await storageService.deleteFile(`${body.path}/${body.reference}/${body.filename}`);
    if (!result.success) throw result.error;
    send(res, 200, undefined);
  } catch (e) { handlerResponse(res, e, 'eliminar archivo') }
}