import { initializeApp } from "firebase/app";
import mongoose from "mongoose";
import config from "@/utils/config";

export const mongoDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("connection sucessful");
  } catch (e) { console.log("Error to try conect with database: " + e) }
}
export const firebaseApp = initializeApp(config.firebaseConfig);