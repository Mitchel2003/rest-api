import { Notification } from "@/types/auth/notification.type";
import mongoose, { Schema } from 'mongoose';
import configSchema from "@/utils/schema";

const notificationSchema: Schema<Notification> = new Schema({
  type: { type: String, default: 'default', enum: ['info', 'alert', 'payment', 'success', 'offer', 'document', 'reminder', 'completed', 'default'] },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  url: { type: String, default: '' },

  sender: { //User who sends/generates the notification (optional)
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'user'
  },
  recipient: { //User who receives the notification
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'user'
  }
}, configSchema)

notificationSchema.index({ isRead: 1 })
notificationSchema.index({ recipient: 1, createdAt: -1 })

export default mongoose.model('notification', notificationSchema);