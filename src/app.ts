import cookieParser from "cookie-parser"
import config from "./utils/config"
import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes"
import taskRoutes from "./routes/task.routes"
import clientRoutes from "./routes/client.routes"
import locationRoutes from "./routes/location.routes"
import curriculumRoutes from "./routes/curriculum.routes"

const app = express();
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', clientRoutes);
app.use('/api', curriculumRoutes);
app.use('/api/location', locationRoutes);

//remove proximamente
app.use('/api', taskRoutes);

export default app;