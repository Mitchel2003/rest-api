import { ExtendsRequest } from "../interfaces/api.interface";
import { Response, NextFunction } from "express";
declare const references: (req: ExtendsRequest, res: Response, next: NextFunction) => Promise<void>;
export default references;
