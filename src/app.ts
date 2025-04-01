import config from "@/utils/config"
import express from "express"
import cors from "cors"

//user routes
import userRoutes from "@/routes/user/user.routes"

//auth and health routes
import authRoutes from "@/routes/auth/auth.routes"
import healthRoutes from "@/routes/auth/health.routes"
import storageRoutes from "@/routes/auth/storage.routes"

//form routes
import curriculumRoutes from "@/routes/form/curriculum/curriculum.routes"
import stakeholderRoutes from "@/routes/form/curriculum/stakeholder.routes"
import maintenanceRoutes from "@/routes/form/maintenance/maintenance.routes"
import solicitRoutes from "@/routes/form/solicit/solicit.routes"

//relation routes
import curriculumRelationRoutes from "@/routes/relation/curriculum.routes";
import maintenanceRelationRoutes from "@/routes/relation/maintenance.routes";

//location routes
import countryRoutes from "@/routes/location/country.routes"
import stateRoutes from "@/routes/location/state.routes"
import cityRoutes from "@/routes/location/city.routes"
import officeRoutes from "@/routes/location/office.routes"
import headquarterRoutes from "@/routes/location/headquarter.routes"

//config express
const origin = config.nodeEnv === 'production' ? config.depUrl : config.devUrl
const app = express();
app.use(cors({ origin, credentials: true }));
app.use(express.json({ limit: '10mb' })); //to allow large files
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/*--------------------------------------------------health and auth routes--------------------------------------------------*/
//to auto-refresh and uptime server
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api', userRoutes);//user routes
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------form routes--------------------------------------------------*/
//form curriculum routes
app.use('/api/form', curriculumRoutes);
app.use('/api/form/cv', stakeholderRoutes);
app.use('/api/form/cv', curriculumRelationRoutes);

//form maintenance routes
app.use('/api/form', maintenanceRoutes);
app.use('/api/form/maintenance', maintenanceRelationRoutes);

//form solicit routes
app.use('/api/form', solicitRoutes);
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------location routes--------------------------------------------------*/
//location routes
app.use('/api/location', countryRoutes);
app.use('/api/location', stateRoutes);
app.use('/api/location', cityRoutes);
app.use('/api/location', officeRoutes);
app.use('/api/location', headquarterRoutes);
/*---------------------------------------------------------------------------------------------------------*/

export default app;