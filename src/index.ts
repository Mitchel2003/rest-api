import "module-alias/register"

import config from "@/utils/config";
import { mongoDB } from "@/db";
import app from "@/app";

mongoDB()
//healthRoute
app.get('/api/health', (req, res) => { res.status(200).send('OK') })

app.listen(config.port, () => console.log(`Server initialized on port ${config.port}`))
