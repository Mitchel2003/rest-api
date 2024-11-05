import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface SupplierHeadquarter extends Document {//relationship between supplier and headquarter
  supplier: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface SupplierHeadquarterService {
  createSupplierHeadquarter(supplierHeadquarter: SupplierHeadquarter): Promise<SupplierHeadquarter>
  findSupplierHeadquarters(query?: Query): Promise<SupplierHeadquarter[]>
  findOneSupplierHeadquarter(query: Query): Promise<SupplierHeadquarter | null>
  findSupplierHeadquarterById(id: string): Promise<SupplierHeadquarter | null>
  updateSupplierHeadquarter(id: string, supplierHeadquarter: Partial<SupplierHeadquarter>): Promise<SupplierHeadquarter | null>
  deleteSupplierHeadquarter(id: string): Promise<boolean>
}