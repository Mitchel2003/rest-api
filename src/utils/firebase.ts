import { initializeApp } from "firebase/app";
import config from "./config";

const options = JSON.parse(config.firebaseConfig);
export const app = initializeApp(options);