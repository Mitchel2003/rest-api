import Repository from "@/repositories/mongodb.repository";
import MongoDB from "@/services/mongodb/mongodb.service";
import { Doc, Query } from "@/types/repository.type";
import { Result } from "@/interfaces/api.interface";
import { PopulateOptions } from "mongoose";

import supplierHeadquarterModel from "@/models/relation/supplierHeadquarter.model";
import { SupplierHeadquarter } from "relation/supplierHeadquarter.type";

class SupplierHeadquarterService extends MongoDB<SupplierHeadquarter> {
  private static instance: SupplierHeadquarterService;
  private readonly defaultPopulate: PopulateOptions = {
    path: 'supplier',
    select: 'name phone city'
  }

  private constructor() {
    super(Repository.create(supplierHeadquarterModel));
  }

  public static getInstance(): SupplierHeadquarterService {
    if (!SupplierHeadquarterService.instance) SupplierHeadquarterService.instance = new SupplierHeadquarterService();
    return SupplierHeadquarterService.instance;
  }
  /** Busca un proveedor-sede por su id en la base de datos */
  async findById(id: string): Promise<Result<SupplierHeadquarter | null>> {
    return super.findById(id, this.defaultPopulate)
  }
  /** Busca proveedores-sedes por query en la base de datos */
  async find(query?: Query, populate?: PopulateOptions | (string | PopulateOptions)[]): Promise<Result<SupplierHeadquarter[]>> {
    return super.find(query, populate || this.defaultPopulate)
  }
  /** Crea un nuevo proveedor-sede en la base de datos */
  async create(data: SupplierHeadquarter): Promise<Result<SupplierHeadquarter>> {
    return super.create(data, this.defaultPopulate)
  }
  /** Actualiza un proveedor-sede por su id en la base de datos */
  async update(id: string, data: Partial<Doc<SupplierHeadquarter>>): Promise<Result<SupplierHeadquarter | null>> {
    return super.update(id, data, this.defaultPopulate)
  }
  /** Elimina un proveedor-sede por su id en la base de datos */
  async delete(id: string): Promise<Result<SupplierHeadquarter | null>> {
    return super.delete(id, this.defaultPopulate)
  }
}

export const supplierHeadquarterService = SupplierHeadquarterService.getInstance(); 