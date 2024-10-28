import { generateVerificationToken, generateVerificationExpiresAt } from "../utils/math";
import { encrypt, verified } from "../services/bcrypt.service";
import { User as UserProps } from "../types/user/user.type";
import { Result } from "../interfaces/api.interface";
import User from "../models/user/user.model";

import { Document } from "mongoose";
import { Request } from "express";
import crypto from "crypto";

class AuthService {
  private static instance: AuthService;
  private constructor() { }

  public static getInstance(): AuthService {
    if (!AuthService.instance) AuthService.instance = new AuthService()
    return AuthService.instance;
  }
  /**
   * Crea un nuevo usuario con la contraseña encriptada y un token de verificación email definido.
   * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
   * @returns {Promise<UserProps>} - Retorna el documento del usuario creado.
   */
  async createUser({ body }: Request): Promise<Result<UserProps>> {
    try {
      const { username, email, password } = body;
      const userFound = await User.findOne({ email });
      if (userFound) return { error: 'Email se encuentra en uso' }

      const passHash = await encrypt(password, 10);
      const verificationToken = generateVerificationToken();
      const verificationExpiresAt = generateVerificationExpiresAt();
      const user = new User({
        username,
        email,
        password: passHash,
        verificationToken,
        verificationExpiresAt
      })
      const userSaved = await user.save();
      return { value: userSaved };
    } catch (e) { return { error: `Error al crear el usuario: ${e}` } }
  }
}

class VerifyService {
  private static instance: VerifyService;
  private constructor() { }

  public static getInstance(): VerifyService {
    if (!VerifyService.instance) VerifyService.instance = new VerifyService()
    return VerifyService.instance;
  }
  /**
   * Verifica el código de autenticación del cuenta.
   * Luego de validar que el token existe y no está expirado, se verifica la cuenta.
   * @param {string} code - El código de verificación del usuario, corresponde a un aleatorio de 6 dígitos.
   * @returns {Promise<Result<boolean>>} - Retorna true si el código es válido y el usuario está verificado, o un error si no lo es.
  */
  async verifyEmail(code: string): Promise<Result<boolean>> {
    try {
      const user = await User.findOne({
        verificationToken: code,
        verificationExpiresAt: { $gt: new Date() }
      });
      if (!user) return { error: 'Código de verificación inválido o expirado' };

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationExpiresAt = undefined;
      await user.save();
      return { value: true };
    } catch (e) { return { error: `Error al verificar el email: ${e}` } }
  }

  /**
   * Verifica las credenciales del usuario.
   * Valida si el usuario existe y si la contraseña es correcta.
   * Utiliza el servicio de bcrypt para desencriptar la contraseña.
   * @param {string} email - El email del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<Document>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
  */
  async verifyCredentials(email: string, password: string): Promise<Result<Document>> {
    const user = await User.findOne({ email });
    if (!user) return { error: "Usuario no encontrado" };
    const isMatch = await verified(password, user.password);
    return isMatch ? { value: user } : { error: "Credenciales inválidas" };
  }
}

class ResetPasswordService {
  private static instance: ResetPasswordService;
  private constructor() { }

  public static getInstance(): ResetPasswordService {
    if (!ResetPasswordService.instance) ResetPasswordService.instance = new ResetPasswordService()
    return ResetPasswordService.instance;
  }
  /**
   * Genera un token con expiración para restablecer la contraseña.
   * Establece los campos de expiración y token en el usuario en las credenciales del usuario.
   * @param {string} email - El email del usuario en cuestión.
   * @returns {Promise<Result<string>>} - Retorna el token generado si el email existe, o un error si no lo es.
   */
  async resetTokenCredentials(email: string): Promise<Result<string>> {
    try {
      const user = await User.findOne({ email });
      if (!user) return { error: 'Email no encontrado' };

      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

      user.resetPasswordExpiresAt = resetTokenExpiresAt;
      user.resetPasswordToken = resetToken;
      await user.save();
      return { value: resetToken };
    } catch (e) { return { error: `Error al actualizar el token de restablecimiento: ${e}` } }
  }

  /**
   * Actualiza la contraseña del usuario mediante un token de restablecimiento previamente generado (resetTokenCredentials).
   * Establece una nueva contraseña encriptada y resetea los campos de restablecimiento definidos para este token.
   * @param {string} token - El token de restablecimiento de contraseña.
   * @param {string} newPassword - La contraseña de la solicitud de restablecimiento (forgot password).
   * @returns {Promise<Result<UserProps>>} - Retorna el usuario actualizado si el token es válido, o un error si no lo es.
   */
  async updatePassword(token: string, newPassword: string): Promise<Result<UserProps>> {
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: new Date() }
      });
      if (!user) return { error: 'Token de restablecimiento de contraseña inválido o expirado' };

      const passHash = await encrypt(newPassword, 10);
      user.password = passHash;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;
      await user.save();
      return { value: user };
    } catch (e) { return { error: `Error al actualizar la contraseña: ${e}` } }
  }
}

export const auth = AuthService.getInstance();
export const verify = VerifyService.getInstance();
export const resetPassword = ResetPasswordService.getInstance();