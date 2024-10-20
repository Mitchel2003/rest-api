"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const connectionDB = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.mongodbUri);
        console.log("connection sucessful");
    }
    catch (e) {
        console.log("Error to try conect with database: " + e);
    }
};
exports.connectionDB = connectionDB;
//# sourceMappingURL=db.js.map