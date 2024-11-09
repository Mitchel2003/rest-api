import reminderModel from "@/models/form/equipment/reminder.model";
import { Reminder } from "@/types/form/equipment/reminder.type";
import MongoDBService from "@/services/mongodb/mongodb.service";
import Repository from "@/repositories/mongodb.repository";

class ReminderService extends MongoDBService<Reminder> {
  private static instance: ReminderService;

  private constructor() {
    super(Repository.create(reminderModel));
  }

  public static getInstance(): ReminderService {
    if (!ReminderService.instance) {
      ReminderService.instance = new ReminderService();
    }
    return ReminderService.instance;
  }
}

export const reminderService = ReminderService.getInstance(); 