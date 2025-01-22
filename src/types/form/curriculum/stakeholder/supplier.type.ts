import { Document } from "mongoose";

export interface Supplier extends Document {
  name: string;
  phone: string;
  city: string;

  createdAt?: Date;
  updatedAt?: Date;
}