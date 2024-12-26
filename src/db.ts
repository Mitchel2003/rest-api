import { initializeApp } from "firebase/app";
import mongoose from "mongoose";
import admin from "firebase-admin";
import config from "@/utils/config";

const serviceAccount: admin.ServiceAccount = {
  projectId: config.firebaseConfig.projectId,
  privateKey: config.privateKey
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${config.firebaseConfig.projectId}.firebaseio.com`
})

export const mongoDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("connection sucessful");
  } catch (e) { console.log("Error to try conect with database: " + e) }
}

export const firebaseApp = initializeApp(config.firebaseConfig);