import mongoose from "mongoose";
import env from "./utils/config"

export const connectionDB = async () => {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log("connection sucessful");
  } catch (e) { console.log("Error to try conect with database: " + e) }
}