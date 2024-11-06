import { Document, Schema } from "mongoose"

export interface RepresentativeHeadquarter extends Document {//relationship between representative and headquarter
  representative: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}