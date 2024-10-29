import { getStorage, ref, deleteObject, getDownloadURL, FirebaseStorage, StorageReference } from "firebase/storage";
import { sendEmailVerification } from "firebase/auth";

import { Result } from "@/interfaces/api.interface";
import { User } from "@/types/user/user.type";
import { app } from "@/utils/firebase";
import {
  StorageService as IStorage,
  EmailService as IEmail,
  StorageMetadata,
  getUserDefaultFB
} from "@/interfaces/db.interface";

class StorageService implements IStorage {
  private static instance: StorageService;
  private readonly storage: FirebaseStorage;

  private constructor() { this.storage = getStorage(app) }

  public static getInstance(): StorageService {
    if (!StorageService.instance) { StorageService.instance = new StorageService() }
    return StorageService.instance;
  }

  private getReference(path: string): StorageReference { return ref(this.storage, path) }

  private async handler<T>(operation: () => Promise<T>, error: string): Promise<Result<T>> {
    try {
      const result = await operation();
      return { value: result }
    } catch (e) { return { error: `Error interno del servidor al ${error}: ${e instanceof Error ? e.message : String(e)}` } }
  }

  /**
   * Construye los metadatos del archivo para Firebase.
   * @param file - El archivo a subir. @example file: "imagen.png"
   * @returns Los metadatos del archivo; esto se traduce en la configuración del archivo en Firebase.
   */
  private buildMetadata(file: File): StorageMetadata {
    return {
      contentType: file.type,
      customMetadata: { originalName: file.name, uploadedAt: new Date().toISOString() }
    }
  }

  /**
   * Subir un archivo al almacenamiento de Firebase.
   * @param path - La ruta del archivo final.
   * @example path podria ser 'users/profile/{username}'
   * @param file - El archivo a subir.
   * @returns La URL del archivo subido.
   */
  async uploadFile(path: string, file: File): Promise<Result<string>> {
    return this.handler(async () => {
      const { uploadBytes } = await import('firebase/storage');
      const storageRef = this.getReference(path);
      const metadata = this.buildMetadata(file);
      const upload = await uploadBytes(storageRef, file, metadata);
      return await getDownloadURL(upload.ref);
    }, 'Subir archivo')
  }

  /**
   * Obtener la URL de un archivo del almacenamiento de Firebase.
   * @param path - La ruta del archivo al que se accede.
   * @example path = 'users/profile/{username}/imagen.png'
   * @returns La URL del archivo.
   */
  async getFile(path: string): Promise<Result<string>> {
    return this.handler(async () => await getDownloadURL(this.getReference(path)), 'Obtener archivo')
  }

  /**
   * Obtener las URLs de todos los archivos de un directorio del almacenamiento de Firebase.
   * @param path - La ruta del directorio al que se accede.
   * @example path = 'users/profile/{username}'
   * @returns Un array con las URLs de los archivos.
   */
  async getFiles(path: string): Promise<Result<string[]>> {
    return this.handler(async () => {
      const { listAll } = await import('firebase/storage');
      const storageRef = this.getReference(path);
      const files = await listAll(storageRef);
      return await Promise.all(files.items.map(item => getDownloadURL(item)))
    }, 'Obtener archivos')
  }

  /**
   * Actualiza un archivo en el almacenamiento de Firebase.
   * @param path - La ruta del archivo final @example path: "users/profile/{username}"
   * @param file - El archivo nuevo a subir, con su nombre y extension @example file: "imagen.png"
   * @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#003
   * @returns La URL del archivo actualizado.
   */
  async updateFile(path: string, file: File): Promise<Result<string>> {
    return this.handler(async () => {
      await deleteObject(this.getReference(path));
      const result = await this.uploadFile(path, file);
      if ('error' in result) { return 'No se actualizó el file' }
      return result.value
    }, 'Actualizar archivo')
  }

  /**
   * Elimina un archivo del almacenamiento de Firebase.
   * @param path - La ruta del archivo a eliminar.
   */
  async deleteFile(path: string): Promise<Result<void>> {
    return this.handler(async () => await deleteObject(this.getReference(path)), 'Eliminar archivo')
  }
}

class EmailService implements IEmail {
  private static instance: EmailService;
  private constructor() { }

  public static getInstance(): EmailService {
    if (!EmailService.instance) { EmailService.instance = new EmailService() }
    return EmailService.instance;
  }

  private async handler<T>(operation: () => Promise<T>, error: string): Promise<Result<T>> {
    //TODO: Implementar el manejo de errores de forma mas profesional
    try {
      const result = await operation();
      return { value: result }
    } catch (e) { return { error: `Error interno del servidor al ${error}: ${e instanceof Error ? e.message : String(e)}` } }
  }

  /**
   * Envia un correo de verificación al usuario.
   * @param user - El usuario a verificar, contiene las credenciales del usuario.
   * @param url - La URL de la aplicación, se utiliza para redirigir al usuario a la URL de verificación.
   * @example url = 'https://mitchel2003.github.io/Gestion_salud/src/public'
   */
  async sendEmailVerification(user: User, url: string): Promise<Result<void>> {
    const redirect = `${url}/auth/verify-email/${user.email}/${user.verificationToken}`;
    return this.handler(async () =>
      await sendEmailVerification(getUserDefaultFB(user), { url: redirect }),
      'Enviar correo de verificación'
    )
  }
}

export const emailService = EmailService.getInstance();
export const storageService = StorageService.getInstance();