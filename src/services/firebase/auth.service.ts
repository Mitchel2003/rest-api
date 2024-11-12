import { AuthService as IAuth } from "@/interfaces/db.interface"
import { handlerService as handler } from "@/errors/handler"
import { Result } from "@/interfaces/api.interface"
import config from "@/utils/config"
import { firebaseApp } from "@/db"
import { NotFound } from "@/errors"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  confirmPasswordReset,
  UserCredential,
  updateProfile,
  getAuth,
  Auth
} from "firebase/auth"

/*--------------------------------------------------Auth--------------------------------------------------*/
class AuthService implements IAuth {
  private static instance: AuthService
  private readonly auth: Auth
  private constructor() { this.auth = getAuth(firebaseApp) }

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
   * @returns {Promise<Result<UserAuthFB>>} El usuario auth de firebase creado.
   */
  async registerAccount(username: string, email: string, password: string): Promise<Result<UserCredential>> {
    return handler(async () => {
      const res = await createUserWithEmailAndPassword(this.auth, email, password)
      await updateProfile(res.user, { displayName: username })
      return res
    }, 'crear usuario (Firebase Auth)')
  }

  /*---------------> verification <---------------*/
  /**
   * Verifica las credenciales del usuario.
   * @param {string} email - El email del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<UserAuthFB>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
   */
  async verifyCredentials(email: string, password: string): Promise<Result<UserCredential>> {
    return handler(async () => await signInWithEmailAndPassword(this.auth, email, password), 'verificar credenciales')
  }

  /*---------------> authentication <---------------*/
  /**
   * Envia un correo de verificación de cuenta al correo suministrado por el usuario.
   * El enlace de redireccion (url) lo definimos en el metodo dado que necesitamos el uid del usuario.
   * @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#004
   */
  async sendEmailVerification(email: string, username: string, role: string): Promise<Result<void>> {
    return handler(async () => {
      if (!this.auth.currentUser) throw new NotFound({ message: 'Usuario (auth)' })
      const url = `${config.frontendUrl}/auth/verify-action/email=${email}&username=${username}&role=${role}`
      await sendEmailVerification(this.auth.currentUser, { url })
    }, 'enviar correo de verificación')
  }
  /**
   * Envia un correo de restablecimiento de contraseña al correo suministrado por el usuario.
   * Enlace de redireccion esta definido en el archivo de configuracion de firebase (templates).
   * @param {string} email - El email del usuario.
   */
  async sendEmailResetPassword(email: string): Promise<Result<void>> {
    return handler(async () => await sendPasswordResetEmail(this.auth, email), 'enviar correo de restablecimiento de contraseña')
  }
  /**
   * Actualiza la contraseña del usuario mediante un token de restablecimiento (oobCode) generado por firebase.
   * @param {string} oobCode - El token de restablecimiento de contraseña.
   * @param {string} newPassword - La contraseña de la solicitud de restablecimiento (forgot password).
   */
  async validateResetPassword(oobCode: string, newPassword: string): Promise<Result<void>> {
    return handler(async () => await confirmPasswordReset(this.auth, oobCode, newPassword), 'validar restablecimiento de contraseña')
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const authService = AuthService.getInstance()