"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyEmailSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
/*--------------------------------------------------authentication--------------------------------------------------*/
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "El correo electrónico es requerido" })
        .email({ message: "Correo electrónico inválido" }),
    password: zod_1.z
        .string({ required_error: "La contraseña es requerida" })
        .min(6, { message: "La contraseña es demasiado corta" })
});
exports.registerSchema = zod_1.z.object({
    username: zod_1.z
        .string({ required_error: "El nombre de usuario es requerido" }),
    email: zod_1.z
        .string({ required_error: "El correo electrónico es requerido" })
        .email({ message: "Correo electrónico inválido" }),
    password: zod_1.z
        .string({ required_error: "La contraseña es requerida" })
        .min(6, { message: "La contraseña es demasiado corta" }),
    role: zod_1.z
        .enum(['admin', 'user'], { required_error: "El rol es requerido" })
});
/*---------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------validation--------------------------------------------------*/
exports.verifyEmailSchema = zod_1.z.object({
    code: zod_1.z
        .string({ required_error: "El código de verificación es requerido" })
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "El correo electrónico es requerido" })
        .email({ message: "Correo electrónico inválido" }),
});
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z
        .string({ required_error: "La contraseña es requerida" })
        .min(6, { message: "La contraseña es demasiado corta" }),
});
/*---------------------------------------------------------------------------------------------------------*/
//# sourceMappingURL=auth.schema.js.map