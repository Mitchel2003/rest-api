import { getAuth, Auth, updateProfile, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth"
import { getStorage, FirebaseStorage, ref, deleteObject, getDownloadURL, uploadBytes, listAll } from "firebase/storage"
import { getFirestore, Firestore, setDoc, doc, CollectionReference, collection } from "firebase/firestore"

import { handlerService as handler } from "@/utils/handler"
import { User as UserFirebase } from "firebase/auth"
import { Result } from "@/interfaces/api.interface"
import { app } from "@/utils/firebase"
import config from "@/utils/config"
import {
  DatabaseService as IDatabase,
  StorageService as IStorage,
  AuthService as IAuth,
  UserCredentialsFB,
} from "@/interfaces/db.interface"

/*--------------------------------------------------Auth--------------------------------------------------*/
class AuthService implements IAuth {
  private static instance: AuthService
  private readonly auth: Auth

  private constructor() { this.auth = getAuth(app) }

  public static getInstance(): AuthService {
    if (!AuthService.instance) { AuthService.instance = new AuthService() }
    return AuthService.instance
  }

  /*---------------> registration <---------------*/
  /**
   * Crea un usuario con credenciales en Firebase.
   * @param {string} username - El nombre de usuario.
   * @param {string} email - El correo del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<UserAuth>>} El usuario auth de firebase creado.
  */
  async registerAccount(username: string, email: string, password: string): Promise<Result<UserFirebase>> {
    return handler(async () => {
      const res = await createUserWithEmailAndPassword(this.auth, email, password)
      if (!res.user) throw new Error('No se pudo crear el usuario')
      await updateProfile(res.user, { displayName: username })
      return res.user
    }, 'Crear usuario')
  }

  /*---------------> verification <---------------*/
  /**
   * Verifica las credenciales del usuario.
   * @param {string} email - El email del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<UserAuth>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
   */
  async verifyCredentials(email: string, password: string): Promise<Result<UserFirebase>> {
    return handler(async () => {
      const res = await signInWithEmailAndPassword(this.auth, email, password)
      if (!res.user) throw new Error('Credenciales inválidas')
      return res.user
    }, 'Verificar credenciales')
  }

  /*---------------> authentication <---------------*/
  /**
   * Envia un correo de verificación de cuenta al correo suministrado por el usuario.
   * El enlace de redireccion (url) lo definimos en el metodo dado que necesitamos el uid del usuario.
   * @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#004
   */
  async sendEmailVerification(): Promise<Result<void>> {
    return handler(async () => {
      if (!this.auth.currentUser) throw new Error('No se encontró un usuario (auth)')
      const url = `${config.frontendUrl}/auth/verify-action?uid=${this.auth.currentUser.uid}`
      await sendEmailVerification(this.auth.currentUser, { url })
    }, 'Enviar correo de verificación')
  }

  /**
   * Envia un correo de restablecimiento de contraseña al correo suministrado por el usuario.
   * Enlace de redireccion esta definido en el archivo de configuracion de firebase (templates).
   * @param {string} email - El email del usuario.
  */
  async sendEmailResetPassword(email: string): Promise<Result<void>> {
    return handler(async () => await sendPasswordResetEmail(this.auth, email), 'Enviar correo de restablecimiento de contraseña')
  }

  /**
   * Actualiza la contraseña del usuario mediante un token de restablecimiento (oobCode) generado por firebase.
   * @param {string} oobCode - El token de restablecimiento de contraseña.
   * @param {string} newPassword - La contraseña de la solicitud de restablecimiento (forgot password).
   */
  async validateResetPassword(oobCode: string, newPassword: string): Promise<Result<void>> {
    return handler(async () => await confirmPasswordReset(this.auth, oobCode, newPassword), 'Validar restablecimiento de contraseña')
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Storage--------------------------------------------------*/
class StorageService implements IStorage {
  private static instance: StorageService
  private readonly storage: FirebaseStorage

  private constructor() { this.storage = getStorage(app) }

  public static getInstance(): StorageService {
    if (!StorageService.instance) { StorageService.instance = new StorageService() }
    return StorageService.instance
  }

  private getReference(path: string) { return ref(this.storage, path) }

  /**
   * Subir un archivo al almacenamiento de Firebase.
   * @param path - La ruta del archivo final.
   * @example path podria ser 'users/profile/{username}'
   * @param file - El archivo a subir.
   * @returns La URL del archivo subido.
  */
  async uploadFile(path: string, file: File): Promise<Result<string>> {
    return handler(async () => {
      const storageRef = this.getReference(path)
      const metadata = buildStorageMetadata(file)
      const upload = await uploadBytes(storageRef, file, metadata)
      return await getDownloadURL(upload.ref)
    }, 'Subir archivo')
  }

  /**
   * Obtener la URL de un archivo del almacenamiento de Firebase.
   * @param path - La ruta del archivo al que se accede.
   * @example path = 'users/profile/{username}/imagen.png'
   * @returns La URL del archivo.
  */
  async getFile(path: string): Promise<Result<string>> {
    return handler(async () => await getDownloadURL(this.getReference(path)), 'Obtener archivo')
  }

  /**
   * Obtener las URLs de todos los archivos de un directorio del almacenamiento de Firebase.
   * @param path - La ruta del directorio al que se accede.
   * @example path = 'users/profile/{username}'
   * @returns Un array con las URLs de los archivos.
  */
  async getFiles(path: string): Promise<Result<string[]>> {
    return handler(async () => {
      const storageRef = this.getReference(path)
      const files = await listAll(storageRef)
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
    return handler(async () => {
      await deleteObject(this.getReference(path))
      const result = await this.uploadFile(path, file)
      if ('error' in result) { return 'No se actualizó el file' }
      return result.value
    }, 'Actualizar archivo')
  }

  /**
   * Elimina un archivo del almacenamiento de Firebase.
   * @param path - La ruta del archivo a eliminar.
  */
  async deleteFile(path: string): Promise<Result<void>> {
    return handler(async () => await deleteObject(this.getReference(path)), 'Eliminar archivo')
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Database--------------------------------------------------*/
class DatabaseService implements IDatabase {
  private static instance: DatabaseService
  private readonly db: Firestore

  private constructor() { this.db = getFirestore(app) }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) { DatabaseService.instance = new DatabaseService() }
    return DatabaseService.instance
  }

  /**
   * Crea las credenciales de un usuario en la base de datos de firebase.
   * @param user - El usuario autenticado a registrar, consta de su email, nombre de usuario y uid.
   * @param credentials - Corresponde a las credenciales del usuario, contiene el rol del usuario en validacion.
  */
  async registerUserCredentials(user: UserFirebase, credentials: UserCredentialsFB): Promise<Result<void>> {
    return handler(async () => {
      return await setDoc(doc(this.getSubCollection('users'), user.uid), {
        username: user.displayName,
        role: credentials.role,
        email: user.email,
        access: false,
      })
    }, 'Crear usuario')
  }

  /**
   * Obtiene una referencia a una subcolección de la colección principal.
   * @param name - El nombre de la subcolección.
   * @returns Una referencia a la subcolección.
  */
  getSubCollection(name: string): CollectionReference {
    return collection(this.getCollection(), name)
  }

  /**
   * Obtiene una referencia a la colección principal.
   * @returns Una referencia a la colección principal.
  */
  getCollection(): CollectionReference {
    return collection(this.db, 'gestion_salud')
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Construye los metadatos del archivo para Firebase Storage.
 * @param file - El archivo a subir. @example file: "imagen.png"
 * @returns Los metadatos del archivo con su configuración para Firebase Storage.
 */
const buildStorageMetadata = (file: File): object => {
  return {
    contentType: file.type,
    customMetadata: { originalName: file.name, uploadedAt: new Date().toISOString() }
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const authService = AuthService.getInstance()
export const storageService = StorageService.getInstance()
export const databaseService = DatabaseService.getInstance()
/*---------------------------------------------------------------------------------------------------------*/