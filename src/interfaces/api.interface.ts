import { CredentialsJWT, SchemaID, UserReferencesProps } from "./props.interface"
import { Response } from "express"
import { Request } from "express"

/*--------------- request ---------------*/
export interface ExtendsRequest extends Request {
  //auth
  token?: CredentialsJWT;
  user?: { id?: SchemaID };

  //userReferences
  userReferences?: UserReferencesProps;
}

/*--------------- response ---------------*/
export type Error = string
export type ApiResponse<T> = T | Error
export type ResponseProps = <T>(
  res: Response,
  status: number,
  data: T
) => void

/*--------------- tools ---------------*/
export const send: ResponseProps = (res, status, data) => {
  const response: ApiResponse<typeof data> = data;
  res.status(status).json(response);
}

export type Result<T> = { value: T } | { error: Error } //type Either