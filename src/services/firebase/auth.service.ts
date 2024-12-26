import { RegisterAccountProps } from "@/interfaces/props.interface"
import { AuthService as IAuth } from "@/interfaces/db.interface"
import { handlerService as handler } from "@/errors/handler"
import { Result } from "@/interfaces/api.interface"
import { NotFound } from "@/errors"
import { firebaseApp } from "@/db"
import admin from "firebase-admin"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
  UserInfo,
  getAuth,
  signOut,
  Auth,
  User,
} from "firebase/auth"

/**
 * Consist on a class that works above an instance auth
 * Have various functions like observer, verification or overwrite data
 */
class AuthService implements IAuth {
  private static instance: AuthService
  private readonly auth: Auth
  private constructor() { this.auth = getAuth(firebaseApp) }

  public static getInstance(): AuthService {
    if (!AuthService.instance) { AuthService.instance = new AuthService() }
    return AuthService.instance
  }

  /*---------------> authentication <---------------*/
  /**
   * Es un observador que ejecuta un callback cuando el estado de la sesion cambia.
   * @param {(user: User | null) => void} callback - Accion a desencadenar tras el cambio en el estado del usuario
   */
  observeAuth(callback: (user: User | null) => void) {
    onAuthStateChanged(this.auth, callback)
  }

  /**
   * Crea una autenticación por medio de la verificación de credenciales.
   * @param {string} email - El email del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<User>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
   */
  async login(email: string, password: string): Promise<Result<User>> {
    return handler(async () => (await signInWithEmailAndPassword(this.auth, email, password)).user, 'verificar credenciales')
  }

  /**
   * Permite cerrar la sessión del usuario en contexto
   * @returns {Promise<Result<void>>} - Retorna un mensaje de éxito si la sesión se cierra correctamente.
   */
  async logout(): Promise<Result<void>> {
    return handler(async () => await signOut(this.auth), 'cerrar sesión')
  }
  /*----------------------------------------------------*/

  /*---------------> create and update <---------------*/
  /**
   * Crea un usuario con credenciales en Firebase.
   * usamos propiedades del usuario (UserInfo) para guardar el perfil,
   * mas adelante podemos crear el perfil en la base de datos (mongoDB)
   * @param {UserCredentials & {password: string}} data - Posee la informacion primordial del usuario (form register)
   * @returns {Promise<Result<UserCredential>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
   */
  async registerAccount({ email, password, username, role, headquarters }: RegisterAccountProps): Promise<Result<User>> {
    return handler(async () => {
      const res = await createUserWithEmailAndPassword(this.auth, email, password)
      await this.updateProfile(res.user, { displayName: username, photoURL: `${role};${headquarters.join(',')}` })
      return res.user
    }, 'crear usuario (Firebase Auth)')
  }
  /**
   * Actualiza el perfil del usuario en Firebase.
   * Los campos editables son limitados: displayName, photoURL;
   * @param {User} user - El usuario de firebase, representa la autenticación.
   * @param {Partial<UserInfo>} profile - El campo a actualizar, suele ser un object con los atributos.
   * @returns {Promise<Result<void>>} - Ejecuta la peticion y retorna un state (sucess or failure).
   */
  async updateProfile(user: User, profile: Partial<UserInfo>): Promise<Result<void>> {
    return handler(async () => await updateProfile(user, profile), 'actualizar perfil (Firebase Auth)')
  }
  /*----------------------------------------------------*/

  /*---------------> verification <---------------*/
  /**
   * Envia un correo de verificación de cuenta al correo en contexto de authetication.
   * @returns {Promise<Result<void>>} - Ejecuta la peticion y retorna un state (sucess or failure).
   */
  async sendEmailVerification(): Promise<Result<void>> {
    return handler(async () => {
      if (!this.auth.currentUser) throw new NotFound({ message: 'Usuario (auth)' })
      await sendEmailVerification(this.auth.currentUser)
    }, 'enviar correo de verificación')
  }
  /**
   * Envia un correo de restablecimiento de contraseña al correo suministrado por el usuario.
   * Enlace de redireccion esta definido en el archivo de configuracion de firebase (templates).
   * @param {string} email - El email del usuario.
   * @returns {Promise<Result<void>>} - Ejecuta la peticion y retorna un state (sucess or failure).
   */
  async sendEmailResetPassword(email: string): Promise<Result<void>> {
    return handler(async () => await sendPasswordResetEmail(this.auth, email), 'enviar correo de restablecimiento de contraseña')
  }
  /**
   * Verifica un token de autenticación.
   * @param {string} token - El token a verificar.
   * @returns {Promise<Result<any>>} - Retorna el token decodificado si es válido, o un error si no lo es.
   */
  async verifyToken(token: string): Promise<Result<any>> {
    return handler(async () => {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    }, 'verificar token de ID');
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const authService = AuthService.getInstance()