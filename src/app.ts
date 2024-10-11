import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import "dotenv/config"

import authRoutes from "./routes/auth.routes"
import taskRoutes from "./routes/task.routes"
import equipRoutes from "./routes/equip.routes"

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', equipRoutes);//working here...

export default app;