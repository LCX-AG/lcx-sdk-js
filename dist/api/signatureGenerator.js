"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = generateSignature;
const crypto_js_1 = __importDefault(require("crypto-js"));
function generateSignature(method, endpoint, payload, secret) {
    const requestString = method + endpoint + JSON.stringify(payload);
    const hash = crypto_js_1.default.HmacSHA256(requestString, secret);
    return crypto_js_1.default.enc.Base64.stringify(hash);
}
