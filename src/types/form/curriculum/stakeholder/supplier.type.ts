import { Result } from "@/interfaces/api.interface";
import { Query } from "@/types/repository.type"
import { Document } from "mongoose";

export interface Supplier extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  nit: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface SupplierService {
  createSupplier(supplier: Supplier): Promise<Result<Supplier>>
  findSuppliers(query?: Query): Promise<Result<Supplier[]>>
  findOneSupplier(query: Query): Promise<Result<Supplier | null>>
  findSupplierById(id: string): Promise<Result<Supplier | null>>
  updateSupplier(id: string, Supplier: Partial<Supplier>): Promise<Result<Supplier | null>>
  deleteSupplier(id: string): Promise<Result<boolean>>
}