import { UserHeadquarter } from "@/types/relation/userHeadquarter.type";
import configSchema from "@/utils/schema";
import mongoose, { Schema } from "mongoose";

const userHeadquarterSchema: Schema<UserHeadquarter> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  headquarter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'headquarter'
  }
}, configSchema);

export default mongoose.model('user_headquarter', userHeadquarterSchema);