import { Document, Schema } from "mongoose"

export interface ServiceOffice extends Document {//relationship between service and office
  service: Schema.Types.ObjectId,
  office: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}