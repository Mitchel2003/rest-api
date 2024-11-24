import "module-alias/register"

import config from "@/utils/config";
import { mongoDB } from "@/db"
import {Request, Response} from "express"
import app from "@/app";

mongoDB()
//healthRoute
app.get('/api/health', (req: Request, res: Response) => { !req.params.new ?? console.log("anywhere"); res.status(200).send('OK') })

app.listen(config.port, () => console.log(`Server initialized on port ${config.port}`))
