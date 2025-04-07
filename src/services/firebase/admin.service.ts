import { IAdmin, Result, AuthCredentials } from "@/interfaces/api.interface";
import { handlerService as handler } from "@/errors/handler";
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
   * Use the 'data' field instead of 'notification' to avoid duplicate notifications on mobile devices.
   * The 'data' field makes the service worker responsible for showing the notification, allowing
   * customization of icons and avoiding duplicates.
   * @param {string} title - Title of the message
   * @param {string} body - Body of the message
   * @param {string} fcmToken - FCM token of the recipient device
   * @returns {Promise<Result<string>>} - Executes the request and returns a state (success or failure).
   */
  async sendNotification(title: string, body: string, fcmToken: string): Promise<Result<string>> {
    return handler(async () => await admin.messaging().send({ data: { body: body, title: title, timestamp: Date.now().toString() }, token: fcmToken }), 'enviar notificación')
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------authentication--------------------------------------------------*/
  /**
   * Creates a new user in Firebase, uses Firebase Admin
   * @param {AuthCredentials} credentials - The credentials of the user to create.
   * @returns {Promise<Result<admin.auth.UserRecord>>} - Executes the request and returns a state (success or failure).
   */
  async createAccount(credentials: AuthCredentials): Promise<Result<admin.auth.UserRecord>> {
    return handler(async () => await this.auth.createUser({ ...credentials, emailVerified: true }), 'crear usuario (Firebase Auth)')
  }
  /**
   * Deletes a user from Firebase, uses Firebase Admin
   * @param {string} uid - The unique identifier of the user to delete.
   * @returns {Promise<Result<void>>} - Executes the request and returns a state (success or failure).
   */
  async deleteAccount(uid: string): Promise<Result<void>> {
    return handler(async () => await this.auth.deleteUser(uid), 'eliminar usuario (Firebase Auth)')
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const firebaseAdmin = FirebaseAdmin.getInstance().getAuth()
export default FirebaseAdmin.getInstance()