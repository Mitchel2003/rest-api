import { getFiles, uploadFiles, deleteFile } from "@/controllers/auth/storage.controller";
import authRequired from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get('/files', authRequired, getFiles);
router.post('/file', authRequired, uploadFiles);
router.delete('/file', authRequired, deleteFile);

export default router;