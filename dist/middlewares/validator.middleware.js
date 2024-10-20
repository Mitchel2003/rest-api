"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (e) {
        if (e instanceof zod_1.ZodError)
            return res.status(400).json(e.errors.map(error => error.message));
    }
};
exports.default = validateSchema;
//# sourceMappingURL=validator.middleware.js.map