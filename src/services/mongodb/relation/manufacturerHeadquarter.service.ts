import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Doc, Query } from "@/types/repository.type";
import { Result } from "@/interfaces/api.interface";
import { PopulateOptions } from "mongoose";

import manufacturerHeadquarterModel from "@/models/relation/manufacturerHeadquarter.model";
import { ManufacturerHeadquarter } from "relation/manufacturerHeadquarter.type";

class ManufacturerHeadquarterService extends MongoDB<ManufacturerHeadquarter> {
  private static instance: ManufacturerHeadquarterService;
  private readonly defaultPopulate: PopulateOptions = {
    path: 'manufacturer',
    select: 'name phone country'
  }

  private constructor() { super(Repository.create(manufacturerHeadquarterModel)) }

  public static getInstance(): ManufacturerHeadquarterService {
    if (!ManufacturerHeadquarterService.instance) ManufacturerHeadquarterService.instance = new ManufacturerHeadquarterService();
    return ManufacturerHeadquarterService.instance;
  }
  /** Busca un fabricante-sede por su id en la base de datos */
  async findById(id: string): Promise<Result<ManufacturerHeadquarter | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca fabricantes-sedes por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<ManufacturerHeadquarter[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Crea un nuevo fabricante-sede en la base de datos */
  async create(data: ManufacturerHeadquarter): Promise<Result<ManufacturerHeadquarter>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un fabricante-sede por su id en la base de datos */
  async update(id: string, data: Partial<Doc<ManufacturerHeadquarter>>): Promise<Result<ManufacturerHeadquarter | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un fabricante-sede por su id en la base de datos */
  async delete(id: string): Promise<Result<ManufacturerHeadquarter | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const manufacturerHeadquarterService = ManufacturerHeadquarterService.getInstance(); 