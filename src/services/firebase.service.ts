import { Result } from "@/interfaces/api.interface";
import { initializeApp } from "firebase/app";
import config from "@/utils/config";
import {
  ref,
  listAll,
  getStorage,
  uploadBytes,
  deleteObject,
  getDownloadURL,
  FirebaseStorage
} from "firebase/storage";

const app = initializeApp(config.firebaseConfig);

class StorageService {
  private static instance: StorageService | undefined;
  private storage: FirebaseStorage;
  private files: string[];

  constructor() {
    this.files = []
    this.storage = getStorage(app)
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) StorageService.instance = new StorageService()
    return StorageService.instance
  }

  /**
   * Subir un archivo a Firebase Storage
   * @param {string} path - Ruta donde se almacenará el archivo
   * @param {File} file - Archivo a subir, corresponde a un archivo de imagen.
   * @example
   * path = "users/123456/profile.png"
   * file = "png, jpg or jpeg"
   * @returns {Promise<string>} URL del archivo subido
   */
  async uploadFile(path: string, file: File): Promise<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = await uploadBytes(storageRef, file);
    return getDownloadURL(uploadTask.ref);
  }

  /**
   * Obtener la URL de un archivo almacenado en Firebase Storage
   * @param {string} path - Ruta del archivo
   * @returns {Promise<string>} URL del archivo
   */
  async getFile(path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
  }

  /**
   * Obtener todas las URLs de los archivos almacenados en una ruta específica
   * @param {string} path - Ruta donde se encuentran los archivos
   * @returns {Promise<string[]>} Array de URLs de los archivos
   */
  async getFiles(path: string): Promise<string[]> {
    if (this.files.length > 0) this.files = [];
    const storageRef = ref(this.storage, path);
    const files = await listAll(storageRef);
    this.files = await Promise.all(
      files.items.map(async (item) => await getDownloadURL(item))
    )
    return this.files
  }

  async updateFile(path: string, file: File): Promise<Result<string>> {//working here...
    try {
      const deleted = await deleteFile(path);
      if (!deleted) return { error: "No se pudo eliminar el archivo" }
      return await this.uploadFile(path, file);
    } catch (error) {
      return ""
    }
  }

  /**
   * Eliminar un archivo almacenado en Firebase Storage
   * @param {string} path - Ruta del archivo
   * @example path = "users/123456/profile.png"
   */
  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(this.storage, path);
    await deleteObject(storageRef);
  }
}

export const storageService = StorageService.getInstance();