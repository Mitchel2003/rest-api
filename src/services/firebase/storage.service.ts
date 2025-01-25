import { StorageService as IStorage } from "@/interfaces/db.interface"
import { handlerService as handler } from "@/errors/handler"
import { Result, Success } from "@/interfaces/api.interface"
import { firebaseApp } from "@/db"
import ErrorAPI from "@/errors"

import {
  FirebaseStorage,
  getDownloadURL,
  updateMetadata,
  deleteObject,
  uploadBytes,
  getStorage,
  listAll,
  ref,
} from "firebase/storage"
import { Metadata } from "@/interfaces/props.interface"

/**
 * ¿who are estructured the storage?
 * 
 * gestions (storage)
 *     ===> auth (folder)
 *         ===>> uid (folder auth)
 *             ===>>> profile_(number generated) (file)
 * 
 *     ===> files (folder)
 *         ===>> uid (device uid folder)
*              ===>>>> curriculum (folder)
*                  ===>>> doc_1 ... (file)
*              ===>>>> maintenance (folder)
*                  ===>>> doc_1 ... (file)
*              ===>>>> preview (folder)
*                  ===>>> img_1 ... (file)
 * 
 * @argument uid(auth) represent the id of the business,
 * so, just like that, each folder that represent a business could have many products
 */
class StorageService implements IStorage {
  private static instance: StorageService
  private readonly storage: FirebaseStorage
  private constructor() { this.storage = getStorage(firebaseApp) }

  public static getInstance(): StorageService {
    if (!StorageService.instance) { StorageService.instance = new StorageService() }
    return StorageService.instance
  }

  /*---------------> get <---------------*/
  /**
   * Obtener la URL de un archivo del almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo al que se accede.
   * @example path = '.../{device.uid}/documentation/{name}.pdf'
   * @returns {Promise<Result<string>>} La URL del archivo.
   */
  async getFile(path: string): Promise<Result<string>> {
    return handler(async () => await getDownloadURL(this.getReference(path)), 'obtener archivo')
  }

  /**
   * Obtener las URLs de todos los archivos de un directorio del almacenamiento de Firebase.
   * @param {string} path - La ruta del directorio al que se accede.
   * @example path = 'users/profile/{username}'
   * @returns {Promise<Result<string[]>>} Un array con las URLs de los archivos.
   */
  async getFiles(path: string): Promise<Result<string[]>> {
    return handler(async () => {
      const storageRef = this.getReference(path)
      const files = await listAll(storageRef)
      return await Promise.all(files.items.map(item => getDownloadURL(item)))
    }, 'obtener archivos')
  }

  /**
   * Obtiene los metadatos de todos los archivos de un directorio del almacenamiento de Firebase.
   * @param {string} path - La ruta del directorio al que se accede.
   * @returns {Promise<Result<Metadata[]>>} Un array con los metadatos de los archivos.
   */
  async getFilesWithMetadata(path: string): Promise<Result<Metadata[]>> {
    return handler(async () => {
      const storageRef = this.getReference(path)
      const files = await listAll(storageRef)
      return await Promise.all(
        files.items.map(async item => ({ name: item.name, url: await getDownloadURL(item) }))
      )
    }, 'obtener archivos con metadata')
  }
  /*----------------------------------------------------*/

  /*---------------> upload <---------------*/
  /**
   * Subir un archivo al almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo final.
   * @example path podria ser 'users/profile/{username}'
   * @param {Express.Multer.File} file - El archivo a subir.
   * @returns {Promise<Result<string>>} La URL del archivo subido.
   */
  async uploadFile(path: string, file: Express.Multer.File): Promise<Result<string>> {
    return handler(async () => {
      // Asegurarse de que el path incluya la extensión del archivo
      const ext = file.originalname?.split('.').pop()
      const lastPath = ext ? path + '.' + ext : path

      const metadata = buildStorageMetadata(file)

      console.log('Metadata:', metadata)
      
      const buffer = file.buffer instanceof Buffer ? file.buffer : Buffer.from(file.buffer || '', 'base64')
      const upload = await uploadBytes(this.getReference(lastPath), buffer, metadata)
      return await getDownloadURL(upload.ref)
    }, 'subir archivo')
  }

  /**
   * Sube múltiples archivos al almacenamiento de Firebase.
   * @param {string} path - directorio (gestions/files/{uid}/preview) + nombre del archivo
   * @param {Express.Multer.File[]} files - Array de archivos a subir
   * @argument results - Pretende subir cada uno de los files a Firebase Storage
   * se espera un array con las URLs de los archivos subidos, pero como el uploadFile
   * es un Result(success o failure), se debe manejar el error de cada upload file
   * @returns {Promise<Result<string[]>>} Array con las URLs de los archivos subidos
   */
  async uploadFiles(path: string, files: Express.Multer.File[]): Promise<Result<string[]>> {
    return handler(async () => {
      const random = Math.floor(Math.random() * 10000)//genera un numero random de 4 digitos
      const results = await Promise.all(files.map((file) => this.uploadFile(`${path}_${random}`, file)))
      const failed = results.find(result => !result.success)
      if (failed) throw new ErrorAPI(failed.error)

      return results.map(result => (result as Success<string>).data)
    }, 'subir múltiples archivos')
  }
  /*----------------------------------------------------*/

  /*---------------> update <---------------*/
  /**
   * Actualiza un archivo en el almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo final @example path: "{uid}/products/{product.name}"
   * @param {File} file - El archivo nuevo a subir, con su nombre y extension @example file: "image.png"
   * @returns {Promise<Result<string>>} La URL del archivo actualizado.
   */
  async updateFile(path: string, file: Express.Multer.File): Promise<Result<string>> {
    return handler(async () => {
      const storageRef = this.getReference(path)
      const metadata = buildStorageMetadata(file)
      await updateMetadata(storageRef, metadata)
      return await getDownloadURL(storageRef)
    }, 'actualizar archivo')
  }

  /**
   * Elimina un archivo del almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo a eliminar.
   */
  async deleteFile(path: string): Promise<Result<void>> {
    return handler(async () => await deleteObject(this.getReference(path)), 'eliminar archivo')
  }
  /*----------------------------------------------------*/

  /*---------------> getReferences <---------------*/
  /**
   * Obtiene una referencia a un archivo en el almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo al que se accede.
   */
  private getReference(path: string) { return ref(this.storage, `gestions/files/${path}`) }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Construye los metadatos del archivo para Firebase Storage.
 * @param {Express.Multer.File} file - El archivo a subir
 * @returns {object} Los metadatos del archivo con su configuración para Firebase Storage
 */
const buildStorageMetadata = (file: Express.Multer.File): object => {
  // Asegurar que tenemos un tipo MIME válido
  const mimeTypes: { [key: string]: string } = { 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png', 'gif': 'image/gif' }
  const ext = file.originalname?.split('.').pop()?.toLowerCase()
  const contentType = file.mimetype || mimeTypes[ext as keyof typeof mimeTypes] || 'application/octet-stream'

  return {
    contentType,
    customMetadata: {
      originalName: file.originalname || 'unnamed',
      uploadedAt: new Date().toISOString(),
      size: file.size?.toString() || '0',
      extension: ext || ''
    }
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const storageService = StorageService.getInstance()