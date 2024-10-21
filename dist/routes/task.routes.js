"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const task_schema_1 = require("../schemas/task.schema");
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
router.post('/task', auth_middleware_1.default, (0, validator_middleware_1.default)(task_schema_1.taskSchema), task_controller_1.createTask);
router.get('/task/:id', auth_middleware_1.default, task_controller_1.getTask);
router.get('/tasks', auth_middleware_1.default, task_controller_1.getTasks);
router.put('/task/:id', auth_middleware_1.default, task_controller_1.updateTask);
router.delete('/task/:id', auth_middleware_1.default, task_controller_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task.routes.js.map