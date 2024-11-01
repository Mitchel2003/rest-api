import "module-alias/register"

import config from "@/utils/config";
import { mongoDB } from "@/db";
import app from "@/app";

mongoDB()
app.listen(config.port, () => console.log(`Server initialized on port ${config.port}`))