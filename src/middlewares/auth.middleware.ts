import { authService as authFB } from "@/services/firebase/auth.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { NextFunction, Response } from "express";

const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return send(res, 401, 'Token no proporcionado');

  try {
    const decodedToken = await authFB.verifyToken(token);
    req.user = mapAuth(decodedToken);
    next();
  } catch (error) { send(res, 401, 'Token inválido') }
}

const mapAuth = (decodedToken: any) => ({
  id: decodedToken.uid,
  email: decodedToken.email || ''
})

export default authRequired