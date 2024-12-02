import { OrderSide, OrderStatus, OrderType } from './enums';
import {
  OrderBookPayload,
  MarketKlinePayload,
  TradesPayload,
  MarketPairPayload,
  MarketTickerPayload,
  OrderCreatePayload,
  OrderModifyPayload,
  OrderCancelPayload,
  OrderCancelAllPayload,
  OpenOrdersPayload,
  OrderDetailsPayload,
  OrderHistoryPayload,
  TradeHistoryPayload,
  CoinBalanceDetailsPayload,
} from './types';

export function validateOrderBookPayload(payload: OrderBookPayload) {
  const { pair } = payload;

  // Check for required fields and their types
  if (!pair) {
    throw new Error("Validation Error: 'pair' is required.");
  }

  if (typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }
}

export function validateMarketKlinePayload(payload: MarketKlinePayload) {
  const { pair, resolution, from, to } = payload;

  // Check for required fields and their types
  if (!pair) {
    throw new Error("Validation Error: 'pair' is required.");
  }

  if (typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }

  if (!resolution) {
    throw new Error("Validation Error: 'resolution' is required.");
  }

  if (typeof resolution !== 'string') {
    throw new Error(
      `Validation Error: Expected 'resolution' to be a string, but received ${typeof resolution}`,
    );
  }

  if (!from) {
    throw new Error("Validation Error: 'from' is required.");
  }

  if (typeof from !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'from' to be a number, but received ${typeof from}`,
    );
  }

  if (!to) {
    throw new Error("Validation Error: 'to' is required.");
  }

  if (typeof to !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'to' to be a number, but received ${typeof to}`,
    );
  }
}

export function validateTradesPayload(payload: TradesPayload) {
  const { pair, offset } = payload;

  // Check for required fields and their types
  if (!pair) {
    throw new Error("Validation Error: 'pair' is required.");
  }

  if (typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }

  if (!offset) {
    throw new Error("Validation Error: 'offset' is required.");
  }

  if (typeof offset !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'offset' to be a number, but received ${typeof offset}`,
    );
  }
}

export function validateMarketPairPayload(payload: MarketPairPayload) {
  const { pair } = payload;

  // Check for required fields and their types
  if (!pair) {
    throw new Error("Validation Error: 'pair' is required.");
  }

  if (typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }
}

export function validateMarketTickerPayload(payload: MarketTickerPayload) {
  const { pair } = payload;

  // Check for required fields and their types
  if (!pair) {
    throw new Error("Validation Error: 'pair' is required.");
  }

  if (typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }
}

export function validateOrderCreatePayload(payload: OrderCreatePayload) {
  const { pair, amount, price, orderType, side, clientOrderId } = payload;

  // Check for required fields and their types
  if (!pair) {
    throw new Error("Validation Error: 'pair' is required.");
  }

  if (typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }

  if (!amount) {
    throw new Error("Validation Error: 'amount' is required.");
  }

  if (typeof amount !== 'number' || amount <= 0 || !Number.isFinite(amount)) {
    throw new Error(
      "Validation error: 'amount' should be a positive floating-point number.",
    );
  }

  if (
    price !== undefined &&
    (typeof price !== 'number' || price <= 0 || !Number.isFinite(price))
  ) {
    throw new TypeError(
      "Validation error: 'price' should be a positive floating-point number.",
    );
  }

  if (
    orderType !== undefined &&
    !Object.values(OrderType).includes(orderType)
  ) {
    throw new Error(
      `Validation Error: Invalid 'orderType' value. Expected 'LIMIT' or 'MARKET', but received ${orderType}`,
    );
  }

  if (side !== undefined && !Object.values(OrderSide).includes(side)) {
    throw new Error(
      `Validation Error: Invalid 'side' value. Expected 'BUY' or 'SELL', but received ${side}`,
    );
  }

  if (clientOrderId !== undefined && typeof clientOrderId !== 'string') {
    throw new TypeError(
      `Validation Error: Expected 'clientOrderId' to be a string, but received ${typeof clientOrderId}`,
    );
  }

  if (
    orderType === 'LIMIT' &&
    (typeof price !== 'number' || price <= 0 || !Number.isFinite(price))
  ) {
    throw new Error(
      "Validation error: 'price' is required for limit orders and should be a positive floating-point number.",
    );
  }
}

export function validateOrderModifyPayload(payload: OrderModifyPayload) {
  const { orderId, amount, price } = payload;

  // Check for required fields and their types
  if (!orderId) {
    throw new Error("Validation Error: 'orderId' is required.");
  }

  if (typeof orderId !== 'string') {
    throw new Error(
      `Validation Error: Expected 'orderId' to be a string, but received ${typeof orderId}`,
    );
  }

  if (!amount) {
    throw new Error("Validation Error: 'amount' is required.");
  }

  if (typeof amount !== 'number' || amount <= 0 || !Number.isFinite(amount)) {
    throw new Error(
      "Validation error: 'amount' should be a positive floating-point number.",
    );
  }

  if (!price) {
    throw new Error("Validation Error: 'price' is required.");
  }

  if (typeof price !== 'number' || price <= 0 || !Number.isFinite(price)) {
    throw new TypeError(
      "Validation error: 'price' should be a positive floating-point number.",
    );
  }
}

export function validateOrderCancelPayload(payload: OrderCancelPayload) {
  const { orderId } = payload;

  // Check for required fields and their types
  if (!orderId) {
    throw new Error("Validation Error: 'orderId' is required.");
  }

  if (typeof orderId !== 'string') {
    throw new Error(
      `Validation Error: Expected 'orderId' to be a string, but received ${typeof orderId}`,
    );
  }
}

export function validateOrderCancelAllPayload(payload: OrderCancelAllPayload) {
  const { orderIds } = payload;

  // Check for required fields and their types
  if (!orderIds) {
    throw new Error("Validation Error: 'orderIds' is required.");
  }

  if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
    throw new Error("The 'orderIds' parameter must be a non-empty array.");
  }

  if (orderIds.length > 25) {
    throw new Error('You can cancel a maximum of 25 orders at a time.');
  }
}

export function validateOpenOrdersPayload(payload: OpenOrdersPayload) {
  const { pair, offset, fromDate, toDate } = payload;

  // Check for required fields and their types
  if (pair !== undefined && typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }

  if (!offset) {
    throw new Error("Validation Error: 'offset' is required.");
  }

  if (typeof offset !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'offset' to be a number, but received ${typeof offset}`,
    );
  }

  if (fromDate !== undefined && typeof fromDate !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'fromDate' to be a number, but received ${typeof fromDate}`,
    );
  }

  if (toDate !== undefined && typeof toDate !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'toDate' to be a number, but received ${typeof toDate}`,
    );
  }
}

