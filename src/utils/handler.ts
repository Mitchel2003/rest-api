import { send } from "../interfaces/api.interface";
import { MongooseError } from "mongoose";
import { Response } from "express";

/*--------------------------------------------------errors response--------------------------------------------------*/
export const isMongooseError = (e: unknown, res: Response) => {
  if (e instanceof MongooseError) return send(res, 500, `Error mongoose: ${e.name}: ${e.message}`)
}
/*---------------------------------------------------------------------------------------------------------*/