import { Document, Schema } from "mongoose"
import { Query } from "repository.type"

export interface UserHeadquarter extends Document {//relationship between user and headquarter
  user: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface UserHeadquarterService {
  createUserHeadquarter(cv: UserHeadquarter): Promise<UserHeadquarter>
  findUserHeadquarters(query?: Query): Promise<UserHeadquarter[]>
  findOneUserHeadquarter(query: Query): Promise<UserHeadquarter>
  findUserHeadquarterById(id: string): Promise<UserHeadquarter | null>
  updateUserHeadquarter(id: string, cv: Partial<UserHeadquarter>): Promise<UserHeadquarter | null>
  DeleteUserHeadquarter(id: string): Promise<boolean>
}