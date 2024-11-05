import { Query } from "@/types/repository.type"
import { Document } from "mongoose"

export interface Check extends Document {
  name: string;
  inactive: boolean;
  createdAt?: Date,
  updatedAt?: Date
}

export interface CheckService {
  createCheck(check: Check): Promise<Check>
  findChecks(query?: Query): Promise<Check[]>
  findOneCheck(query: Query): Promise<Check | null>
  findCheckById(id: string): Promise<Check | null>
  updateCheck(id: string, check: Partial<Check>): Promise<Check | null>
  deleteCheck(id: string): Promise<boolean>
}