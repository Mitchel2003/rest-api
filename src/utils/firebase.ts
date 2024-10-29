import { initializeApp } from "firebase/app";
import config from "./config";

const firebaseConfig = JSON.parse(config.firebaseConfig);
export const app = initializeApp(firebaseConfig);