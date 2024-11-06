import { Document, Schema } from "mongoose"

export interface Equipment extends Document {
  status: string;
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}