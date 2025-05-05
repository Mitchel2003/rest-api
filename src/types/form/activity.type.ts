import { Document, Schema } from "mongoose"

export interface Activity extends Document {
  dateAssignment: Date,
  status: string,

  collaborator: Schema.Types.ObjectId,
  solicit: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date,
}