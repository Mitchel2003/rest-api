import { Document } from "mongoose";

export interface Company extends Document {
  name: string,
  nit: string,
  invima: string,
  profesionalLicense: string,
  createdAt?: Date,
  updatedAt?: Date,
}