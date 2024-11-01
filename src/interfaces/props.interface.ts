import { JwtPayload } from "jsonwebtoken";

export interface CredentialsJWT extends JwtPayload { id?: string, error?: string }