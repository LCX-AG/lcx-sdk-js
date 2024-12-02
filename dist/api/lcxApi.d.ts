import { Configuration } from '../config';
import { OrderBookPayload, MarketKlinePayload, TradesPayload, MarketPairPayload, MarketTickerPayload, OrderCreatePayload, OrderModifyPayload, OrderCancelPayload, OrderCancelAllPayload, OpenOrdersPayload, OrderDetailsPayload, OrderHistoryPayload, TradeHistoryPayload, CoinBalanceDetailsPayload } from '../types';
export declare class LcxApi {
    private config;
    private ws;
    constructor(config?: Configuration);
    private getBaseUrl;
    /**
     * Fetches the complete order book for a specified market.
     * This method retrieves "order book" data for a specified market pair.
     *
     * @param {OrderBookPayload} payload - An object containing:
     *  - `pair` (required, string): The market pair to retrieve data for, e.g., "LCX/EUR".
     * @returns {Promise<any>} - Resolves with the order book data for the market.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    orderBookDetailsGet(payload: OrderBookPayload): Promise<any>;
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
    marketKlineDetailsGet(payload: MarketKlinePayload): Promise<any>;
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
    marketTradesGet(payload: TradesPayload): Promise<any>;
    /**
     * Fetches all available trading pairs on the lcx exchange platform.
     * This method retrieves details of all trading pairs currently available,
     * including any relevant information regarding each pair.
     *
     * @returns {Promise<any>} - Resolves with a list of trading pairs available on the exchange.
     * @throws {Error} - Throws an error if the API request fails.
     */
    marketPairsGet(): Promise<any>;
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
    marketPairDetailsGet(payload: MarketPairPayload): Promise<any>;
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
    marketTickersGet(): Promise<any>;
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
    marketTickerGet(payload: MarketTickerPayload): Promise<any>;
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
    orderCreate(payload: OrderCreatePayload): Promise<any>;
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
    orderModify(payload: OrderModifyPayload): Promise<any>;
    /**
     * Cancels an existing order on the LCX Exchange.
     * This endpoint allows users to cancel an order by providing the Order ID.
     *
     * @param {OrderCancelPayload} payload - An object containing:
     *  - `orderId` (required, string): The ID of the order to be canceled.
     * @returns {Promise<any>} - Resolves with the response data for the canceled order.
     * @throws {Error} - Throws an error if the orderId is invalid or the API request fails.
     */
    orderCancel(payload: OrderCancelPayload): Promise<any>;
    /**
     * Cancels multiple orders on the LCX Exchange.
     * This endpoint allows users to cancel a list of orders by providing an array of Order IDs.
     *
     * @param {OrderCancelAllPayload} payload - An object containing:
     *  - `orderIds` (required, [strings]): An array of order IDs to be canceled. Maximum of 25 orders.
     * @returns {Promise<any>} - Resolves with the response data for the canceled orders.
     * @throws {Error} - Throws an error if the orderIds array is invalid or the API request fails.
     */
    orderCancelAll(payload: OrderCancelAllPayload): Promise<any>;
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
    openOrdersGet(payload: OpenOrdersPayload): Promise<any>;
    /**
     * Fetches the details of a specific order.
     * This endpoint retrieves detailed information about a single order based on its ID.
     *
     * @param {OrderDetailsPayload} payload - An object containing:
     *  - `orderId` (required, string): The ID of the order to retrieve.
     * @returns {Promise<any>} - Resolves with the order details data.
     * @throws {Error} - Throws an error if the payload is invalid or the API request fails.
     */
    orderDetailsGet(payload: OrderDetailsPayload): Promise<any>;
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
    orderHistoryGet(payload: OrderHistoryPayload): Promise<any>;
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
    tradeHistoryGet(payload: TradeHistoryPayload): Promise<any>;
    /**
     * Fetches balances for all listed coins.
     * This endpoint retrieves a user's balance across all listed coins on the exchange.
     *
     * @returns {Promise<any>} - Resolves with the balances data.
     * @throws {Error} - Throws an error if the API request fails.
     */
    balancesGet(): Promise<any>;
    /**
     * Fetches the balance for a specific coin.
     * This endpoint retrieves a user's balance for a specified coin on the exchange.
     *
     * @param {CoinBalanceDetailsPayload} payload - An object containing:
     *  - `coin` (required, string): The coin symbol (e.g., "LCX") for which the balance is retrieved.
     * @returns {Promise<any>} - Resolves with the balance data for the specified coin.
     * @throws {Error} - Throws an error if the API request fails or if the coin parameter is missing.
     */
    balanceGet(payload: CoinBalanceDetailsPayload): Promise<any>;
    /**
     * Connects to the WebSocket and subscribes to ticker updates for a specified pair.
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeTicker(onMessage: (data: any) => void): void;
    /**
     * Sends a subscription message to the WebSocket to receive ticker updates.
     */
    private subscribeToTicker;
    /**
     * Connects to the WebSocket and subscribes to order book updates for a specified pair.
     * @param {string} pair - The trading pair to subscribe to (e.g., "LCX/USDC").
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeOrderbook(pair: string, onMessage: (data: any) => void): void;
    /**
     * Sends a subscription message to the WebSocket to receive order book updates for a specific pair.
     * @param {string} pair - The trading pair to subscribe to (e.g., "LCX/USDC").
     */
    private subscribeToOrderbook;
    /**
     * Connects to the WebSocket and subscribes to trade updates for a specified pair.
     * @param {string} pair - The trading pair to subscribe to (e.g., "ETH/BTC").
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeTrade(pair: string, onMessage: (data: any) => void): void;
    /**
     * Sends a subscription message to the WebSocket to receive trade updates for a specific pair.
     * @param {string} pair - The trading pair to subscribe to (e.g., "ETH/BTC").
     */
    private subscribeToTrade;
    /**
     * Connects to the WebSocket and subscribes to wallet updates for the user's account.
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeWallets(onMessage: (data: any) => void): void;
    /**
     * Sends a subscription message to the WebSocket to receive wallet updates.
     */
    private subscribeToWallets;
    /**
     * Connects to the WebSocket and subscribes to order updates for the user's account.
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeOrders(onMessage: (data: any) => void): void;
    /**
     * Sends a subscription message to the WebSocket to receive order updates.
     */
    private subscribeToOrders;
    /**
     * Connects to the WebSocket and subscribes to trade updates for the user's account.
     * @param {(data: any) => void} onMessage - Callback function to handle incoming messages.
     * @throws {Error} Throws an error if WebSocket connection fails or subscription fails.
     */
    subscribeTrades(onMessage: (data: any) => void): void;
    /**
     * Sends a subscription message to the WebSocket to receive trade updates.
     */
    private subscribeToTrades;
}
