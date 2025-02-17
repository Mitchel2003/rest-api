import { Company } from "@/types/user/company.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const companySchema: Schema<Company> = new Schema({
  name: {
    type: String,
    required: true
  },
  nit: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  invima: {
    type: String,
    required: true,
    trim: true
  },
  profesionalLicense: {
    type: String,
    required: true,
    trim: true
  }
}, configSchema)

export default mongoose.model('company', companySchema)