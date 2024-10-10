import validateSchema from "../middlewares/validator.middleware";
import authRequired from "../middlewares/auth.middleware";
import { createTaskSchema } from "../schemas/task.schema";
import { Router } from "express";

import { getTask, getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller";

const router = Router();

router.post('/task', authRequired, validateSchema(createTaskSchema), createTask)
router.get('/task/:id', authRequired, getTask)
router.get('/tasks', authRequired, getTasks)
router.put('/task/:id', authRequired, updateTask)
router.delete('/task/:id', authRequired, deleteTask)

export default router;