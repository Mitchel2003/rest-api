import dotenv from "dotenv"
dotenv.config()

export default {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.TOKEN_SECRET as string,
  frontendUrl: process.env.FRONTEND_URL as string,
  nodeEnv: process.env.NODE_ENV || "development",
  mailtrapToken: process.env.MAILTRAP_TOKEN as string,
}