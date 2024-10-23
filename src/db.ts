import config from "./utils/config";
import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("connection sucessful");
  } catch (e) { console.log("Error to try conect with database: " + e) }
}