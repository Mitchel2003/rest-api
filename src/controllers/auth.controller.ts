import { Request, Response } from "express";
import { Document } from "mongoose";

import { verifyAccessToken, generateAccessToken } from "../libs/jwt.handle";
import { Result, send } from "../interfaces/response.interface";
import ExtendsRequest from "../interfaces/request.interface";
import { encrypt, verified } from "../libs/bcrypt.handle";
import User from "../models/user.model";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await verifyCredentials(req);
    if ('error' in user) return send(res, 403, user.error)
    const token = await generateAccessToken({ id: user.value._id });
    setCookies(res, token);
    send(res, 200, user.value);
  } catch (e) { send(res, 500, `Error al intentar iniciar sesión: ${e}`) }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    await isAccountFound(req, res);
    const user = await createUserEncrypt(req);
    const token = await generateAccessToken({ id: user._id });
    setCookies(res, token);
    send(res, 200, user);
  } catch (e) { send(res, 500, `Error al intentar registrarse: ${e}`) }
};

export const logout = (req: Request, res: Response) => {
  if (!req.cookies.token) return res.sendStatus(200);
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req: ExtendsRequest, res: Response): Promise<void> => {
  const document = await User.findById(req.user?.id);
  if (!document) return send(res, 401, 'Usuario no encontrado');
  send(res, 200, document);
}

export const tokenCredentials = async ({ cookies }: Request, res: Response): Promise<void> => {
  const token = await verifyAccessToken(cookies.token);
  const userFound = await User.findById(token.id);
  if ('error' in token) return send(res, 401, token.error)
  if (!userFound) return send(res, 401, 'No autorizado')
  send(res, 200, userFound);
};
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
function setCookies(res: Response, token: string) {
  res.cookie('token', token, { // remove on production
    sameSite: 'none',
    httpOnly: false,
    secure: true
  });
}

async function verifyCredentials(req: Request): Promise<Result<Document>> {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  const isMatch = await verified(password, userFound?.password);
  if (!isMatch || !userFound) return { error: 'Credenciales inválidas' };
  return { value: userFound };
}

async function isAccountFound({ body }: Request, res: Response) {
  const userFound = await User.findOne({ email: body.email });
  if (userFound) return send(res, 403, 'Email en uso')
}

async function createUserEncrypt(req: Request) {
  const { username, email, password } = req.body;
  const passHash = await encrypt(password, 10);
  const user = new User({ username, email, password: passHash });
  return await user.save();
}
/*---------------------------------------------------------------------------------------------------------*/