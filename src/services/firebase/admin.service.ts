import config from "@/utils/config";
import admin from "firebase-admin";

class FirebaseAdmin {
  private auth: admin.auth.Auth;
  private static instance: FirebaseAdmin;
  private constructor() {
    !admin.apps.length && admin.initializeApp({ credential: admin.credential.cert(config.firebaseAdmin) })
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
}

export const firebaseAdmin = FirebaseAdmin.getInstance().getAuth()