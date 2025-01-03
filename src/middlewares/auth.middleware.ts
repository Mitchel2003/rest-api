import { authService as authFB } from "@/services/firebase/auth.service";
import { ExtendsRequest } from "@/interfaces/api.interface";
import { handlerResponse } from "@/errors/handler";
import { NextFunction, Response } from "express";
import { Unauthorized } from "@/errors/index";

const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  try {
    const authenticate = authFB.onAuth()
    if (!authenticate) throw new Unauthorized({ message: 'Usuario no autenticado, por favor inicia sesión' })
    req.user = authenticate
    next()
  } catch (e) { handlerResponse(res, e, "autenticación") }
}

export default authRequired