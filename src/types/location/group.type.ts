import { Document } from "mongoose"

export interface Group extends Document {
  name: string,
  services: string[],
  createdAt?: Date,
  updatedAt?: Date
}