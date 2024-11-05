import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface UserHeadquarter extends Document {//relationship between user and headquarter
  user: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface UserHeadquarterService {
  createUserHeadquarter(cv: UserHeadquarter): Promise<UserHeadquarter>
  findUserHeadquarters(query?: Query): Promise<UserHeadquarter[]>
  findOneUserHeadquarter(query: Query): Promise<UserHeadquarter | null>
  findUserHeadquarterById(id: string): Promise<UserHeadquarter | null>
  updateUserHeadquarter(id: string, userHeadquarter: Partial<UserHeadquarter>): Promise<UserHeadquarter | null>
  deleteUserHeadquarter(id: string): Promise<boolean>
}