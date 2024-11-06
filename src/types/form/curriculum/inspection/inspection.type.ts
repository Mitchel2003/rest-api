import { Document, Schema } from "mongoose"

export interface Inspection extends Document {
  presetInspection: Schema.Types.ObjectId,
  typeInspection: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}