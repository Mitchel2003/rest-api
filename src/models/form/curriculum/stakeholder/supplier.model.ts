import { Supplier } from "@/types/form/curriculum/stakeholder/supplier.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const supplierSchema: Schema<Supplier> = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    default: 'n/r',
    trim: true
  },
  city: {
    type: String,
    required: true,
    default: 'n/r',
    trim: true
  }
}, configSchema)

export default mongoose.model('supplier', supplierSchema)