import { firebaseAdmin } from "@/services/firebase/admin.service"
import { AuthService as IAuth } from "@/interfaces/db.interface"
import { handlerService as handler } from "@/errors/handler"
import { AccountProps } from "@/interfaces/props.interface"
import { Result } from "@/interfaces/api.interface"
import config from "@/utils/config"
import { NotFound } from "@/errors"
import { firebaseApp } from "@/db"

import { getMessaging, getToken, Messaging } from "firebase/messaging"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
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
  private auth: Auth
  private messaging: Messaging
  private static instance: AuthService
  private static user: User | null = null

  private constructor() {
    this.auth = getAuth(firebaseApp)
    this.messaging = getMessaging()
  }

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
  /**
   * Returns the instance of Auth
   * @returns { Auth } - User of firebase
   */
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

  /*---------------> create and delete <---------------*/
  /**
   * Creates a user with credentials in Firebase.
   * We use user properties (UserInfo) to save the profile,
   * @param {AccountProps} credentials - Contains the primary user information (form register)
   * @returns {Promise<Result<User>>} - Returns the user if the credentials are valid, or an error if they are not.
   * @example photoURL - example: 'role;permissions;phone;nit;invima;profesionalLicense'
   */
  async registerAccount(credentials: AccountProps): Promise<Result<User>> {
    return handler(async () => {
      const { role, phone, nit, invima, profesionalLicense, permissions } = credentials;
      const dataStr = `${role};${permissions ? JSON.stringify(permissions) : '[]'}
        ;${phone};${nit ?? ''};${invima ?? ''};${profesionalLicense ?? ''}`;
      const res = await createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password);
      await updateProfile(res.user, { displayName: credentials.username, photoURL: dataStr });
      return res.user;
    }, 'crear usuario (Firebase Auth)')
  }
  /**
   * Deletes a user from Firebase, uses Firebase Admin
   * @param {string} uid - The unique identifier of the user to delete.
   * @returns {Promise<Result<void>>} - Executes the request and returns a state (success or failure).
   */
  async deleteAccount(uid: string): Promise<Result<void>> {
    return handler(async () => await firebaseAdmin.deleteUser(uid), 'eliminar usuario (Firebase Auth)')
  }
  /*----------------------------------------------------*/

  /*---------------> actions requests <---------------*/
  /**
   * Handles the process of getting a token for Firebase Cloud Messaging (FCM).
   * @returns {Promise<Result<string>>} - Returns the token if the request is successful, or an error if it fails.
   */
  async getTokenFCM(): Promise<Result<string>> {
    return handler(async () => {
      if (!this.auth.currentUser) throw new NotFound({ message: 'Usuario (auth)' })
      return await getToken(this.messaging, { vapidKey: config.firebase.vapidKey })
    }, 'obtener token FCM')
  }
  /**
   * Sends an email verification to the email in the authentication context.
   * @returns {Promise<Result<void>>} - Executes the request and returns a state (success or failure).
   */
  async sendEmailVerification(): Promise<Result<void>> {
    return handler(async () => {
      if (!this.auth.currentUser) throw new NotFound({ message: 'Usuario (auth)' })
      await sendEmailVerification(this.auth.currentUser)
    }, 'enviar correo de verificación')
  }
  /**
   * Sends a password reset email to the email provided by the user.
   * The redirect link is defined in the firebase configuration file (templates).
   * @param {string} email - The user's email.
   * @returns {Promise<Result<void>>} - Executes the request and returns a state (success or failure).
   */
  async sendEmailResetPassword(email: string): Promise<Result<void>> {
    return handler(async () => await sendPasswordResetEmail(this.auth, email), 'enviar correo de restablecimiento de contraseña')
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const authService = AuthService.getInstance()