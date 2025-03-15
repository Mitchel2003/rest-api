import { userService } from '@/services/mongodb/user/user.service';
import { authService } from '@/services/firebase/auth.service';
// import { redisService } from '@/services/cache/redis.service';
import { ExtendsRequest } from '@/interfaces/api.interface';

import { handlerResponse } from '@/errors/handler';
import ErrorAPI, { Unauthorized } from '@/errors';
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
    const credentials = auth.currentUser;
    if (!credentials?.uid) throw new Unauthorized({ message: 'Credenciales de usuario inválidas' })

    // Try to get user from cache (if exists)
    // const cachedUser = await redisService.getUserData(credentials.uid);
    // if (cachedUser.success && cachedUser.data) { req.user = cachedUser.data as User; return next() }

    // If not in cache, search in database
    const userResult = await userService.findByUid(credentials.uid);
    if (!userResult.success || !userResult.data) throw new ErrorAPI({ message: 'Usuario no encontrado', statusCode: 404 });
    // await redisService.setUserData(credentials.uid, userResult.data);// Save in cache for future requests
    req.user = userResult.data as User;
    next();
  } catch (e) { handlerResponse(res, e, "autenticación") }
}

export default authRequired