import { connectionDB } from "./db"
import env from "./utils/config"
import app from "./app"

connectionDB()
app.listen(process.env.PORT, () => console.log(`Server initialized`))