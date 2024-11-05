import { Document } from "mongoose";

export interface Client extends Document {
  name: string,
  email: string,
  phone: number,
  nit: string,
  createdAt?: Date,
  updatedAt?: Date
}