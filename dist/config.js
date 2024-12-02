"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const axios_1 = __importDefault(require("axios"));
class Configuration {
    constructor(options) {
        var _a, _b;
        this.apiKey = (_a = options.baseOptions) === null || _a === void 0 ? void 0 : _a.headers['API-KEY'];
        this.secretKey = (_b = options.baseOptions) === null || _b === void 0 ? void 0 : _b.headers['SECRET-KEY'];
        this.axiosInstance = axios_1.default.create({
            headers: {
                'x-access-key': this.apiKey,
                'x-access-sign': this.secretKey,
                'Content-Type': 'application/json',
            },
        });
    }
}
exports.Configuration = Configuration;
