import { userService } from '@/services/mongodb/user/user.service';
import ErrorAPI, { NotFound, Unauthorized } from '@/errors';
import { ExtendsRequest } from '@/interfaces/api.interface';
import { handlerResponse } from '@/errors/handler';
import { Response, NextFunction } from 'express';
import admin from 'firebase-admin';

/**
 * Middleware de autenticación que verifica tokens JWT de Firebase
 * Valida el token en cada solicitud y busca el usuario correspondiente en la base de datos
 * @param {ExtendsRequest} req - Objeto de solicitud Express extendido
 * @param {Response} res - Objeto de respuesta Express
 * @param {NextFunction} next - Función para continuar al siguiente middleware
 */
export const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;// Authorization header token
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null;
  if (!token) return handlerResponse(res, new Unauthorized({ message: 'Acceso denegado. Se requiere autenticación.' }), 'autenticar usuario')
  try {// Verify and decode token and check expiration (setHeader)
    const decodedToken = await admin.auth().verifyIdToken(token);
    const tokenExpirationTime = new Date(decodedToken.exp * 1000);
    const timeToExpire = (tokenExpirationTime.getTime() - new Date().getTime()) / 1000 / 60; // minutes
    if (timeToExpire < 5) res.setHeader('x-token-expiring-soon', 'true');
    // Find user in database by UID (decoded from token) set credentials
    const result = await userService.findOne({ uid: decodedToken.uid });
    if (!result.success) throw new ErrorAPI(result.error)//throw error
    if (!result.data) throw new NotFound({ message: 'usuario requerido' })
    req.user = result.data;
    next();
  } catch (e) { handlerResponse(res, e, 'autenticar usuario') }
}

export default authRequired