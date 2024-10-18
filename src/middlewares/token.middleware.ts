import { ExtendsRequest } from "../interfaces/request.interface";
import { verifyAccessToken } from "../services/jwt.service";
import { send } from "../interfaces/response.interface";
import { NextFunction, Response } from "express";

const tokenRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  const token = await verifyAccessToken(req.cookies.token);
  if ('error' in token) return send(res, 401, token.error);
  req.token = token;
  next();
}

export default tokenRequired;