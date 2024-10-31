import { initializeApp } from "firebase/app";
import config from "./config";

export default initializeApp(config.firebaseConfig);