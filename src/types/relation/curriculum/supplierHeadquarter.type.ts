import { Document, Schema } from "mongoose"

export interface SupplierHeadquarter extends Document {//relationship between supplier and headquarter
  supplier: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}