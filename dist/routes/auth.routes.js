"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_schema_1 = require("../schemas/auth.schema");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const token_middleware_1 = __importDefault(require("../middlewares/token.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
//auth routes
router.post('/logout', auth_controller_1.logout);
router.post('/login', (0, validator_middleware_1.default)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post('/register', (0, validator_middleware_1.default)(auth_schema_1.registerSchema), auth_controller_1.register);
//user routes
router.get('/profile', auth_middleware_1.default, auth_controller_1.profile);
//verify routes
router.get('/verify-auth', token_middleware_1.default, auth_controller_1.verifyAuth);
router.post('/verify-email', (0, validator_middleware_1.default)(auth_schema_1.verifyEmailSchema), auth_controller_1.verifyEmail);
//forgot password routes
router.post('/forgot-password', (0, validator_middleware_1.default)(auth_schema_1.forgotPasswordSchema), auth_controller_1.forgotPassword);
router.post('/reset-password/:token', (0, validator_middleware_1.default)(auth_schema_1.resetPasswordSchema), auth_controller_1.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map