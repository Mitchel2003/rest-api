import { loginSchema, registerSchema, verifyEmailSchema, forgotPasswordSchema, resetPasswordSchema } from "../schemas/auth.schema";
import validateSchema from "../middlewares/validator.middleware";
import tokenRequired from "../middlewares/token.middleware";
import authRequired from "../middlewares/auth.middleware";
import { Router } from "express";

import {
  login,
  register,
  logout,
  profile,
  verifyAuth,
  verifyEmail,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller";

const router = Router();

//auth routes
router.post('/logout', logout);
router.post('/login', validateSchema(loginSchema), login);
router.post('/register', validateSchema(registerSchema), register);

//user routes
router.get('/profile', authRequired, profile);

//verify routes
router.get('/verify-auth', tokenRequired, verifyAuth);
router.post('/verify-email', validateSchema(verifyEmailSchema), verifyEmail);

//forgot password routes
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validateSchema(resetPasswordSchema), resetPassword);

export default router;