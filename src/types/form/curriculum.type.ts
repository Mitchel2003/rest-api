import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose";

export interface Curriculum extends Document {
  title: string,
  description: string,
  date: Date,
  user: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface CurriculumService {
  createCurriculum(cv: Curriculum): Promise<Curriculum>
  findCurriculums(query?: Query): Promise<Curriculum[]>
  findOneCurriculum(query: Query): Promise<Curriculum>
  findCurriculumById(id: string): Promise<Curriculum | null>
  updateCurriculum(id: string, cv: Partial<Curriculum>): Promise<Curriculum | null>
  DeleteCurriculum(id: string): Promise<boolean>
}