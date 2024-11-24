import cookieParser from "cookie-parser"
import config from "@/utils/config"
import express from "express"
import cors from "cors"

//health routes
import healthRoutes from "@/routes/auth/health.routes"

//auth routes
import authRoutes from "@/routes/auth/auth.routes"
import verifyRoutes from "@/routes/auth/verify.routes"

//user routes
import userRoutes from "@/routes/user/user.routes"
import clientRoutes from "@/routes/user/client.routes"

//curriculum routes
import curriculumRoutes from "@/routes/form/curriculum/curriculum.routes"
import inspectionRoutes from "@/routes/form/curriculum/inspection.routes";
import stakeholderRoutes from "@/routes/form/curriculum/stakeholder.routes"

//equipment routes
import equipmentRoutes from "@/routes/form/equipment/equipment.routes"
import calibrationRoutes from "@/routes/form/equipment/calibration.routes"
import reminderRoutes from "@/routes/form/equipment/reminder.routes"

//maintenance routes
import maintenanceRoutes from "@/routes/form/maintenance/maintenance.routes"
import checkRoutes from "@/routes/form/maintenance/check.routes"

// relation routes
import curriculumRelationRoutes from "@/routes/relation/curriculum.routes";
import equipmentRelationRoutes from "@/routes/relation/equipment.routes";
import maintenanceRelationRoutes from "@/routes/relation/maintenance.routes";

//location routes
import countryRoutes from "@/routes/location/country.routes"
import stateRoutes from "@/routes/location/state.routes"
import cityRoutes from "@/routes/location/city.routes"

//config express
const app = express();
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

/*--------------------------------------------------health routes--------------------------------------------------*/
//to auto-refresh and uptime server
app.use('/api', healthRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------auth routes--------------------------------------------------*/
//auth routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', verifyRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------user routes--------------------------------------------------*/
//user routes
app.use('/api', userRoutes);
app.use('/api', clientRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------form routes--------------------------------------------------*/
//form curriculum routes
app.use('/api/form/cv', curriculumRoutes);
app.use('/api/form/cv/inspection', inspectionRoutes);
app.use('/api/form/cv/stakeholder', stakeholderRoutes);

//form equipment routes
app.use('/api/form/equipment', equipmentRoutes);
app.use('/api/form/equipment', calibrationRoutes);
app.use('/api/form/equipment', reminderRoutes);

//form maintenance routes
app.use('/api/form/maintenance', maintenanceRoutes);
app.use('/api/form/maintenance', checkRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------relation routes--------------------------------------------------*/
//relation routes (table relation)
app.use('/api/relation/cv', curriculumRelationRoutes);
app.use('/api/relation/equipment', equipmentRelationRoutes);
app.use('/api/relation/maintenance', maintenanceRelationRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------location routes--------------------------------------------------*/
//location routes
app.use('/api/location', countryRoutes);
app.use('/api/location', stateRoutes);
app.use('/api/location', cityRoutes);
/*---------------------------------------------------------------------------------------------------------*/

export default app;