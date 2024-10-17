import { ExtendsRequest } from "../interfaces/request.interface";
import { userReferences } from "../services/mongodb.service";
import { send } from "../interfaces/response.interface";
import { Response, NextFunction } from "express";

const references = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  if (!req.user?.id) return send(res, 401, 'No autorizado: user from cookie not defined')
  req.userReferences = await userReferences.get(req.user.id)
  next()
}

export default references