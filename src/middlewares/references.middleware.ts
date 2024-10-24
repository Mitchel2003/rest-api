import { ExtendsRequest, send } from "../interfaces/api.interface";
import { userReferences } from "../services/mongodb.service";
import { Response, NextFunction } from "express";

const references = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  if (!req.user?.id) return send(res, 401, 'No autorizado: user from cookie not defined')
  req.userReferences = await userReferences.get(req.user.id)

  send(res, 200, req.userReferences)
  next()
}

export default references