"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_interface_1 = require("../interfaces/api.interface");
const jwt_service_1 = require("../services/jwt.service");
const authRequired = async (req, res, next) => {
    const access = await (0, jwt_service_1.verifyAccessToken)(req.cookies.token);
    if ('error' in access)
        return (0, api_interface_1.send)(res, 401, access.error);
    req.user = access;
    next();
};
exports.default = authRequired;
//# sourceMappingURL=auth.middleware.js.map