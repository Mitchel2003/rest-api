import { storageService } from "@/services/firebase/storage.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import { Request, Response } from "express";

/**
 * Obtiene los metadatos de los archivos en una ruta específica
 * @param {Request} req - body debe contener { path: string }
 * @argument path: corresponde a la ruta del archivo
 * @example path = "files/uid/preview" as folder
 */
export const getFiles = async ({ query }: Request, res: Response): Promise<void> => {
  try {
    const result = await storageService.getFilesWithMetadata(`${query.path}`);
    if (!result.success) throw result.error;
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, 'obtener archivos') }
}

/**
 * Sube múltiples archivos
 * @param {Request} req - body debe contener:
 * @example body: { path: string, files: Express.Multer.File[], unique?: boolean }
 */
export const uploadFiles = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    if (!body.files || !Array.isArray(body.files)) throw new Error('No se proporcionaron archivos válidos')
    const result = body.unique
      ? await storageService.uploadFile(processFiles(body.files)[0], body.path)
      : await storageService.uploadFiles(processFiles(body.files), body.path)

    if (!result.success) throw result.error;
    send(res, 201, result.data);
  } catch (e) { handlerResponse(res, e, 'subir archivos') }
}

/**
 * Elimina un archivo específico
 * @param {Request} req - query debe contener:
 * @example query: { path: string }
 */
export const deleteFile = async ({ query }: Request, res: Response): Promise<void> => {
  try {
    if (!query.path) throw new Error('Path is required');
    const result = await storageService.deleteFile(query.path as string);
    if (!result.success) throw result.error;
    send(res, 200, undefined);
  } catch (e) { handlerResponse(res, e, 'eliminar archivo') }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Allows us to process multiple files, converting them to base64
 * @param {Array<any>} files - Array of files to process
 * @returns {Express.Multer.File[]} - Array of Express.Multer.File
 */
const processFiles = (files: any): Express.Multer.File[] => (
  files.map((file: any) => ({
    size: file.size,
    mimetype: file.mimetype,
    originalname: file.originalname,
    buffer: Buffer.from(file.buffer, 'base64')
  }))
)