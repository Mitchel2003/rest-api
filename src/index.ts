import "ts-node/register"
import { connectionDB } from "./db";
import app from "./app";

connectionDB()
app.listen(process.env.PORT, () => console.log(`Server initialized`));