import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";

//interface to use in jwt.handle.ts
export interface CredentialsJWT extends JwtPayload { id?: Schema.Types.ObjectId, error?: string }