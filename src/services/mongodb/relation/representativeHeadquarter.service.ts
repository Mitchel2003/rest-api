import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Doc, Query } from "@/types/repository.type";
import { Result } from "@/interfaces/api.interface";
import { PopulateOptions } from "mongoose";

import representativeHeadquarterModel from "@/models/relation/representativeHeadquarter.model";
import { RepresentativeHeadquarter } from "relation/representativeHeadquarter.type";

class RepresentativeHeadquarterService extends MongoDB<RepresentativeHeadquarter> {
  private static instance: RepresentativeHeadquarterService;
  private readonly defaultPopulate: PopulateOptions = {
    path: 'representative',
    select: 'name phone city'
  }

  private constructor() { super(Repository.create(representativeHeadquarterModel)) }

  public static getInstance(): RepresentativeHeadquarterService {
    if (!RepresentativeHeadquarterService.instance) RepresentativeHeadquarterService.instance = new RepresentativeHeadquarterService();
    return RepresentativeHeadquarterService.instance;
  }
  /** Busca un representante-sede por su id en la base de datos */
  async findById(id: string): Promise<Result<RepresentativeHeadquarter | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca representantes-sedes por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<RepresentativeHeadquarter[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Crea un nuevo representante-sede en la base de datos */
  async create(data: RepresentativeHeadquarter): Promise<Result<RepresentativeHeadquarter>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un representante-sede por su id en la base de datos */
  async update(id: string, data: Partial<Doc<RepresentativeHeadquarter>>): Promise<Result<RepresentativeHeadquarter | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un representante-sede por su id en la base de datos */
  async delete(id: string): Promise<Result<RepresentativeHeadquarter | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const representativeHeadquarterService = RepresentativeHeadquarterService.getInstance(); 