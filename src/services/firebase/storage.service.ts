import { StorageService as IStorage } from "@/interfaces/db.interface"
import { handlerService as handler } from "@/errors/handler"
import { Result } from "@/interfaces/api.interface"
import { firebaseApp } from "@/db"
import ErrorAPI from "@/errors"

import {
  FirebaseStorage,
  getDownloadURL,
  deleteObject,
  uploadBytes,
  getStorage,
  listAll,
  ref
} from "firebase/storage"

/*--------------------------------------------------Storage--------------------------------------------------*/
class StorageService implements IStorage {
  private static instance: StorageService
  private readonly storage: FirebaseStorage
  private constructor() { this.storage = getStorage(firebaseApp) }

  public static getInstance(): StorageService {
    if (!StorageService.instance) { StorageService.instance = new StorageService() }
    return StorageService.instance
  }
  /**
   * Obtiene una referencia a un archivo en el almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo al que se accede.
   */
  private getReference(path: string) { return ref(this.storage, path) }
  /**
   * Obtener la URL de un archivo del almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo al que se accede.
   * @example path = 'users/profile/{username}/imagen.png'
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
   * Subir un archivo al almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo final.
   * @example path podria ser 'users/profile/{username}'
   * @param {File} file - El archivo a subir.
   * @returns {Promise<Result<string>>} La URL del archivo subido.
   */
  async uploadFile(path: string, file: File): Promise<Result<string>> {
    return handler(async () => {
      const storageRef = this.getReference(path)
      const metadata = buildStorageMetadata(file)
      const upload = await uploadBytes(storageRef, file, metadata)
      return await getDownloadURL(upload.ref)
    }, 'subir archivo')
  }
  /**
   * Actualiza un archivo en el almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo final @example path: "users/profile/{username}"
   * @param {File} file - El archivo nuevo a subir, con su nombre y extension @example file: "imagen.png"
   * @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#003
   * @returns {Promise<Result<string>>} La URL del archivo actualizado.
   */
  async updateFile(path: string, file: File): Promise<Result<string>> {
    return handler(async () => {
      await deleteObject(this.getReference(path))
      const res = await this.uploadFile(path, file)
      if (!res.success) throw new ErrorAPI(res.error)
      return res.data
    }, 'actualizar archivo')
  }
  /**
   * Elimina un archivo del almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo a eliminar.
   */
  async deleteFile(path: string): Promise<Result<void>> {
    return handler(async () => await deleteObject(this.getReference(path)), 'eliminar archivo')
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Construye los metadatos del archivo para Firebase Storage.
 * @param {File} file - El archivo a subir. @example file: "imagen.png"
 * @returns {object} Los metadatos del archivo con su configuración para Firebase Storage.
 */
const buildStorageMetadata = (file: File): object => {
  return {
    contentType: file.type,
    customMetadata: { originalName: file.name, uploadedAt: new Date().toISOString() }
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const storageService = StorageService.getInstance()