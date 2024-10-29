import "module-alias/register"

import { connectDB } from "@/utils/mongodb";
import config from "@/utils/config";
import app from "@/app";

connectDB()
app.listen(config.port, () => console.log(`Server initialized on port ${config.port}`))