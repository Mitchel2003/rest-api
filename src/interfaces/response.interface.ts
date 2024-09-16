import { Response } from "express";

/*--------------------------------------------------Response--------------------------------------------------*/
export type SendFunction = <T>(
  res: Response,
  status: number,
  data: T
) => void;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const send: SendFunction = (res, status, data) => {
  const success = typeof data !== "string";
  const response: ApiResponse<typeof data> = { success, data };
  res.status(status).json(response);
};
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Result credentials--------------------------------------------------*/
export type Result<T> = { value: T } | { error: string } //type Either
/*---------------------------------------------------------------------------------------------------------*/