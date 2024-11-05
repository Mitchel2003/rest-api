import { Query } from "@/types/repository.type"
import { Document } from "mongoose"

export interface TypeInspection extends Document {
  nameType: string,
  inactive: Boolean,
  createdAt?: Date,
  updatedAt?: Date
}

export interface TypeInspectionService {
  createTypeInspection(typeInspection: TypeInspection): Promise<TypeInspection>
  findTypeInspections(query?: Query): Promise<TypeInspection[]>
  findOneTypeInspection(query: Query): Promise<TypeInspection | null>
  findTypeInspectionById(id: string): Promise<TypeInspection | null>
  updateTypeInspection(id: string, typeInspection: Partial<TypeInspection>): Promise<TypeInspection | null>
  deleteTypeInspection(id: string): Promise<boolean>
}