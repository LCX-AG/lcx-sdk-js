"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LcxApi = void 0;
const ws_1 = __importDefault(require("ws"));
const config_1 = require("../config");
const urlConfig_1 = require("./urlConfig");
const utils_1 = require("../utils");
const signatureGenerator_1 = require("./signatureGenerator");
const validators_1 = require("../validators");
class LcxApi {
    constructor(config) {
        this.ws = null;
        this.config =
            config ||
                new config_1.Configuration({
                    baseOptions: {
                        headers: {
                            'API-KEY': '',
                            'SECRET-KEY': '',
                        },
                    },
                });
    }
    getBaseUrl() {
        return urlConfig_1.baseUrls['PRODUCTION'];
    }
    /* Market API's */
    /**
     * Fetches the complete order book for a specified market.
     * This method retrieves "order book" data for a specified market pair.
     *
     * @param {OrderBookPayload} payload - An object containing:
     *  - `pair` (required, string): The market pair to retrieve data for, e.g., "LCX/EUR".
     * @returns {Promise<any>} - Resolves with the order book data for the market.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    orderBookDetailsGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the payload
            (0, validators_1.validateOrderBookPayload)(payload);
            const endpoint = '/api/book';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            try {
                const params = new URLSearchParams({ pair: payload.pair });
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching order book data:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches OHLCV (Open, High, Low, Close, Volume) data for a specified market.
     * This method retrieves "candlestick" data within a specified timeframe,
     * from a starting timestamp to an ending timestamp, based on the provided market pair.
     *
     * @param {MarketKlinePayload} payload - An object containing:
     *  - `pair` (required, string): The market pair to retrieve data for, e.g., "LCX/EUR".
     *  - `resolution` (required, string): The timeframe resolution for each data point, e.g., "60" for 1-minute intervals.
     *  - `from` (required, number): The from time in UTC timestamp in seconds.
     *  - `to` (required, number): The to time in UTC timestamp in seconds.
     * @returns {Promise<any>} - Resolves with the kline (candlestick) data for the market.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    marketKlineDetailsGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the payload
            (0, validators_1.validateMarketKlinePayload)(payload);
            const endpoint = '/v2/market/kline';
            const url = this.getBaseUrl().klineUrl + endpoint;
            try {
                const response = yield this.config.axiosInstance.post(url, payload, {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching market kline data:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches recent public trades for a specified market pair.
     * This method retrieves trade data, including price, size, and timestamp for each trade.
     * The data is paginated, with a fixed page size of 100 trades.
     *
     * @param {TradesPayload} payload - An object containing:
     *  - `pair` (required, string): The market pair to retrieve data for, e.g., "LCX/ETH".
     *  - `offset` (required, number): The page index, where the first page is 1.
     * @returns {Promise<any>} - Resolves with trade data for the specified market.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    marketTradesGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the payload
            (0, validators_1.validateTradesPayload)(payload);
            const endpoint = '/api/trades';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            try {
                const params = new URLSearchParams({
                    pair: payload.pair,
                    offset: payload.offset.toString(),
                });
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching market trade data:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches all available trading pairs on the lcx exchange platform.
     * This method retrieves details of all trading pairs currently available,
     * including any relevant information regarding each pair.
     *
     * @returns {Promise<any>} - Resolves with a list of trading pairs available on the exchange.
     * @throws {Error} - Throws an error if the API request fails.
     */
    marketPairsGet() {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = '/api/pairs';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            try {
                const response = yield this.config.axiosInstance.get(url, {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching market pairs data:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches details for a specific trading pair on the exchange platform.
     * This method retrieves information about a given trading pair, including
     * key details such as symbol, base, quote, and other attributes.
     *
     * @param {MarketPairPayload} payload - An object containing:
     *  - `pair` (required, string): The market pair to retrieve data for, e.g., "LCX/ETH".
     * @returns {Promise<any>} - Resolves with detailed information about the specified trading pair.
     * @throws {Error} - Throws an error if the provided `pair` parameter is invalid or if the API request fails.
     */
    marketPairDetailsGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the payload
            (0, validators_1.validateMarketPairPayload)(payload);
            const endpoint = '/api/pair';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            try {
                const params = new URLSearchParams({ pair: payload.pair });
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching market pair details:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches a comprehensive market overview for multiple trading pairs.
     * This method retrieves ticker information, including the best bid and ask prices,
     * latest traded price, daily volume, and previous day's price movement for all available pairs.
     *
     * This function provides a holistic view of the market, enabling real-time analysis
     * of market conditions across multiple trading pairs.
     *
     * @returns {Promise<any>} - Resolves with ticker data for multiple trading pairs, offering a complete overview of market information.
     * @throws {Error} - Throws an error if the API request fails.
     */
    marketTickersGet() {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = '/api/tickers';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            try {
                const response = yield this.config.axiosInstance.get(url, {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching market tickers:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches a comprehensive market overview for a specified trading pair.
     * This method retrieves ticker information for a given pair, including the current best bid and ask prices,
     * the latest traded price, daily volume, and previous day's price movement.
     *
     * This function allows for focused analysis on a specific trading pair, providing real-time data relevant
     * to that particular market.
     *
     * @param {MarketTickerPayload} payload - An object containing:
     *  - `pair` (required, string): The market pair to retrieve data for, e.g., "LCX/ETH".
     * @returns {Promise<any>} - Resolves with ticker data for the specified trading pair, offering detailed market information.
     * @throws {Error} - Throws an error if the `pair` parameter is missing, invalid, or if the API request fails.
     */
    marketTickerGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the payload
            (0, validators_1.validateMarketTickerPayload)(payload);
            const endpoint = '/api/ticker';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            try {
                const params = new URLSearchParams({ pair: payload.pair });
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching ticker data for pair:', error);
                throw error;
            }
        });
    }
    /* Trading API's */
    /**
     * Creates a new order on the LCX Exchange.
     * This endpoint enables users to create buy/sell orders with specified order details.
     *
     * @param {OrderCreatePayload} payload - An object containing:
     *  - `pair` (required, string): Name of the pair, e.g., "LCX/ETH".
     *  - `amount` (required, number): Amount of the base asset to be bought/sold.
     *  - `price` (optional, number): Price in quote currency for each unit of base currency (only for limit orders).
     *  - `orderType` (required, "LIMIT" | "MARKET"): Type of order (limit or market).
     *  - `side` (required, "BUY" | "SELL"): Order side (buy or sell).
     *  - `clientOrderId` (optional, string): Custom UUID to uniquely identify the order (auto-generated if not provided).
     * @returns {Promise<any>} - Resolves with the response data for the created order.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    orderCreate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateOrderCreatePayload)(payload);
            // Convert camelCase keys to Proper Case (Pascal Case) format for API
            const formattedPayload = (0, utils_1.convertToApiFormat)(payload);
            const endpoint = '/api/create';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('POST', endpoint, formattedPayload, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                'Content-Type': 'application/json',
            };
            try {
                const response = yield this.config.axiosInstance.post(url, formattedPayload, {
                    headers,
                });
                return response.data;
            }
            catch (error) {
                console.error('Error creating order:', error);
                throw error;
            }
        });
    }
    /**
     * Modifies an existing limit order on the LCX Exchange.
     * This endpoint allows users to update an open order with a new amount and price.
     *
     * @param {OrderModifyPayload} payload - An object containing:
     *  - `orderId` (required, string): ID of the open order to be modified.
     *  - `amount` (required, number): New amount for the order.
     *  - `price` (required, number): New price in quote currency per unit of base currency.
     * @returns {Promise<any>} - Resolves with the response data for the updated order.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    orderModify(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateOrderModifyPayload)(payload);
            // Convert camelCase keys to Proper Case for API request
            const formattedPayload = (0, utils_1.convertToApiFormat)(payload);
            const endpoint = '/api/modify';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('PUT', endpoint, formattedPayload, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const response = yield this.config.axiosInstance.put(url, formattedPayload, {
                    headers,
                });
                return response.data;
            }
            catch (error) {
                console.error('Error modifying order:', error);
                throw error;
            }
        });
    }
    /**
     * Cancels an existing order on the LCX Exchange.
     * This endpoint allows users to cancel an order by providing the Order ID.
     *
     * @param {OrderCancelPayload} payload - An object containing:
     *  - `orderId` (required, string): The ID of the order to be canceled.
     * @returns {Promise<any>} - Resolves with the response data for the canceled order.
     * @throws {Error} - Throws an error if the orderId is invalid or the API request fails.
     */
    orderCancel(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateOrderCancelPayload)(payload);
            const endpoint = '/api/cancel';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('DELETE', endpoint, {}, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const params = new URLSearchParams({ orderId: payload.orderId });
                const response = yield this.config.axiosInstance.delete(`${url}?${params.toString()}`, {
                    headers: headers,
                });
                return response.data;
            }
            catch (error) {
                console.error('Error canceling order:', error);
                throw error;
            }
        });
    }
    /**
     * Cancels multiple orders on the LCX Exchange.
     * This endpoint allows users to cancel a list of orders by providing an array of Order IDs.
     *
     * @param {OrderCancelAllPayload} payload - An object containing:
     *  - `orderIds` (required, [strings]): An array of order IDs to be canceled. Maximum of 25 orders.
     * @returns {Promise<any>} - Resolves with the response data for the canceled orders.
     * @throws {Error} - Throws an error if the orderIds array is invalid or the API request fails.
     */
    orderCancelAll(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateOrderCancelAllPayload)(payload);
            const endpoint = '/order/cancel-all';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('DELETE', endpoint, {}, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const params = new URLSearchParams();
                payload.orderIds.forEach((orderId) => params.append('orderIds', orderId));
                const response = yield this.config.axiosInstance.delete(`${url}?${params.toString()}`, {
                    headers: headers,
                });
                return response.data;
            }
            catch (error) {
                console.error('Error canceling orders:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches open orders that are pending execution.
     * This endpoint retrieves a list of all open orders ready for execution based on the specified criteria.
     *
     * @param {OpenOrdersPayload} payload - An object containing:
     *  - `offset` (required, number): Page index, first page = 1, fixed page size = 100.
     *  - `pair` (optional, string): Market pair, e.g., "LCX/USDC".
     *  - `fromDate` (optional, number): Timestamp in milliseconds specifying the start date for orders.
     *  - `toDate` (optional, number): Timestamp in milliseconds specifying the end date for orders.
     * @returns {Promise<any>} - Resolves with the open orders data.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    openOrdersGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateOpenOrdersPayload)(payload);
            const endpoint = '/api/open';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const params = new URLSearchParams();
                params.append('offset', payload.offset.toString());
                if (payload.pair)
                    params.append('pair', payload.pair);
                if (payload.fromDate)
                    params.append('fromDate', payload.fromDate.toString());
                if (payload.toDate)
                    params.append('toDate', payload.toDate.toString());
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: headers,
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching open orders:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches the details of a specific order.
     * This endpoint retrieves detailed information about a single order based on its ID.
     *
     * @param {OrderDetailsPayload} payload - An object containing:
     *  - `orderId` (required, string): The ID of the order to retrieve.
     * @returns {Promise<any>} - Resolves with the order details data.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    orderDetailsGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateOrderDetailsPayload)(payload);
            const endpoint = '/api/order';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const params = new URLSearchParams({ OrderId: payload.orderId });
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: headers,
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching order details:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches the order history for the specified criteria.
     * This endpoint retrieves previously closed or cancelled orders for the user, based on parameters like
     * market pair, date range, order side, status, and type.
     *
     * @param {OrderHistoryPayload} payload - An object containing:
     *  - `pair` (optional, string): Market pair, e.g., "LCX/EUR".
     *  - `offset` (required, number): Page index, first page = 1, fixed page size = 100.
     *  - `fromDate` (optional, number): Timestamp in milliseconds specifying the start date for orders.
     *  - `toDate` (optional, number): Timestamp in milliseconds specifying the end date for orders.
     *  - `side` (optional, "BUY" | "SELL"): Buy or sell side of the order.
     *  - `orderStatus` (optional, "CANCEL" | "CLOSED"): Status of the order (cancelled or closed).
     *  - `orderType` (optional, "LIMIT" | "MARKET"): Type of order (limit or market).
     * @returns {Promise<any>} - Resolves with the order history data.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    orderHistoryGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateOrderHistoryPayload)(payload);
            const endpoint = '/api/orderHistory';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const params = new URLSearchParams();
                params.append('offset', payload.offset.toString());
                if (payload.pair)
                    params.append('pair', payload.pair);
                if (payload.fromDate)
                    params.append('fromDate', payload.fromDate.toString());
                if (payload.toDate)
                    params.append('toDate', payload.toDate.toString());
                if (payload.side)
                    params.append('side', payload.side);
                if (payload.orderStatus)
                    params.append('orderStatus', payload.orderStatus);
                if (payload.orderType)
                    params.append('orderType', payload.orderType);
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: headers,
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching order history:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches the trade history based on specified criteria.
     * This endpoint retrieves all executed orders for the user, based on parameters like
     * market pair, date range, etc.
     *
     * @param {TradeHistoryPayload} payload - An object containing:
     *  - `pair` (optional, string): Market pair, e.g., "LCX/EUR".
     *  - `offset` (required, number): Page index, first page = 1, fixed page size = 100.
     *  - `fromDate` (optional, number): Timestamp in milliseconds specifying the start date for trades.
     *  - `toDate` (optional, number): Timestamp in milliseconds specifying the end date for trades.
     * @returns {Promise<any>} - Resolves with the trade history data.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    tradeHistoryGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateTradeHistoryPayload)(payload);
            const endpoint = '/api/uHistory';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const params = new URLSearchParams();
                params.append('offset', payload.offset.toString());
                if (payload.pair)
                    params.append('pair', payload.pair);
                if (payload.fromDate)
                    params.append('fromDate', payload.fromDate.toString());
                if (payload.toDate)
                    params.append('toDate', payload.toDate.toString());
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: headers,
                });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching trade history:', error);
                throw error;
            }
        });
    }
    /* Account API's */
    /**
     * Fetches balances for all listed coins.
     * This endpoint retrieves a user's balance across all listed coins on the exchange.
     *
     * @returns {Promise<any>} - Resolves with the balances data.
     * @throws {Error} - Throws an error if the API request fails.
     */
    balancesGet() {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            const endpoint = '/api/balances';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const response = yield this.config.axiosInstance.get(url, { headers });
                return response.data;
            }
            catch (error) {
                console.error('Error fetching balances:', error);
                throw error;
            }
        });
    }
    /**
     * Fetches the balance for a specific coin.
     * This endpoint retrieves a user's balance for a specified coin on the exchange.
     *
     * @param {CoinBalanceDetailsPayload} payload - An object containing:
     *  - `coin` (required, string): The coin symbol (e.g., "LCX") for which the balance is retrieved.
     * @returns {Promise<any>} - Resolves with the balance data for the specified coin.
     * @throws {Error} - Throws an error if the API request fails or if the coin parameter is missing.
     */
    balanceGet(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if both API-KEY and SECRET-KEY are provided
            if (!this.config.apiKey || !this.config.secretKey) {
                throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.");
            }
            // Validate the payload
            (0, validators_1.validateCoinBalanceDetailsPayload)(payload);
            const endpoint = '/api/balance';
            const url = this.getBaseUrl().exchangeUrl + endpoint;
            // Generate the signature for authentication
            const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
            // Configure headers
            const headers = {
                'x-access-key': this.config.apiKey,
                'x-access-sign': signature,
                'x-access-timestamp': Date.now(),
                accept: 'application/json',
                'content-type': 'application/json;charset=UTF-8',
            };
            try {
                const params = new URLSearchParams({ coin: payload.coin });
                const response = yield this.config.axiosInstance.get(`${url}?${params.toString()}`, {
                    headers: headers,
                });
                return response.data;
            }
            catch (error) {
                console.error(`Error fetching balance for coin ${payload.coin}:`, error);
                throw error;
            }
        });
    }
    /* Market WebSocket */
    /**
     * Connects to the WebSocket and subscribes to ticker updates for a specified pair.
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeTicker(onMessage) {
        const wsUrl = this.getBaseUrl().wsUrl + '/ws';
        this.ws = new ws_1.default(wsUrl);
        this.ws.on('open', () => {
            this.subscribeToTicker();
        });
        this.ws.on('message', (message) => {
            const messageStr = message.toString();
            if (messageStr.startsWith('{') || messageStr.startsWith('[')) {
                try {
                    const data = JSON.parse(messageStr);
                    onMessage(data);
                }
                catch (error) {
                    onMessage({
                        type: 'error',
                        message: 'Failed to parse JSON message',
                        error,
                    });
                }
            }
            else {
                onMessage({ type: 'status', message: messageStr });
            }
        });
        this.ws.on('error', (error) => {
            throw new Error(`WebSocket error: ${error.message}`);
        });
        this.ws.on('close', (code, reason) => {
            throw new Error(`WebSocket connection closed: ${code}, Reason: ${reason.toString()}`);
        });
    }
    /**
     * Sends a subscription message to the WebSocket to receive ticker updates.
     */
    subscribeToTicker() {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            const message = JSON.stringify({
                Topic: 'subscribe',
                Type: 'ticker',
            });
            this.ws.send(message);
        }
        else {
            throw new Error('WebSocket is not open. Cannot subscribe to ticker.');
        }
    }
    /**
     * Connects to the WebSocket and subscribes to order book updates for a specified pair.
     * @param {string} pair - The trading pair to subscribe to (e.g., "LCX/USDC").
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeOrderbook(pair, onMessage) {
        const wsUrl = this.getBaseUrl().wsUrl + '/ws';
        this.ws = new ws_1.default(wsUrl);
        this.ws.on('open', () => {
            this.subscribeToOrderbook(pair);
        });
        this.ws.on('message', (message) => {
            const messageStr = message.toString();
            if (messageStr.startsWith('{') || messageStr.startsWith('[')) {
                try {
                    const data = JSON.parse(messageStr);
                    onMessage(data);
                }
                catch (error) {
                    onMessage({
                        type: 'error',
                        message: 'Failed to parse JSON message',
                        error,
                    });
                }
            }
            else {
                onMessage({ type: 'status', message: messageStr });
            }
        });
        this.ws.on('error', (error) => {
            throw new Error(`WebSocket error: ${error.message}`);
        });
        this.ws.on('close', (code, reason) => {
            throw new Error(`WebSocket connection closed: ${code}, Reason: ${reason.toString()}`);
        });
    }
    /**
     * Sends a subscription message to the WebSocket to receive order book updates for a specific pair.
     * @param {string} pair - The trading pair to subscribe to (e.g., "LCX/USDC").
     */
    subscribeToOrderbook(pair) {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            const message = JSON.stringify({
                Topic: 'subscribe',
                Type: 'orderbook',
                Pair: pair,
            });
            this.ws.send(message);
        }
        else {
            throw new Error('WebSocket is not open. Cannot subscribe to orderbook.');
        }
    }
    /**
     * Connects to the WebSocket and subscribes to trade updates for a specified pair.
     * @param {string} pair - The trading pair to subscribe to (e.g., "ETH/BTC").
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeTrade(pair, onMessage) {
        const wsUrl = this.getBaseUrl().wsUrl + '/ws';
        this.ws = new ws_1.default(wsUrl);
        this.ws.on('open', () => {
            this.subscribeToTrade(pair);
        });
        this.ws.on('message', (message) => {
            const messageStr = message.toString();
            if (messageStr.startsWith('{') || messageStr.startsWith('[')) {
                try {
                    const data = JSON.parse(messageStr);
                    onMessage(data);
                }
                catch (error) {
                    onMessage({
                        type: 'error',
                        message: 'Failed to parse JSON message',
                        error,
                    });
                }
            }
            else {
                onMessage({ type: 'status', message: messageStr });
            }
        });
        this.ws.on('error', (error) => {
            throw new Error(`WebSocket error: ${error.message}`);
        });
        this.ws.on('close', (code, reason) => {
            throw new Error(`WebSocket connection closed: ${code}, Reason: ${reason.toString()}`);
        });
    }
    /**
     * Sends a subscription message to the WebSocket to receive trade updates for a specific pair.
     * @param {string} pair - The trading pair to subscribe to (e.g., "ETH/BTC").
     */
    subscribeToTrade(pair) {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            const message = JSON.stringify({
                Topic: 'subscribe',
                Type: 'trade',
                Pair: pair,
            });
            this.ws.send(message);
        }
        else {
            throw new Error('WebSocket is not open. Cannot subscribe to trade.');
        }
    }
    /* Trading WebSocket */
    /**
     * Connects to the WebSocket and subscribes to wallet updates for the user's account.
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeWallets(onMessage) {
        // Check if both API-KEY and SECRET-KEY are provided
        if (!this.config.apiKey || !this.config.secretKey) {
            throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required to connect this Websocket.");
        }
        let endpoint = '/api/auth/ws';
        // Generate the signature for authentication
        const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
        const wsUrl = this.getBaseUrl().wsUrl +
            endpoint +
            `?x-access-key=${this.config.apiKey}&x-access-sign=${signature}&x-access-timestamp=${Date.now()}`;
        this.ws = new ws_1.default(wsUrl);
        this.ws.on('open', () => {
            this.subscribeToWallets();
        });
        this.ws.on('message', (message) => {
            const messageStr = message.toString();
            if (messageStr.startsWith('{') || messageStr.startsWith('[')) {
                try {
                    const data = JSON.parse(messageStr);
                    onMessage(data);
                }
                catch (error) {
                    onMessage({
                        type: 'error',
                        message: 'Failed to parse JSON message',
                        error,
                    });
                }
            }
            else {
                onMessage({ type: 'status', message: messageStr });
            }
        });
        this.ws.on('error', (error) => {
            throw new Error(`WebSocket error: ${error.message}`);
        });
        this.ws.on('close', (code, reason) => {
            throw new Error(`WebSocket connection closed: ${code}, Reason: ${reason.toString()}`);
        });
    }
    /**
     * Sends a subscription message to the WebSocket to receive wallet updates.
     */
    subscribeToWallets() {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            const message = JSON.stringify({
                Topic: 'subscribe',
                Type: 'user_wallets',
            });
            this.ws.send(message);
        }
        else {
            throw new Error('WebSocket is not open. Cannot subscribe to wallets.');
        }
    }
    /**
     * Connects to the WebSocket and subscribes to order updates for the user's account.
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeOrders(onMessage) {
        // Check if both API-KEY and SECRET-KEY are provided
        if (!this.config.apiKey || !this.config.secretKey) {
            throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required to connect to this WebSocket.");
        }
        const endpoint = '/api/auth/ws';
        // Generate the signature for authentication
        const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
        const wsUrl = this.getBaseUrl().wsUrl +
            endpoint +
            `?x-access-key=${this.config.apiKey}&x-access-sign=${signature}&x-access-timestamp=${Date.now()}`;
        this.ws = new ws_1.default(wsUrl);
        this.ws.on('open', () => {
            this.subscribeToOrders();
        });
        this.ws.on('message', (message) => {
            const messageStr = message.toString();
            if (messageStr.startsWith('{') || messageStr.startsWith('[')) {
                try {
                    const data = JSON.parse(messageStr);
                    onMessage(data);
                }
                catch (error) {
                    onMessage({
                        type: 'error',
                        message: 'Failed to parse JSON message',
                        error,
                    });
                }
            }
            else {
                onMessage({ type: 'status', message: messageStr });
            }
        });
        this.ws.on('error', (error) => {
            throw new Error(`WebSocket error: ${error.message}`);
        });
        this.ws.on('close', (code, reason) => {
            throw new Error(`WebSocket connection closed: ${code}, Reason: ${reason.toString()}`);
        });
    }
    /**
     * Sends a subscription message to the WebSocket to receive order updates.
     */
    subscribeToOrders() {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            const message = JSON.stringify({
                Topic: 'subscribe',
                Type: 'user_orders',
            });
            this.ws.send(message);
        }
        else {
            throw new Error('WebSocket is not open. Cannot subscribe to orders.');
        }
    }
    /**
     * Connects to the WebSocket and subscribes to trade updates for the user's account.
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeTrades(onMessage) {
        // Check if both API-KEY and SECRET-KEY are provided
        if (!this.config.apiKey || !this.config.secretKey) {
            throw new Error("Authentication error: 'API-KEY' and 'SECRET-KEY' are required to connect to this WebSocket.");
        }
        const endpoint = '/api/auth/ws';
        // Generate the signature for authentication
        const signature = (0, signatureGenerator_1.generateSignature)('GET', endpoint, {}, this.config.secretKey);
        const wsUrl = this.getBaseUrl().wsUrl +
            endpoint +
            `?x-access-key=${this.config.apiKey}&x-access-sign=${signature}&x-access-timestamp=${Date.now()}`;
        this.ws = new ws_1.default(wsUrl);
        this.ws.on('open', () => {
            this.subscribeToTrades();
        });
        this.ws.on('message', (message) => {
            const messageStr = message.toString();
            if (messageStr.startsWith('{') || messageStr.startsWith('[')) {
                try {
                    const data = JSON.parse(messageStr);
                    onMessage(data);
                }
                catch (error) {
                    onMessage({
                        type: 'error',
                        message: 'Failed to parse JSON message',
                        error,
                    });
                }
            }
            else {
                onMessage({ type: 'status', message: messageStr });
            }
        });
        this.ws.on('error', (error) => {
            throw new Error(`WebSocket error: ${error.message}`);
        });
        this.ws.on('close', (code, reason) => {
            throw new Error(`WebSocket connection closed: ${code}, Reason: ${reason.toString()}`);
        });
    }
    /**
     * Sends a subscription message to the WebSocket to receive trade updates.
     */
    subscribeToTrades() {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            const message = JSON.stringify({
                Topic: 'subscribe',
                Type: 'user_trades',
            });
            this.ws.send(message);
        }
        else {
            throw new Error('WebSocket is not open. Cannot subscribe to trades.');
        }
    }
}
exports.LcxApi = LcxApi;