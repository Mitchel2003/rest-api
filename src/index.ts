import config from "./utils/config";
import connectionDB from "./db";
import app from "./app";

connectionDB()
app.listen(config.port, () => console.log(`Server initialized on port ${config.port}`))