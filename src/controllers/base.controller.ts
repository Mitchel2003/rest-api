import { MongoDBService as MongoDB } from "@/services/mongodb/mongodb.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { handlerResponse } from "@/errors/handler";
import ErrorAPI, { NotFound } from "@/errors";

import { Request, Response } from "express";

export abstract class BaseController<T> {
  protected constructor(private readonly service: MongoDB<T>) { }

  /** Obtener todos los registros */
  getAll = async (req: ExtendsRequest, res: Response): Promise<void> => {
    try {
      const result = await this.service.find();
      if (!result.success) throw new ErrorAPI(result.error);
      send(res, 200, { data: result.data, users: req.user?.id });
    } catch (e) { handlerResponse(res, e, "obtener") }
  }

  /** Obtener un registro por su id */
  getById = async ({ params }: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.findById(params.id);
      if (!result.success) throw new ErrorAPI(result.error);
      if (!result.data) throw new NotFound({ message: "No encontrado" });
      send(res, 200, result.data);
    } catch (e) { handlerResponse(res, e, "obtener por id") }
  }
} 