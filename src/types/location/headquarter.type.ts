import { Document, Schema } from "mongoose"
import { Query } from "repository.type"

export interface Headquarter extends Document {
  name: string,
  address: string,
  city: Schema.Types.ObjectId,
  client: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface HeadquarterService {
  createHeadquarter(cv: Headquarter): Promise<Headquarter>
  findHeadquarters(query?: Query): Promise<Headquarter[]>
  findOneHeadquarter(query: Query): Promise<Headquarter>
  findHeadquarterById(id: string): Promise<Headquarter | null>
  updateHeadquarter(id: string, cv: Partial<Headquarter>): Promise<Headquarter | null>
  DeleteHeadquarter(id: string): Promise<boolean>
}