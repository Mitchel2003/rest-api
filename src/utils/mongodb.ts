import mongoose from "mongoose";
import config from "./config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("connection sucessful");
  } catch (e) { console.log("Error to try conect with database: " + e) }
}