import { SupplierHeadquarter } from "@/types/relation/curriculum/supplierHeadquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const supplierHeadquarterSchema: Schema<SupplierHeadquarter> = new Schema({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'supplier',
    required: true
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    ref: 'headquarter',
    required: true
  }
}, configSchema);

export default mongoose.model('supplier_headquarter', supplierHeadquarterSchema);