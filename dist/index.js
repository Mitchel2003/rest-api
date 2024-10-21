"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const app_1 = __importDefault(require("./app"));
(0, db_1.connectionDB)();
app_1.default.listen(process.env.PORT, () => console.log(`Server initialized`));
//# sourceMappingURL=index.js.map