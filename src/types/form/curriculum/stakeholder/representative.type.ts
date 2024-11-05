import { Result } from "@/interfaces/api.interface";
import { Query } from "@/types/repository.type"
import { Document } from "mongoose";

export interface Representative extends Document {
  name: string;
  city: string;
  phone: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface RepresentativeService {
  createRepresentative(representative: Representative): Promise<Result<Representative>>
  findRepresentatives(query?: Query): Promise<Result<Representative[]>>
  findOneRepresentative(query: Query): Promise<Result<Representative | null>>
  findRepresentativeById(id: string): Promise<Result<Representative | null>>
  updateRepresentative(id: string, Representative: Partial<Representative>): Promise<Result<Representative | null>>
  deleteRepresentative(id: string): Promise<Result<boolean>>
}