import { JwtPayload } from "jsonwebtoken";
import { SchemaID } from "./db.interface";

export interface CredentialsJWT extends JwtPayload { id?: SchemaID, error?: string }