import cookieParser from "cookie-parser"
import config from "@/utils/config"
import express from "express"
import cors from "cors"

//auth routes
import authRoutes from "@/routes/auth/auth.routes"
import verifyRoutes from "@/routes/auth/verify.routes"
import resetPasswordRoutes from "@/routes/auth/resetPassword.routes"

//user routes
import userRoutes from "@/routes/user/user.routes"
import clientRoutes from "@/routes/user/client.routes"

//form routes
import curriculumRoutes from "@/routes/form/curriculum/curriculum.routes"

//location routes
import countryRoutes from "@/routes/location/country.routes"
import stateRoutes from "@/routes/location/state.routes"
import cityRoutes from "@/routes/location/city.routes"


//config express
const app = express();
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

//auth routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', verifyRoutes);
app.use('/api/auth', resetPasswordRoutes);

//user routes
app.use('/api', userRoutes);
app.use('/api', clientRoutes);

//form routes
app.use('/api/form', curriculumRoutes);

//location routes
app.use('/api/location', countryRoutes);
app.use('/api/location', stateRoutes);
app.use('/api/location', cityRoutes);

export default app;