import config from "@/utils/config"
import express from "express"
import cors from "cors"

//auth and health routes
import authRoutes from "@/routes/auth/auth.routes"
import healthRoutes from "@/routes/auth/health.routes"
import storageRoutes from "@/routes/auth/storage.routes"

//user routes
import userRoutes from "@/routes/user/user.routes"
import clientRoutes from "@/routes/user/client.routes"

//curriculum routes
import curriculumRoutes from "@/routes/form/curriculum/curriculum.routes"
import stakeholderRoutes from "@/routes/form/curriculum/stakeholder.routes"

//equipment routes
import equipmentRoutes from "@/routes/form/equipment/equipment.routes"
import calibrationRoutes from "@/routes/form/equipment/calibration.routes"
import reminderRoutes from "@/routes/form/equipment/reminder.routes"

//maintenance routes
import maintenanceRoutes from "@/routes/form/maintenance/maintenance.routes"

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
import officeRoutes from "@/routes/location/office.routes"
import serviceRoutes from "@/routes/location/service.routes"

//config express
const origin = config.nodeEnv === 'production' ? config.depUrl : config.devUrl
const app = express();
app.use(cors({ origin, credentials: true }));

// Aumentar el límite del tamaño del cuerpo de la solicitud a 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/*--------------------------------------------------health and auth routes--------------------------------------------------*/
//to auto-refresh and uptime server
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/storage', storageRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------user routes--------------------------------------------------*/
//user routes
app.use('/api', userRoutes);
app.use('/api', clientRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------form routes--------------------------------------------------*/
//form curriculum routes
app.use('/api/form', curriculumRoutes);
app.use('/api/form/cv', stakeholderRoutes);
app.use('/api/form/cv', curriculumRelationRoutes);

//form equipment routes
app.use('/api/form', equipmentRoutes);
app.use('/api/form/equipment', reminderRoutes);
app.use('/api/form/equipment', calibrationRoutes);
app.use('/api/form/equipment', equipmentRelationRoutes);

//form maintenance routes
app.use('/api/form', maintenanceRoutes);
app.use('/api/form/maintenance', maintenanceRelationRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------location routes--------------------------------------------------*/
//location routes
app.use('/api/location', countryRoutes);
app.use('/api/location', stateRoutes);
app.use('/api/location', cityRoutes);
app.use('/api/location', headquarterRoutes);
app.use('/api/location', areaRoutes);
app.use('/api/location', officeRoutes);
app.use('/api/location', serviceRoutes);
/*---------------------------------------------------------------------------------------------------------*/

export default app;