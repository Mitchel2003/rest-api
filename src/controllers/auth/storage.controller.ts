import { storageService } from "@/services/firebase/storage.service";
import { handlerResponse } from "@/errors/handler";
import { send } from "@/interfaces/api.interface";
import { Request, Response } from "express";

/**
 * Obtiene los metadatos de los archivos en una ruta específica
 * @param {Request} req - body debe contener { id: string, ref: string }
 * @argument id: corresponde al id del curriculum (equipo)
 * @argument ref: corresponde al folder que contiene el archivo (curriculum, maintenance, preview)
 */
export const getFiles = async ({ query }: Request, res: Response): Promise<void> => {
  try {
    const result = await storageService.getFilesWithMetadata(`${query.id}/${query.ref}`);
    if (!result.success) throw result.error;
    send(res, 200, result.data);
  } catch (e) { handlerResponse(res, e, 'obtener archivos') }
}

/**
 * Sube múltiples archivos
 * @param {Request} req - body debe contener { id: string, ref: string, files: Express.Multer.File[] }
 * @argument id: corresponde al id del curriculum (equipo)
 * @argument ref: corresponde al folder que contiene el archivo (curriculum, maintenance, preview)
 * @argument files: corresponde a los archivos a subir, representa un array de archivos
 */
export const uploadFiles = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    if (!body.files || !Array.isArray(body.files)) throw new Error('No se proporcionaron archivos válidos')

    const processFiles: Express.Multer.File[] = body.files.map((file: any) => {
      if (!file.buffer || !file.originalname || !file.mimetype) throw new Error('Formato de archivo inválido: falta información requerida')
      if (!file.mimetype.startsWith('image/')) throw new Error('El archivo debe ser una imagen')
      if (file.size > 5 * 1024 * 1024) throw new Error('La imagen no debe superar los 5MB')

      return {
        size: file.size,
        mimetype: file.mimetype,
        originalname: file.originalname,
        buffer: Buffer.from(file.buffer, 'base64'),
      }
    })

    const result = body.unique
      ? await storageService.uploadFile(`${body.id}/${body.ref}/${body.filename}`, processFiles[0])
      : await storageService.uploadFiles(`${body.id}/${body.ref}/${body.filename}`, processFiles)

    if (!result.success) throw result.error;
    send(res, 201, result.data);
  } catch (e) { handlerResponse(res, e, 'subir archivos') }
}

/**
 * Elimina un archivo específico
 * @param {Request} req - body debe contener { id: string, ref: string, filename: string }
 * @argument id: corresponde al id del curriculum (equipo)
 * @argument ref: corresponde al folder que contiene el archivo (curriculum, maintenance, preview)
 * @argument filename: corresponde al nombre del archivo en contexto, este puede ser formato de imagen, pdf, etc.
 */
export const deleteFile = async ({ body }: Request, res: Response): Promise<void> => {
  try {
    const result = await storageService.deleteFile(`${body.id}/${body.ref}/${body.filename}`);
    if (!result.success) throw result.error;
    send(res, 200, undefined);
  } catch (e) { handlerResponse(res, e, 'eliminar archivo') }
}