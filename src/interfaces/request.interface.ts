import { CredentialsJWT } from "./props.interface";
import { Request } from "express";
import { Schema } from "mongoose";

interface ExtendsRequest extends Request { user?: UserSchema, token?: CredentialsJWT }
interface UserSchema { id?: Schema.Types.ObjectId }

export default ExtendsRequest
