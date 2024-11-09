import { Document, Schema } from "mongoose"

export interface Equipment extends Document {
  status: string;
  dateNextMaintenance: Date,
  dateLastMaintenance: Date,
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}