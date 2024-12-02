"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrls = void 0;
const enums_1 = require("../enums");
exports.baseUrls = {
    [enums_1.LcxEnvironments.production]: {
        exchangeUrl: 'https://exchange-api.lcx.com',
        klineUrl: 'https://api-kline-staging.lcx.com',
        wsUrl: 'wss://exchange-api.lcx.com',
    },
};
