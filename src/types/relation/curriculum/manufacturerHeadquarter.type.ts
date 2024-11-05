import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface ManufacturerHeadquarter extends Document {//relationship between manufacturer and headquarter
  manufacturer: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface ManufacturerHeadquarterService {
  createManufacturerHeadquarter(manufacturerHeadquarter: ManufacturerHeadquarter): Promise<ManufacturerHeadquarter>
  findManufacturerHeadquarters(query?: Query): Promise<ManufacturerHeadquarter[]>
  findOneManufacturerHeadquarter(query: Query): Promise<ManufacturerHeadquarter | null>
  findManufacturerHeadquarterById(id: string): Promise<ManufacturerHeadquarter | null>
  updateManufacturerHeadquarter(id: string, manufacturerHeadquarter: Partial<ManufacturerHeadquarter>): Promise<ManufacturerHeadquarter | null>
  deleteManufacturerHeadquarter(id: string): Promise<boolean>
}