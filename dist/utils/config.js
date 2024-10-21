"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.TOKEN_SECRET,
    frontendUrl: process.env.FRONTEND_URL,
    nodeEnv: process.env.NODE_ENV || "development",
    mailtrapToken: process.env.MAILTRAP_TOKEN,
};
//# sourceMappingURL=config.js.map