import { Document, Schema } from "mongoose"

export interface InspectionHeadquarter extends Document {//relationship between inspection, headquarter and curriculum
  inspection: Schema.Types.ObjectId,
  headquarter: Schema.Types.ObjectId,
  curriculum: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}