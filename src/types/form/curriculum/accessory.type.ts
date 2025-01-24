import { Document, Schema } from "mongoose"

export interface Accessory extends Document {
  name: string,
  type: string,
  serie: string,
  modelEquip: string,
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}