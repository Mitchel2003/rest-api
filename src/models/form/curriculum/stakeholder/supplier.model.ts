import { Supplier } from "@/types/form/curriculum/stakeholder/supplier.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const supplierSchema: Schema<Supplier> = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  nit: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, configSchema)

export default mongoose.model('supplier', supplierSchema)