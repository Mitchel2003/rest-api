"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_schema_1 = require("../schemas/location.schema");
const references_middleware_1 = __importDefault(require("../middlewares/references.middleware"));
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const express_1 = require("express");
const location_controller_1 = require("../controllers/location.controller");
const router = (0, express_1.Router)();
//city
router.post('/city', auth_middleware_1.default, references_middleware_1.default, (0, validator_middleware_1.default)(location_schema_1.citySchema), location_controller_1.createCity);
//state
router.post('/state', auth_middleware_1.default, references_middleware_1.default, (0, validator_middleware_1.default)(location_schema_1.stateSchema), location_controller_1.createState); //working here...
//country
router.post('/country', auth_middleware_1.default, (0, validator_middleware_1.default)(location_schema_1.countrySchema), location_controller_1.createCountry);
router.get('/country/:id', auth_middleware_1.default, location_controller_1.getCountry);
router.get('/countries', auth_middleware_1.default, location_controller_1.getCountries);
router.put('/country/:id', auth_middleware_1.default, location_controller_1.updateCountry);
router.delete('/country/:id', auth_middleware_1.default, location_controller_1.deleteCountry);
exports.default = router;
//# sourceMappingURL=location.routes.js.map