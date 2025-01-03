import config from "@/utils/config"
import express from "express"
import cors from "cors"

//auth and health routes
import healthRoutes from "@/routes/auth/health.routes"
import authRoutes from "@/routes/auth/auth.routes"

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
import headquarterRoutes from "@/routes/location/headquarter.routes"
import areaRoutes from "@/routes/location/area.routes"

//config express
const origin = config.nodeEnv === 'production' ? config.depUrl : config.devUrl
const app = express();
app.use(cors({ origin, credentials: true }));
app.use(express.json());

/*--------------------------------------------------health and auth routes--------------------------------------------------*/
//to auto-refresh and uptime server
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------user routes--------------------------------------------------*/
//user routes
app.use('/api', userRoutes);
app.use('/api', clientRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------form routes--------------------------------------------------*/
//form curriculum routes
app.use('/api/form', curriculumRoutes);
app.use('/api/form/cv', inspectionRoutes);
app.use('/api/form/cv', stakeholderRoutes);

//form equipment routes
app.use('/api/form', equipmentRoutes);
app.use('/api/form', calibrationRoutes);
app.use('/api/form', reminderRoutes);

//form maintenance routes
app.use('/api/form', maintenanceRoutes);
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
app.use('/api/location', headquarterRoutes);
app.use('/api/location', areaRoutes);
/*---------------------------------------------------------------------------------------------------------*/

export default app;