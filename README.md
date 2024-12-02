# LCX SDK for Node.js

The official Node.js client library for the [LCX Exchange API][1].

## Table of Contents

- [LCX SDK for Node.js](#lcx-sdk-for-nodejs)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Configuration](#configuration)
    - [Using `require`](#using-require)
    - [Using `import`](#using-import)
    - [Getting started](#getting-started)
  - [Error Handling](#error-handling)
  - [API Function Reference](#api-function-reference)
    - [orderBookDetailsGet](#orderbookdetailsget)
      - [Parameters](#parameters)
      - [Returns](#returns)
      - [Example](#example)
    - [marketKlineDetailsGet](#marketklinedetailsget)
      - [Parameters](#parameters-1)
      - [Returns](#returns-1)
      - [Example](#example-1)
    - [marketTradesGet](#markettradesget)
      - [Parameters](#parameters-2)
      - [Returns](#returns-2)
      - [Example](#example-2)
    - [marketPairsGet](#marketpairsget)
      - [Parameters](#parameters-3)
      - [Returns](#returns-3)
      - [Example](#example-3)
    - [marketPairDetailsGet](#marketpairdetailsget)
      - [Parameters](#parameters-4)
      - [Returns](#returns-4)
      - [Example](#example-4)
    - [marketTickersGet](#markettickersget)
      - [Returns](#returns-5)
      - [Example](#example-5)
    - [marketTickerGet](#markettickerget)
      - [Parameters](#parameters-5)
      - [Returns](#returns-6)
      - [Example](#example-6)
    - [orderCreate](#ordercreate)
      - [Parameters](#parameters-6)
      - [Returns](#returns-7)
      - [Example](#example-7)
    - [orderModify](#ordermodify)
      - [Parameters](#parameters-7)
      - [Returns](#returns-8)
      - [Example](#example-8)
    - [orderCancel](#ordercancel)
      - [Parameters](#parameters-8)
      - [Returns](#returns-9)
      - [Example](#example-9)
    - [orderCancelAll](#ordercancelall)
      - [Parameters](#parameters-9)
      - [Returns](#returns-10)
      - [Example](#example-10)
    - [openOrdersGet](#openordersget)
      - [Parameters](#parameters-10)
      - [Returns](#returns-11)
      - [Example](#example-11)
    - [orderDetailsGet](#orderdetailsget)
      - [Parameters](#parameters-11)
      - [Returns](#returns-12)
      - [Example](#example-12)
    - [orderHistoryGet](#orderhistoryget)
      - [Parameters](#parameters-12)
      - [Returns](#returns-13)
      - [Example](#example-13)
    - [tradeHistoryGet](#tradehistoryget)
      - [Parameters](#parameters-13)
      - [Returns](#returns-14)
      - [Example](#example-14)
    - [balancesGet](#balancesget)
      - [Parameters](#parameters-14)
      - [Returns](#returns-15)
      - [Example](#example-15)
    - [balanceGet](#balanceget)
      - [Parameters](#parameters-15)
      - [Returns](#returns-16)
      - [Example](#example-16)
    - [subscribeTicker](#subscribeticker)
      - [Parameters](#parameters-16)
      - [Example](#example-17)
    - [subscribeOrderbook](#subscribeorderbook)
      - [Parameters](#parameters-17)
      - [Example](#example-18)
    - [subscribeTrade](#subscribetrade)
      - [Parameters](#parameters-18)
      - [Example](#example-19)
    - [subscribeWallets](#subscribewallets)
      - [Parameters](#parameters-19)
      - [Example](#example-20)
    - [subscribeOrders](#subscribeorders)
      - [Parameters](#parameters-20)
      - [Example](#example-21)
    - [subscribeTrades](#subscribetrades)
      - [Parameters](#parameters-21)
      - [Example](#example-22)
  - [Support](#support)
  - [License](#license)

## Install

To install the LCX SDK, use npm:

```console
$ npm install lcx-sdk
```

## Configuration

To get started, import the SDK and set up the configuration. The SDK supports both `require` and `import` syntax, so you can use either of the following:

### Using `require`

```javascript
const { Configuration, LcxApi } = require('lcx-sdk');
```

### Using `import`

```javascript
import { Configuration, LcxApi } from 'lcx-sdk';
```

### Getting started

Most endpoints require a valid `api_key` and `secret_key` as authentication. Attach them via the configuration.

```typescript
import { Configuration, LcxApi } from 'lcx-sdk';

const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);
```

The `baseOptions` field allows for clients to override the default options used to make requests. e.g.

```typescript
const configuration = new Configuration({
  baseOptions: {
    // Axios request options
  },
});
```

## Error Handling

All errors can now be caught using `try/catch` with `async/await` or through promise chaining.

```typescript
try {
  await lcxClient.orderBookDetailsGet(request);
} catch (error) {
  const err = error.response.data;
}

// or

lcxClient
  .orderBookDetailsGet(request)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });
```

**Note:** The full error object includes the API configuration object, including the request headers, which in turn include the API key and secret. To avoid logging your API secret, log only `error.data` and/or avoid logging the full `error.config.headers` object.

## API Function Reference

### orderBookDetailsGet

Fetches the complete order book for a specified market pair.

- **Description**: This method retrieves the "order book" data, providing a snapshot of the current buy and sell orders for the given market pair.
- **Authentication**: Not required.

#### Parameters

- **payload** (required, `OrderBookPayload`):
  - `pair` (string): The market pair to retrieve data for, e.g., `"LCX/EUR"`.

#### Returns

- **Promise<any>**: Resolves with the order book data for the specified market pair.

#### Example

```typescript
const lcxClient = new LcxApi();

const fetchOrderBoook = async () => {
  try {
    const request = { pair: 'LCX/EUR' };

    const data = await lcxClient.orderBookDetailsGet(request);

    console.log('Order Book Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
fetchOrderBoook();
```

### marketKlineDetailsGet

Fetches OHLCV (Open, High, Low, Close, Volume) data for a specified market.

- **Description**: This function retrieves candlestick (OHLCV) data for the specified market pair within a given timeframe, allowing analysis of historical price and volume data over set intervals.
- **Authentication**: Not required.

#### Parameters

- **payload** (required, `MarketKlinePayload`):
  - `pair` (string): The market pair to retrieve data for, e.g., `"LCX/EUR"`.
  - `resolution` (string): The timeframe resolution for each data point, e.g., `"60"` for 1-minute intervals.
  - `from` (number): Start timestamp in UTC (seconds).
  - `to` (number): End timestamp in UTC (seconds).

#### Returns

- **Promise<any>**: Resolves with the kline (candlestick) data for the specified market.

#### Example

```typescript
const lcxClient = new LcxApi();

const fetchMarketKlineDetails = async () => {
  try {
    const request = {
      pair: 'LCX/EUR',
      resolution: '60',
      from: 1730785247,
      to: 1730795247,
    };

    const data = await lcxClient.marketKlineDetailsGet(request);

    console.log('Market Kline Details Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
fetchMarketKlineDetails();
```

### marketTradesGet

Fetches recent public trades for a specified market pair.

- **Description**: This function retrieves recent trade data, including price, size, and timestamp for each trade. The results are paginated with a fixed page size of 100 trades.
- **Authentication**: Not required.

#### Parameters

- **payload** (required, `TradesPayload`):
  - `pair` (string): The market pair to retrieve trade data for, e.g., `"LCX/ETH"`.
  - `offset` (number): The page index, starting from `1`.

#### Returns

- **Promise<any>**: Resolves with recent trade data for the specified market.

#### Example

```typescript
const lcxClient = new LcxApi();

const fetchMarketTrades = async () => {
  try {
    const request = {
      pair: 'LCX/ETH',
      offset: 1,
    };

    const data = await lcxClient.marketTradesGet(request);

    console.log('Market Trades Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
fetchMarketTrades();
```

### marketPairsGet

Fetches all available trading pairs on the LCX Exchange platform.

- **Description**: This function retrieves a list of all trading pairs available on the LCX Exchange, along with relevant details for each pair.
- **Authentication**: Not required.

#### Parameters

- None

#### Returns

- **Promise<any>**: Resolves with a list of trading pairs currently available on the exchange.

#### Example

```typescript
const lcxClient = new LcxApi();

const fetchMarketPairs = async () => {
  try {
    const data = await lcxClient.marketPairsGet();

    console.log('Market Pairs Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
fetchMarketPairs();
```

### marketPairDetailsGet

Fetches details for a specific trading pair on the LCX Exchange platform.

- **Description**: This function retrieves information about a given trading pair, including key attributes like symbol, base, quote, and other relevant details.
- **Authentication**: Not required.

#### Parameters

- **`payload`**: An object containing:
  - **`pair`** (required, string): The market pair to retrieve data for, e.g., `"LCX/ETH"`.

#### Returns

- **Promise<any>**: Resolves with detailed information about the specified trading pair.

#### Example

```typescript
const lcxClient = new LcxApi();

const fetchMarketPairDetails = async () => {
  try {
    const request = {
      pair: 'ETH/BTC',
    };

    const data = await lcxClient.marketPairDetailsGet(request);

    console.log('Market Pair Details Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
fetchMarketPairDetails();
```

### marketTickersGet

Fetches a comprehensive market overview for multiple trading pairs.

- **Description**: This function retrieves ticker data for all available trading pairs on the LCX Exchange, including details like the best bid and ask prices, latest traded price, daily volume, and previous day’s price movement. It provides a holistic market view, which can support real-time market analysis across trading pairs.
- **Authentication**: Not required.

#### Returns

- **Promise<any>**: Resolves with ticker data for multiple trading pairs, offering a complete overview of market information.

#### Example

```typescript
const lcxClient = new LcxApi();

const fetchMarketTickers = async () => {
  try {
    const data = await lcxClient.marketTickersGet();

    console.log('Market Tickers Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
fetchMarketTickers();
```

### marketTickerGet

Fetches a comprehensive market overview for a specified trading pair.

- **Description**: This function retrieves ticker data for a given trading pair, providing information such as the current best bid and ask prices, latest traded price, daily volume, and previous day's price movement. It is ideal for focused analysis on a specific market pair.
- **Authentication**: Not required.

#### Parameters

- **payload** (required, `MarketTickerPayload`): An object containing:
  - `pair` (string): The market pair to retrieve data for, e.g., `"LCX/ETH"`.

#### Returns

- **Promise<any>**: Resolves with ticker data for the specified trading pair, providing detailed market information.

#### Example

```typescript
const lcxClient = new LcxApi();

const fetchMarketTicker = async () => {
  try {
    const request = { pair: 'LCX/EUR' };

    const data = await lcxClient.marketTickerGet(request);

    console.log('Market Ticker Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
fetchMarketTicker();
```

### orderCreate

Creates a new order on the LCX Exchange. This function enables users to create buy or sell orders with specified order details.

- **Description**: This method allows you to place orders on the exchange, with parameters for order type, price, side, and amount. It supports both "LIMIT" and "MARKET" order types. If a `clientOrderId` is not provided, one will be auto-generated.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **payload** (required, `OrderCreatePayload`): An object containing:
  - `pair` (string, required): The market pair to create an order for, e.g., `"LCX/ETH"`.
  - `amount` (number, required): The amount of the base asset to buy or sell.
  - `price` (number, optional): The price for each unit of the base asset (only for limit orders).
  - `orderType` ("LIMIT" | "MARKET", required): The type of order (limit or market).
  - `side` ("BUY" | "SELL", required): The side of the order (buy or sell).
  - `clientOrderId` (string, optional): A custom UUID to uniquely identify the order (will be auto-generated if not provided).

#### Returns

- **Promise<any>**: Resolves with the response data for the created order.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const createOrder = async () => {
  try {
    const request = {
      pair: 'LCX/EUR',
      amount: 10,
      price: 0.004,
      orderType: 'MARKET',
      side: 'BUY',
    };

    const data = await lcxClient.orderCreate(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
createOrder();
```

### orderModify

Modifies an existing limit order on the LCX Exchange. This function allows users to update an open order with a new amount and price.

- **Description**: This method enables users to modify an existing order by specifying a new amount and price. This operation is only valid for limit orders and allows for precise control over active orders.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **payload** (required, `OrderModifyPayload`): An object containing:
  - `orderId` (string, required): The ID of the open order to be modified.
  - `amount` (number, required): The new amount for the order.
  - `price` (number, required): The new price per unit of the base asset in the quote currency.

#### Returns

- **Promise<any>**: Resolves with the response data for the updated order.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const modifyOrder = async () => {
  try {
    const request = {
      orderId: ORDER_ID,
      amount: 101,
      price: 0.004,
    };

    const data = await lcxClient.orderModify(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
modifyOrder();
```

### orderCancel

Cancels an existing order on the LCX Exchange. This method allows users to cancel an order by providing the Order ID.

- **Description**: This function enables users to cancel an existing order on the LCX Exchange by specifying the order ID. If successful, it removes the order from the active order book.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **payload** (required, `OrderCancelPayload`): An object containing:
  - `orderId` (string, required): The ID of the order to be canceled.

#### Returns

- **Promise<any>**: Resolves with the response data for the canceled order.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const cancelOrder = async () => {
  try {
    const request = {
      orderId: ORDER_ID,
    };

    const data = await lcxClient.orderCancel(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
cancelOrder();
```

### orderCancelAll

Cancels multiple orders on the LCX Exchange. This method allows users to cancel a list of orders by providing an array of Order IDs.

- **Description**: This function enables users to cancel multiple orders on the LCX Exchange by specifying an array of order IDs. You can cancel up to 25 orders in a single request. If successful, all specified orders are removed from the active order book.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **payload** (required, `OrderCancelAllPayload`): An object containing:
  - `orderIds` (array of strings, required): An array of order IDs to be canceled (maximum of 25 orders).

#### Returns

- **Promise<any>**: Resolves with the response data for the canceled orders.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const cancelAllOrders = async () => {
  try {
    const request = {
      orderIds: [ORDER_ID],
    };

    const data = await lcxClient.orderCancelAll(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
cancelAllOrders();
```

### openOrdersGet

Fetches open orders that are pending execution on the LCX Exchange. This method retrieves a list of all open orders that are ready for execution based on the specified criteria such as offset, market pair, and date range.

- **Description**: This function allows users to fetch open orders that are yet to be executed on the LCX Exchange. The response includes details about the orders that are still active, pending execution. The request can include optional filters such as market pair and date range.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **payload** (required, `OpenOrdersPayload`): An object containing:
  - `offset` (number, required): Page index for pagination. The first page is index `1`, and the page size is fixed at 100.
  - `pair` (string, optional): The market pair to filter orders by (e.g., "LCX/USDC").
  - `fromDate` (number, optional): Timestamp in milliseconds representing the start date for orders to fetch.
  - `toDate` (number, optional): Timestamp in milliseconds representing the end date for orders to fetch.

#### Returns

- **Promise<any>**: Resolves with the data containing the open orders.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const getOpenOrders = async () => {
  try {
    const request = {
      pair: 'ETH/BTC',
      offset: 1,
    };

    const data = await lcxClient.openOrdersGet(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
getOpenOrders();
```

### orderDetailsGet

Fetches the details of a specific order on the LCX Exchange. This method retrieves detailed information about a single order by its ID.

- **Description**: This function allows users to fetch detailed information about a specific order on the LCX Exchange, based on the provided order ID. The response includes various details related to the order such as its status, amount, price, and other relevant data.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **payload** (required, `OrderDetailsPayload`): An object containing:
  - `orderId` (string, required): The unique ID of the order to retrieve.

#### Returns

- **Promise<any>**: Resolves with the data containing the details of the specified order.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const getOrderDetails = async () => {
  try {
    const request = {
      orderId: ORDER_ID,
    };

    const data = await lcxClient.orderDetailsGet(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
getOrderDetails();
```

### orderHistoryGet

Fetches the order history for the specified criteria on the LCX Exchange. This method retrieves previously closed or cancelled orders, based on various filter parameters such as market pair, date range, order side, status, and type.

- **Description**: This function allows users to fetch the order history, which includes orders that have been closed or cancelled. Users can filter the results based on parameters like market pair, order side, status, and order type.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **payload** (required, `OrderHistoryPayload`): An object containing:
  - `offset` (number, required): The page index to retrieve (first page = 1, fixed page size = 100).
  - `pair` (string, optional): The market pair, e.g., "LCX/EUR".
  - `fromDate` (number, optional): Timestamp in milliseconds specifying the start date for orders.
  - `toDate` (number, optional): Timestamp in milliseconds specifying the end date for orders.
  - `side` ("BUY" | "SELL", optional): The side of the order ("BUY" or "SELL").
  - `orderStatus` ("CANCEL" | "CLOSED", optional): The status of the order ("CANCEL" or "CLOSED").
  - `orderType` ("LIMIT" | "MARKET", optional): The type of order ("LIMIT" or "MARKET").

#### Returns

- **Promise<any>**: Resolves with the order history data, which contains a list of orders that match the specified criteria.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const getOrderHistory = async () => {
  try {
    const request = {
      pair: 'ETH/BTC',
      offset: 1,
    };

    const data = await lcxClient.orderHistoryGet(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
getOrderHistory();
```

### tradeHistoryGet

Fetches the trade history based on specified criteria on the LCX Exchange. This method retrieves all executed orders for the user, including parameters like market pair, date range, etc.

- **Description**: This function allows users to fetch their trade history, which includes all trades executed on the platform. Users can filter the results based on parameters such as market pair and date range.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **payload** (required, `TradeHistoryPayload`): An object containing:
  - `offset` (number, required): The page index to retrieve (first page = 1, fixed page size = 100).
  - `pair` (string, optional): The market pair, e.g., "LCX/EUR".
  - `fromDate` (number, optional): Timestamp in milliseconds specifying the start date for trades.
  - `toDate` (number, optional): Timestamp in milliseconds specifying the end date for trades.

#### Returns

- **Promise<any>**: Resolves with the trade history data, which contains a list of trades that match the specified criteria.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const getTradeHistory = async () => {
  try {
    const request = {
      pair: 'ETH/BTC',
      offset: 1,
    };

    const data = await lcxClient.tradeHistoryGet(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
getTradeHistory();
```

### balancesGet

Fetches the balances for all listed coins on the LCX Exchange. This method retrieves the user's current balances across all listed coins available on the platform.

- **Description**: This function allows users to fetch their balances for all listed coins on the exchange, which includes the available balance for each coin.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **None**: This method does not require any parameters.

#### Returns

- **Promise<any>**: Resolves with the user's balances data, which contains the balances of all the listed coins on the exchange.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const getBalances = async () => {
  try {
    const data = await lcxClient.balancesGet();

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
getBalances();
```

### balanceGet

Fetches the balance for a specific coin on the LCX Exchange. This method retrieves the user's balance for a specified coin available on the platform.

- **Description**: This function allows users to fetch their balance for a specific coin (e.g., LCX, USDC) on the exchange. It requires the coin symbol as a parameter to retrieve the relevant balance.
- **Authentication**: Requires API key and secret key for authentication.

#### Parameters

- **`payload`** (object, required): Contains the following field:
  - `coin` (string): The symbol of the coin for which the balance is retrieved (e.g., `"LCX"`, `"USDC"`).

#### Returns

- **Promise<any>**: Resolves with the balance data for the specified coin.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

const getBalance = async () => {
  try {
    const request = {
      coin: 'LCX',
    };

    const data = await lcxClient.balanceGet(request);

    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
getBalance();
```

### subscribeTicker

Establishes a WebSocket connection to the LCX Exchange and subscribes to ticker updates for a specified trading pair. This allows you to receive real-time market data for the pair you are interested in.

- **Description**: This function opens a WebSocket connection and subscribes to ticker updates for a specified pair. It sends the updates as incoming messages to the provided callback function.
- **Authentication**: This function does not require authentication, but you need to be connected to the WebSocket API endpoint.
- **Note:** This WebSocket connection does not require authentication. Upon connecting, an initial message(`Subscribed Successfully`) indicating a successful connection will be sent, followed by real-time ticker updates.

#### Parameters

- **`onMessage`** (function, required): A callback function to handle incoming messages. This function will be called whenever a message is received, and it will receive the message data as its argument.

#### Example

```typescript
const lcxClient = new LcxApi();

lcxClient.subscribeTicker((data) => {
  if (data.type === 'status') {
    console.log('Status Message:', data.message);
  } else if (data.type === 'error') {
    console.error('Error:', data.message, data.error);
  } else {
    console.log('Ticker Data:', data);
  }
});
```

### subscribeOrderbook

Establishes a WebSocket connection to the LCX Exchange and subscribes to order book updates for a specified trading pair. This allows you to receive real-time order book data for the pair you are interested in.

- **Description**: This function opens a WebSocket connection and subscribes to order book updates for a specified pair. It sends the updates as incoming messages to the provided callback function.
- **Authentication**: This function does not require authentication, but you need to be connected to the WebSocket API endpoint.

#### Parameters

- **`pair`** (string, required): The trading pair to subscribe to. Example: `"LCX/USDC"`.
- **`onMessage`** (function, required): A callback function to handle incoming messages. This function will be called whenever a message is received, and it will receive the message data as its argument.

#### Example

```typescript
const lcxClient = new LcxApi();

lcxClient.subscribeOrderbook('ETH/BTC', (data) => {
  if (data.type === 'status') {
    console.log('Status Message:', data.message);
  } else if (data.type === 'error') {
    console.error('Error:', data.message, data.error);
  } else {
    console.log('Order book Data:', data);
  }
});
```

### subscribeTrade

Establishes a WebSocket connection to the LCX Exchange and subscribes to trade updates for a specified trading pair. This allows you to receive real-time trade data for the pair you are interested in.

- **Description**: This function opens a WebSocket connection and subscribes to trade updates for a specified pair. It sends the updates as incoming messages to the provided callback function.
- **Authentication**: This function does not require authentication, but you need to be connected to the WebSocket API endpoint.

#### Parameters

- **`pair`** (string, required): The trading pair to subscribe to. Example: `"ETH/BTC"`.
- **`onMessage`** (function, required): A callback function to handle incoming messages. This function will be called whenever a message is received, and it will receive the message data as its argument.

#### Example

```typescript
const lcxClient = new LcxApi();

lcxClient.subscribeTrade('ETH/BTC', (data) => {
  if (data.type === 'status') {
    console.log('Status Message:', data.message);
  } else if (data.type === 'error') {
    console.error('Error:', data.message, data.error);
  } else {
    console.log('Trade Data:', data);
  }
});
```

### subscribeWallets

Establishes a WebSocket connection to the LCX Exchange and subscribes to wallet updates for the user's account. This allows you to receive real-time updates about changes in your wallet, such as deposit or withdrawal events.

- **Description**: This function opens a WebSocket connection and subscribes to wallet updates, sending the incoming messages to the provided callback function. It requires the user's API key and secret key for authentication.
- **Authentication**: Both the `API-KEY` and `SECRET-KEY` are required for this function to authenticate the WebSocket connection.

#### Parameters

- **`onMessage`** (function, required): A callback function to handle incoming messages. This function will be called whenever a message is received, and it will receive the message data as its argument.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

lcxClient.subscribeWallets((data) => {
  if (data.type === 'status') {
    console.log('Status Message:', data.message);
  } else if (data.type === 'error') {
    console.error('Error:', data.message, data.error);
  } else {
    console.log('Wallet Data:', data);
  }
});
```

### subscribeOrders

Establishes a WebSocket connection to the LCX Exchange and subscribes to real-time order updates for the user's account. This allows you to receive live notifications of order statuses, including new orders, order cancellations, or modifications.

- **Description**: This function opens a WebSocket connection and subscribes to order updates. It will send the incoming messages to the provided callback function. Authentication is required via the user's `API-KEY` and `SECRET-KEY`.

#### Parameters

- **`onMessage`** (function, required): A callback function to handle incoming messages. The function receives the message data as its argument, allowing you to process order updates.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

lcxClient.subscribeOrders((data) => {
  if (data.type === 'status') {
    console.log('Status Message:', data.message);
  } else if (data.type === 'error') {
    console.error('Error:', data.message, data.error);
  } else {
    console.log('Orders Data:', data);
  }
});
```

### subscribeTrades

Establishes a WebSocket connection to the LCX Exchange and subscribes to real-time trade updates for the user's account. This allows you to receive live notifications about completed trades on the user's account.

- **Description**: This function opens a WebSocket connection and subscribes to trade updates. It sends the incoming messages to the provided callback function. Authentication is required via the user's `API-KEY` and `SECRET-KEY`.

#### Parameters

- **`onMessage`** (function, required): A callback function to handle incoming messages. The function receives the message data as its argument, which will include trade details or error messages.

#### Example

```typescript
const configuration = new Configuration({
  baseOptions: {
    headers: {
      'API-KEY': API_KEY,
      'SECRET-KEY': SECRET_KEY,
    },
  },
});

const lcxClient = new LcxApi(configuration);

lcxClient.subscribeTrades((data) => {
  if (data.type === 'status') {
    console.log('Status Message:', data.message);
  } else if (data.type === 'error') {
    console.error('Error:', data.message, data.error);
  } else {
    console.log('Trades Data:', data);
  }
});
```

## Support

Open an [issue]!

## License

[MIT]

[1]: https://docs.lcx.com/
