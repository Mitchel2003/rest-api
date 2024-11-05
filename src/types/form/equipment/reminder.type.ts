import { Query } from "@/types/repository.type"
import { Document, Schema } from "mongoose"

export interface Reminder extends Document {
  date: Date;
  subject: string;
  message: string;
  equipment: Schema.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date
}

export interface ReminderService {
  createReminder(reminder: Reminder): Promise<Reminder>
  findReminders(query?: Query): Promise<Reminder[]>
  findOneReminder(query: Query): Promise<Reminder | null>
  findReminderById(id: string): Promise<Reminder | null>
  updateReminder(id: string, reminder: Partial<Reminder>): Promise<Reminder | null>
  deleteReminder(id: string): Promise<boolean>
}