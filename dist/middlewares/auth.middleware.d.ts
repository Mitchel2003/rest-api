import { ExtendsRequest } from "../interfaces/api.interface";
import { NextFunction, Response } from "express";
declare const authRequired: (req: ExtendsRequest, res: Response, next: NextFunction) => Promise<void>;
export default authRequired;
