import { Document } from "mongoose";

export interface Supplier extends Document {
  name: string;
  email: string;
  phone: string;
  nit: string;

  createdAt?: Date;
  updatedAt?: Date;
}