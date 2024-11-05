import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface Area extends Document {
  name: string,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface AreaService {
  createArea(area: Area): Promise<Area>
  findAreas(query?: Query): Promise<Area[]>
  findOneArea(query: Query): Promise<Area | null>
  findAreaById(id: string): Promise<Area | null>
  updateArea(id: string, cv: Partial<Area>): Promise<Area | null>
  deleteArea(id: string): Promise<boolean>
}