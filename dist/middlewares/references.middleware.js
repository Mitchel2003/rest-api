"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_interface_1 = require("../interfaces/api.interface");
const mongodb_service_1 = require("../services/mongodb.service");
const references = async (req, res, next) => {
    if (!req.user?.id)
        return (0, api_interface_1.send)(res, 401, 'No autorizado: user from cookie not defined');
    req.userReferences = await mongodb_service_1.userReferences.get(req.user.id);
    next();
};
exports.default = references;
//# sourceMappingURL=references.middleware.js.map