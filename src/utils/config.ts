import dotenv from "dotenv"
dotenv.config()

export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL as string,
  jwtSecret: process.env.TOKEN_SECRET as string,
  mongodbUri: process.env.MONGODB_URI as string,
  firebaseConfig: JSON.stringify(process.env.FIREBASE_CONFIG as string),
};
