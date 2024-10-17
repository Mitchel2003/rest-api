import { CredentialsJWT, SchemaID, UserReferencesProps } from "./props.interface"
import { Request } from "express"

export interface ExtendsRequest extends Request {
  //... others from Request

  //auth
  token?: CredentialsJWT;
  user?: { id?: SchemaID };

  //userReferences
  userReferences?: UserReferencesProps;
}