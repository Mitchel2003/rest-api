import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface RepresentativeHeadquarter extends Document {//relationship between representative and headquarter
  representative: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface RepresentativeHeadquarterService {
  createRepresentativeHeadquarter(representativeHeadquarter: RepresentativeHeadquarter): Promise<RepresentativeHeadquarter>
  findRepresentativeHeadquarters(query?: Query): Promise<RepresentativeHeadquarter[]>
  findOneRepresentativeHeadquarter(query: Query): Promise<RepresentativeHeadquarter | null>
  findRepresentativeHeadquarterById(id: string): Promise<RepresentativeHeadquarter | null>
  updateRepresentativeHeadquarter(id: string, representativeHeadquarter: Partial<RepresentativeHeadquarter>): Promise<RepresentativeHeadquarter | null>
  deleteRepresentativeHeadquarter(id: string): Promise<boolean>
}