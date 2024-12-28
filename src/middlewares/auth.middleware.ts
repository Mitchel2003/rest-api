import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { authService as authFB } from "@/services/firebase/auth.service";
import { NextFunction, Response } from "express";

const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  const authenticate = authFB.onAuth()
  if (!authenticate) return send(res, 401, 'Usuario no autenticado')
  req.user = authenticate
  next()
}

export default authRequired