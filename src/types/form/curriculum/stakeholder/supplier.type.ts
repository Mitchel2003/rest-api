import { Document } from "mongoose";

export interface Supplier extends Document {
  name: string;
  email: string;
  address: string;
  phone: string;
  nit: string;

  createdAt?: Date;
  updatedAt?: Date;
}