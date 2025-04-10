import { Document, Types } from "mongoose"

export interface Notification extends Document {
  //Information notification
  message: string
  isRead: boolean
  title: string
  type: string
  url: string
  //Relationship
  sender: Types.ObjectId
  recipient: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface NotificationProps {
  message: string
  title: string
  type: string
  url?: string
  //Relationship
  sender?: string
  recipient: string
}