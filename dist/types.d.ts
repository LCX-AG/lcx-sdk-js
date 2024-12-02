import { OrderSide, OrderStatus, OrderType } from './enums';
export interface OrderBookPayload {
    pair: string;
}
export interface MarketKlinePayload {
    pair: string;
    resolution: string;
    from: number;
    to: number;
}
export interface TradesPayload {
    pair: string;
    offset: number;
}
export interface MarketPairPayload {
    pair: string;
}
export interface MarketTickerPayload {
    pair: string;
}
export interface OrderCreatePayload {
    pair: string;
    amount: number;
    price: number;
    orderType: OrderType;
    side: OrderSide;
    clientOrderId?: string;
}
export interface OrderModifyPayload {
    orderId: string;
    amount: number;
    price: number;
}
export interface OrderCancelPayload {
    orderId: string;
}
export interface OrderCancelAllPayload {
    orderIds: string[];
}
export interface OpenOrdersPayload {
    pair?: string;
    offset: number;
    fromDate?: number;
    toDate?: number;
}
export interface OrderDetailsPayload {
    orderId: string;
}
export interface OrderHistoryPayload {
    pair?: string;
    offset: number;
    fromDate?: number;
    toDate?: number;
    side?: OrderSide;
    orderStatus?: OrderStatus;
    orderType?: OrderType;
}
export interface TradeHistoryPayload {
    pair?: string;
    offset: number;
    fromDate?: number;
    toDate?: number;
}
export interface CoinBalanceDetailsPayload {
    coin: string;
}
