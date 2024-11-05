import { UserHeadquarter } from "@/types/relation/engineer/userHeadquarter.type";
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
    ref: 'headquarter',
    required: true
  }
}, configSchema);

export default mongoose.model('user_headquarter', userHeadquarterSchema);