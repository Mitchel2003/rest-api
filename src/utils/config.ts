import dotenv from 'dotenv';
dotenv.config()

export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  depUrl: process.env.PRODUCTION_URL as string,
  devUrl: process.env.DEVELOPMENT_URL as string,
  mongodbUri: process.env.MONGODB_URI as string,
  firebaseAdmin: JSON.parse(process.env.FIREBASE_CREDENTIALS as string),
  redis: {//redis environment variables (not used)
    url: process.env.REDIS_URL as string,
    password: process.env.REDIS_PASSWORD as string,
  }
}