import { Document, Schema } from "mongoose"

export interface CheckMaintenance extends Document {//relationship between check and maintenance
  value: string,
  check: Schema.Types.ObjectId,
  maintenance: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}