export function validateOrderDetailsPayload(payload: OrderDetailsPayload) {
  const { orderId } = payload;

  // Check for required fields and their types
  if (!orderId) {
    throw new Error("Validation Error: 'orderId' is required.");
  }

  if (typeof orderId !== 'string') {
    throw new Error(
      `Validation Error: Expected 'orderId' to be a string, but received ${typeof orderId}`,
    );
  }
}

export function validateOrderHistoryPayload(payload: OrderHistoryPayload) {
  const { pair, offset, fromDate, toDate, side, orderStatus, orderType } =
    payload;

  // Check for required fields and their types
  if (pair !== undefined && typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }

  if (!offset) {
    throw new Error("Validation Error: 'offset' is required.");
  }

  if (typeof offset !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'offset' to be a number, but received ${typeof offset}`,
    );
  }

  if (fromDate !== undefined && typeof fromDate !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'fromDate' to be a number, but received ${typeof fromDate}`,
    );
  }

  if (toDate !== undefined && typeof toDate !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'toDate' to be a number, but received ${typeof toDate}`,
    );
  }

  if (side !== undefined && !Object.values(OrderSide).includes(side)) {
    throw new Error(
      `Validation Error: Invalid 'side' value. Expected 'BUY' or 'SELL', but received ${side}`,
    );
  }

  if (
    orderStatus !== undefined &&
    !Object.values(OrderStatus).includes(orderStatus)
  ) {
    throw new Error(
      `Validation Error: Invalid 'orderStatus' value. Expected 'CANCEL' or 'CLOSED', but received ${orderStatus}`,
    );
  }

  if (
    orderType !== undefined &&
    !Object.values(OrderType).includes(orderType)
  ) {
    throw new Error(
      `Validation Error: Invalid 'orderType' value. Expected 'LIMIT' or 'MARKET', but received ${orderType}`,
    );
  }
}

export function validateTradeHistoryPayload(payload: TradeHistoryPayload) {
  const { pair, offset, fromDate, toDate } = payload;

  // Check for required fields and their types
  if (pair !== undefined && typeof pair !== 'string') {
    throw new Error(
      `Validation Error: Expected 'pair' to be a string, but received ${typeof pair}`,
    );
  }

  if (!offset) {
    throw new Error("Validation Error: 'offset' is required.");
  }

  if (typeof offset !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'offset' to be a number, but received ${typeof offset}`,
    );
  }

  if (fromDate !== undefined && typeof fromDate !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'fromDate' to be a number, but received ${typeof fromDate}`,
    );
  }

  if (toDate !== undefined && typeof toDate !== 'number') {
    throw new TypeError(
      `Validation Error: Expected 'toDate' to be a number, but received ${typeof toDate}`,
    );
  }
}

export function validateCoinBalanceDetailsPayload(
  payload: CoinBalanceDetailsPayload,
) {
  const { coin } = payload;

  // Check for required fields and their types
  if (!coin) {
    throw new Error("Validation Error: 'coin' is required.");
  }

  if (typeof coin !== 'string') {
    throw new Error(
      `Validation Error: Expected 'coin' to be a string, but received ${typeof coin}`,
    );
  }
}
