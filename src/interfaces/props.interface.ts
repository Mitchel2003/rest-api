import { SendResponse, SendError } from "mailtrap";
import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import { Request } from "express"
import { Schema } from "mongoose";

/*--------------- schemas ---------------*/
export type SchemaID = Schema.Types.ObjectId;
export interface UserReferencesProps {
  city?: SchemaID;
  state?: SchemaID;
  country?: SchemaID;
}

/*--------------- mailtrap.service.ts ---------------*/
export type MailtrapResult = (SendResponse & { success: true }) | (SendError & { success: false })

type Email = { email: string }
export interface EmailProps {
  to: Email[]
  html: string
  subject: string
  category: string
}

/*--------------- jwt.service.ts ---------------*/
export interface CredentialsJWT extends JwtPayload {
  id?: SchemaID,
  error?: string
}