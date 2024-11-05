import { Result } from "@/interfaces/api.interface";
import { Query } from "@/types/repository.type"
import { Document } from "mongoose";

export interface Manufacturer extends Document {
  name: string;
  city: string;
  phone: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ManufacturerService {
  createManufacturer(Manufacturer: Manufacturer): Promise<Result<Manufacturer>>
  findManufacturers(query?: Query): Promise<Result<Manufacturer[]>>
  findOneManufacturer(query: Query): Promise<Result<Manufacturer | null>>
  findManufacturerById(id: string): Promise<Result<Manufacturer | null>>
  updateManufacturer(id: string, Manufacturer: Partial<Manufacturer>): Promise<Result<Manufacturer | null>>
  deleteManufacturer(id: string): Promise<Result<boolean>>
}