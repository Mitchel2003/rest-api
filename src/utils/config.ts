import dotenv from 'dotenv';
dotenv.config()

export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  depUrl: process.env.PRODUCTION_URL as string,
  devUrl: process.env.DEVELOPMENT_URL as string,
  mongodbUri: process.env.MONGODB_URI as string,
  redis: {//redis environment variables (not used)
    url: process.env.REDIS_URL as string,
    password: process.env.REDIS_PASSWORD as string,
  },
  firebaseAdmin: {//firebase-admin environment variables
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }
}