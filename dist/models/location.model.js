"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = exports.State = exports.City = void 0;
const mongoose_1 = __importStar(require("mongoose"));
/*--------------------------------------------------city--------------------------------------------------*/
const citySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'state',
        required: true
    }
}, { timestamps: true, versionKey: false });
exports.City = mongoose_1.default.model('city', citySchema);
/*---------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------state--------------------------------------------------*/
const stateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'country'
    }
}, { timestamps: true, versionKey: false });
exports.State = mongoose_1.default.model('state', stateSchema);
/*---------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------country--------------------------------------------------*/
const countrySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false });
exports.Country = mongoose_1.default.model('country', countrySchema);
/*---------------------------------------------------------------------------------------------------------*/ 
//# sourceMappingURL=location.model.js.map