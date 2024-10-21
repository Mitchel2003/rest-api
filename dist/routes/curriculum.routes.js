"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const curriculum_schema_1 = require("../schemas/curriculum.schema");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const express_1 = require("express");
const curriculum_controller_1 = require("../controllers/curriculum.controller");
const router = (0, express_1.Router)();
router.post('/cv', auth_middleware_1.default, (0, validator_middleware_1.default)(curriculum_schema_1.curriculumSchema), curriculum_controller_1.createCurriculum);
router.get('/cvs', auth_middleware_1.default, curriculum_controller_1.getCurriculums);
router.get('/cv/:id', auth_middleware_1.default, curriculum_controller_1.getCurriculum);
router.put('/cv/:id', auth_middleware_1.default, curriculum_controller_1.updateCurriculum);
router.delete('/cv/:id', auth_middleware_1.default, curriculum_controller_1.deleteCurriculum);
exports.default = router;
//# sourceMappingURL=curriculum.routes.js.map