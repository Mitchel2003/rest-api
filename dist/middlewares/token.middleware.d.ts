import { ExtendsRequest } from "../interfaces/api.interface";
import { NextFunction, Response } from "express";
declare const tokenRequired: (req: ExtendsRequest, res: Response, next: NextFunction) => Promise<void>;
export default tokenRequired;
