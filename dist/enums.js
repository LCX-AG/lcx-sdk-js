"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderType = exports.OrderStatus = exports.OrderSide = exports.LcxEnvironments = void 0;
var LcxEnvironments;
(function (LcxEnvironments) {
    LcxEnvironments["production"] = "PRODUCTION";
})(LcxEnvironments || (exports.LcxEnvironments = LcxEnvironments = {}));
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CANCEL"] = "CANCEL";
    OrderStatus["CLOSED"] = "CLOSED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var OrderType;
(function (OrderType) {
    OrderType["LIMIT"] = "LIMIT";
    OrderType["MARKET"] = "MARKET";
})(OrderType || (exports.OrderType = OrderType = {}));
