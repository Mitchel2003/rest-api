import { userService } from '@/services/mongodb/user/user.service';
import { authService } from '@/services/firebase/auth.service';
import { ExtendsRequest } from '@/interfaces/api.interface';

import { handlerResponse } from '@/errors/handler';
import { Unauthorized, NotFound } from '@/errors';
import { Response, NextFunction } from 'express';
import { User } from '@/types/user/user.type';

/**
 * Middleware to authenticate the user.
 * Integrates Firebase authentication with MongoDB database.
 * Implements a caching system to improve performance.
 * @param {ExtendsRequest} req - Express request object with authentication information.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>} - Resolves when the middleware has completed execution.
 */
export const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const auth = authService.getAuth();
    if (!auth.currentUser) {// If no current user, try to get it from authentication state
      const sessionUser = await new Promise<User | null>((resolve) => { const unsubscribe = auth.onAuthStateChanged(user => { unsubscribe(); resolve(user as User | null) }) })
      if (!sessionUser) throw new Unauthorized({ message: 'Usuario no autenticado, por favor inicia sesión' })
    }
    const userFound = await userService.findOne({ uid: auth.currentUser?.uid as string });
    if (!userFound.success) throw new NotFound({ message: 'Usuario no encontrado' });
    req.user = userFound.data as User;
    next();
  } catch (e) { handlerResponse(res, e, "autenticación") }
}

export default authRequired