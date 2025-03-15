import { initializeApp } from "firebase/app";
import config from "@/utils/config";
import mongoose from "mongoose";

export const mongoDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("connection sucessful");
  } catch (e) { console.log("Error to try conect with database: " + e) }
}

export const firebaseApp = initializeApp(config.firebase);