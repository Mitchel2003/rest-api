import { Document, Schema } from "mongoose"

export interface UserHeadquarter extends Document {//relationship between user and headquarter
  user: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}