import { SendResponse, SendError } from "mailtrap";
import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";

export type SchemaID = Schema.Types.ObjectId;

export interface UserReferencesProps {
  city?: SchemaID;
  state?: SchemaID;
  country?: SchemaID;
}

/*--------------- Interface to use in jwt.handle.ts ---------------*/
export interface CredentialsJWT extends JwtPayload {
  id?: SchemaID,
  error?: string
}

/*--------------- Interface to use in mailtrap.service.ts ---------------*/
export type MailtrapResult = (SendResponse & { success: true }) | (SendError & { success: false })

type Email = { email: string }
export interface EmailProps {
  to: Email[]
  html: string
  subject: string
  category: string
}