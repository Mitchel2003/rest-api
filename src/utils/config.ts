import dotenv from 'dotenv';
dotenv.config()

export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  depUrl: process.env.PRODUCTION_URL as string,
  devUrl: process.env.DEVELOPMENT_URL as string,
  privateKey: process.env.PRIVATE_KEY as string,
  mongodbUri: process.env.MONGODB_URI as string,
  redis: {//redis environment variables
    url: process.env.REDIS_URL as string,
    password: process.env.REDIS_PASSWORD as string,
  },
  firebase: {//firebase environment variables
    appId: process.env.FIREBASE_APP_ID,
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  }
}