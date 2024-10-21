"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const curriculum_routes_1 = __importDefault(require("./routes/curriculum.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: config_1.default.frontendUrl, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', auth_routes_1.default);
app.use('/api', task_routes_1.default);
app.use('/api', curriculum_routes_1.default);
app.use('/api/location', location_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map