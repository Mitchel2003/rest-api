import config from "@/utils/config"
import express from "express"
import cors from "cors"

//health and user routes
import userRoutes from "@/routes/user/user.routes"
import authRoutes from "@/routes/auth/auth.routes"
import healthRoutes from "@/routes/auth/health.routes"
import notificationRoutes from "@/routes/auth/notification.routes"

//form routes
import solicitRoutes from "@/routes/form/solicit.routes"
import activityRoutes from "@/routes/form/activity.routes"
import scheduleRoutes from "@/routes/form/schedule.routes"
import maintenanceRoutes from "@/routes/form/maintenance.routes"
import curriculumRoutes from "@/routes/form/curriculum/curriculum.routes"
import stakeholderRoutes from "@/routes/form/curriculum/stakeholder.routes"

//relation routes
import curriculumRelationRoutes from "@/routes/relation/curriculum.routes"

//location routes
import countryRoutes from "@/routes/location/country.routes"
import stateRoutes from "@/routes/location/state.routes"
import cityRoutes from "@/routes/location/city.routes"
import officeRoutes from "@/routes/location/office.routes"
import signatureRoutes from "@/routes/location/signature.routes"
import headquarterRoutes from "@/routes/location/headquarter.routes"

//config express
const app = express();
const origin = config.nodeEnv === 'production' ? config.depUrl : config.devUrl;
app.use(cors({ origin, credentials: true }));
app.use(express.json()); //allow read json
/*--------------------------------------------------auth and user routes--------------------------------------------------*/
//auth and user routes (messaging and health)
app.use('/api', userRoutes);
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth/notifications', notificationRoutes);
/*--------------------------------------------------form routes--------------------------------------------------*/
//form curriculum routes
app.use('/api/form', solicitRoutes);
app.use('/api/form', activityRoutes);
app.use('/api/form', scheduleRoutes);
app.use('/api/form', curriculumRoutes);
app.use('/api/form/cv', stakeholderRoutes);
app.use('/api/form/cv', curriculumRelationRoutes);

//form maintenance routes
app.use('/api/form', maintenanceRoutes);
/*--------------------------------------------------location routes--------------------------------------------------*/
//location routes
app.use('/api/location', countryRoutes);
app.use('/api/location', stateRoutes);
app.use('/api/location', cityRoutes);
app.use('/api/location', officeRoutes);
app.use('/api/location', signatureRoutes);
app.use('/api/location', headquarterRoutes);
/*---------------------------------------------------------------------------------------------------------*/
export default app;