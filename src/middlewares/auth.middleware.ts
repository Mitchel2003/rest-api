import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { verifyAccessToken } from "@/services/jwt.service";
import { NextFunction, Response } from "express";

const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  const access = await verifyAccessToken(req.cookies.token);
  if ('error' in access) return send(res, 401, access.error);
  req.user = access;
  next();
}

export default authRequired