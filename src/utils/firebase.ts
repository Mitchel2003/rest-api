import { initializeApp } from "firebase/app";
import config from "./config";

export const app = initializeApp(config.firebaseConfig);