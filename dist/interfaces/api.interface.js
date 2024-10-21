"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
/*--------------- tools ---------------*/
const send = (res, status, data) => {
    const response = data;
    res.status(status).json(response);
};
exports.send = send;
//# sourceMappingURL=api.interface.js.map