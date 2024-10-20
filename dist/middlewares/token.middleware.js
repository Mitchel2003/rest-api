"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_interface_1 = require("../interfaces/api.interface");
const jwt_service_1 = require("../services/jwt.service");
const tokenRequired = async (req, res, next) => {
    const token = await (0, jwt_service_1.verifyAccessToken)(req.cookies.token);
    if ('error' in token)
        return (0, api_interface_1.send)(res, 401, token.error);
    req.token = token;
    next();
};
exports.default = tokenRequired;
//# sourceMappingURL=token.middleware.js.map