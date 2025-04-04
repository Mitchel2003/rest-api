import { userService } from "@/services/mongodb/user/user.service";
import { handlerService as handler } from "@/errors/handler";
import { IAdmin, Result } from "@/interfaces/api.interface";
import { NotFound } from "@/errors";
import config from "@/utils/config";
import admin from "firebase-admin";

class FirebaseAdmin implements IAdmin {
  private auth: admin.auth.Auth;
  private static instance: FirebaseAdmin;

  private constructor() {
    const firebaseConfig = config.firebaseAdmin
    firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, "\n")
    !admin.apps.length && admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) })
    this.auth = admin.auth()
  }

  /**
   * Returns the singleton instance of FirebaseAdmin.
   * If the instance does not exist, it creates a new one.
   * @returns {FirebaseAdmin} The singleton instance of FirebaseAdmin.
   */
  public static getInstance(): FirebaseAdmin {
    if (!FirebaseAdmin.instance) { FirebaseAdmin.instance = new FirebaseAdmin() }
    return FirebaseAdmin.instance
  }

  /**
   * Returns the instance of Firebase Auth.
   * @returns {admin.auth.Auth} Instance of Firebase Auth.
   */
  public getAuth(): admin.auth.Auth { return this.auth }

  /*--------------------------------------------------messaging--------------------------------------------------*/
  /**
   * Send notification to user through Firebase Cloud Messaging (FCM).
   * @param {string} userId - User id of user
   * @param {string} title - Title of message
   * @param {string} body - Body of message
   * @returns {Promise<Result<void>>} - Executes the request and returns a state (success or failure).
   */
  async sendNotification(userId: string, title: string, body: string): Promise<Result<void>> {
    return handler(async () => {
      const user = await userService.findById(userId);
      if (!user.success) throw new NotFound({ message: 'usuario no encontrado' })
      if (!user.data?.fcmToken) throw new NotFound({ message: 'token de notificación no encontrado' })
      const message = { notification: { title, body }, token: user.data.fcmToken }
      await admin.messaging().send(message)
    }, 'enviar notificación')
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------authentication--------------------------------------------------*/
  /**
   * Deletes a user from Firebase, uses Firebase Admin
   * @param {string} uid - The unique identifier of the user to delete.
   * @returns {Promise<Result<void>>} - Executes the request and returns a state (success or failure).
   */
  async deleteAccount(uid: string): Promise<Result<void>> {
    return handler(async () => await firebaseAdmin.deleteUser(uid), 'eliminar usuario (Firebase Auth)')
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const firebaseAdmin = FirebaseAdmin.getInstance().getAuth()
export default FirebaseAdmin.getInstance()