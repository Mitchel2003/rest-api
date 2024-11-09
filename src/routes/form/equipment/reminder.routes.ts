import reminderSchema from "@/schemas/form/equipment/reminder.schema";
import validateSchema from "@/middlewares/validator.middleware";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

import { createReminder, getReminders, getReminder, updateReminder, deleteReminder } from "@/controllers/form/equipment/reminder.controller";

const router = Router();

//reminder routes (equipment/reminder)
router.post('/reminder', authRequired, validateSchema(reminderSchema), createReminder);
router.get('/reminders', authRequired, getReminders);
router.get('/reminder/:id', authRequired, getReminder);
router.put('/reminder/:id', authRequired, updateReminder);
router.delete('/reminder/:id', authRequired, deleteReminder);

export default router;