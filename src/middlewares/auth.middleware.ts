import { authService as authFB } from "@/services/firebase/auth.service";
import { ExtendsRequest, send } from "@/interfaces/api.interface";
import { NextFunction, Response } from "express";
import { User } from "firebase/auth";

const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  authFB.observeAuth((user: User | null) => {
    if (!user) return send(res, 401, 'Unauthorized')
    req.user = mapAuth(user)
    next()
  })
}

const mapAuth = (fbUser: User) => ({
  id: fbUser.uid,
  email: fbUser.email || ''
})

export default authRequired