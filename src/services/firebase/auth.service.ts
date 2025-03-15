import { RegisterAccountProps } from "@/interfaces/props.interface"
import { AuthService as IAuth } from "@/interfaces/db.interface"
import { handlerService as handler } from "@/errors/handler"
import { Result } from "@/interfaces/api.interface"
import { NotFound } from "@/errors"
import { firebaseApp } from "@/db"

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
  User
} from "firebase/auth"

/**
 * Consist on a class that works above an instance auth
 * Have various functions like observer, verification or overwrite data
 */
class AuthService implements IAuth {
  private auth: Auth
  private static instance: AuthService
  private static user: User | null = null
  private constructor() { this.auth = getAuth(firebaseApp) }

  /**
   * Returns the singleton instance of AuthService.
   * If the instance does not exist, it creates a new one.
   * @returns {AuthService} The singleton instance of AuthService.
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) { AuthService.instance = new AuthService() }
    return AuthService.instance
  }

  /*---------------> authentication <---------------*/
  /** Returns the instance of Auth */
  getAuth(): Auth { return this.auth }
  /**
   * Returns the current user or null if no user is authenticated.
   * @returns {User | null} - The current user or null if no user is authenticated.
   */
  onAuth(): User | null {
    onAuthStateChanged(this.auth, (user) => { AuthService.user = user })
    return AuthService.user
  }
  /**
   * Creates an authentication by verifying credentials.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Result<User>>} - Returns the user if the credentials are valid, or an error if they are not.
   */
  async login(email: string, password: string): Promise<Result<User>> {
    return handler(async () => (await signInWithEmailAndPassword(this.auth, email, password)).user, 'verificar credenciales')
  }
  /**
   * Closes the user's session in the context.
   * @returns {Promise<Result<void>>} - Returns a success message if the session is closed successfully.
   */
  async logout(): Promise<Result<void>> {
    return handler(async () => await signOut(this.auth), 'cerrar sesión')
  }
  /*----------------------------------------------------*/

  /*---------------> create and update <---------------*/
  /**
   * Creates a user with credentials in Firebase.
   * We use user properties (UserInfo) to save the profile,
   * @argument photoURL - example: 'admin;sede_1,sede_2,sede_3,sede_4'
   * @param {RegisterAccountProps} data.credentials - Contains the primary user information (form register)
   * @returns {Promise<Result<UserCredential>>} - Returns the user if the credentials are valid, or an error if they are not.
   */
  async registerAccount({ email, password, username, role, phone, company }: RegisterAccountProps): Promise<Result<User>> {
    return handler(async () => {
      const userCredentials = `${role};${company};${phone ?? ''}`
      const res = await createUserWithEmailAndPassword(this.auth, email, password)
      await this.updateProfile(res.user, { displayName: username, photoURL: userCredentials })
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

  /*---------------> actions requests <---------------*/
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
}
/*---------------------------------------------------------------------------------------------------------*/
export const authService = AuthService.getInstance()