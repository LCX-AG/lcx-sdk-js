import { Configuration } from "../src/config";
import { LcxApi } from "../src/api/lcxApi";
import { OrderSide, OrderType } from "../src/enums";
import {
  OrderCreatePayload,
  OrderModifyPayload,
  OrderCancelPayload,
  OrderCancelAllPayload,
  OpenOrdersPayload,
  OrderDetailsPayload,
  OrderHistoryPayload,
  TradeHistoryPayload,
} from "../src/types";

describe("TradingApi", () => {
  let lcxClient: LcxApi;

  beforeAll(() => {
    const config = new Configuration({
      baseOptions: {
        headers: {
          "API-KEY": "test-api-key",
          "SECRET-KEY": "test-secret-key",
        },
      },
    });

    lcxClient = new LcxApi(config);
  });

  test.skip("orderCreate should create a new order and return the order data", async () => {
    const payload: OrderCreatePayload = {
      pair: "VIS/USDC",
      amount: 10,
      price: 0.004,
      orderType: OrderType.MARKET,
      side: OrderSide.BUY,
    };

    const result = await lcxClient.orderCreate(payload);

    expect(result.status).toEqual("success");
  });

  test("orderCreate should throw an error if API-KEY or SECRET-KEY is missing", async () => {
    const lcxClientWithoutKeys = new LcxApi();

    const payload: OrderCreatePayload = {
      pair: "LCX/ETH",
      amount: 10,
      price: 1.5,
      orderType: OrderType.MARKET,
      side: OrderSide.BUY,
    };

    await expect(
      lcxClientWithoutKeys.orderCreate(payload)
    ).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request."
    );
  });

  test("orderModify should throw an error if API-KEY or SECRET-KEY is missing", async () => {
    const invalidConfig = new Configuration({});
    const invalidClient = new LcxApi(invalidConfig);

    const payload: OrderModifyPayload = {
      orderId: "123",
      amount: 10,
      price: 0.004,
    };

    await expect(invalidClient.orderModify(payload)).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request."
    );
  });

  test.skip("orderModify should modify an order successfully", async () => {
    const payload: OrderModifyPayload = {
      orderId: "123",
      amount: 10,
      price: 0.004,
    };

    const result = await lcxClient.orderModify(payload);

    expect(result.status).toEqual("success");
  });

  test("orderCancel should throw an error if API-KEY or SECRET-KEY is missing", async () => {
    const invalidConfig = new Configuration({});
    const invalidClient = new LcxApi(invalidConfig);

    const payload: OrderCancelPayload = {
      orderId: "123",
    };

    await expect(invalidClient.orderCancel(payload)).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request."
    );
  });

  test.skip("orderCancel should cancel an order successfully", async () => {
    const payload: OrderCancelPayload = {
      orderId: "123",
    };

    const result = await lcxClient.orderCancel(payload);

    expect(result.status).toEqual("success");
  });

  test("orderCancelAll should throw an error if API-KEY or SECRET-KEY is missing", async () => {
    const invalidConfig = new Configuration({});
    const invalidClient = new LcxApi(invalidConfig);

    const payload: OrderCancelAllPayload = {
      orderIds: ["123", "456"],
    };

    await expect(invalidClient.orderCancelAll(payload)).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request."
    );
  });

  test.skip("orderCancelAll should cancel multiple orders successfully", async () => {
    const payload: OrderCancelAllPayload = {
      orderIds: ["123", "456"],
    };

    const result = await lcxClient.orderCancelAll(payload);

    expect(result.status).toEqual("success");
  });

  test("openOrdersGet should throw an error if API-KEY or SECRET-KEY is missing", async () => {
    const invalidConfig = new Configuration({});
    const invalidClient = new LcxApi(invalidConfig);

    const payload: OpenOrdersPayload = {
      offset: 1,
    };

    await expect(invalidClient.openOrdersGet(payload)).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request."
    );
  });

  test.skip("openOrdersGet should fetch open orders successfully", async () => {
    const payload: OpenOrdersPayload = {
      offset: 1,
    };

    const result = await lcxClient.openOrdersGet(payload);

    expect(result.status).toEqual("success");
  });

  test("orderDetailsGet should throw an error if API-KEY or SECRET-KEY is missing", async () => {
    const invalidConfig = new Configuration({});
    const invalidClient = new LcxApi(invalidConfig);

    const payload: OrderDetailsPayload = {
      orderId: "orderId1",
    };

    await expect(invalidClient.orderDetailsGet(payload)).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request."
    );
  });

  test.skip("orderDetailsGet should fetch order details successfully", async () => {
    const payload: OrderDetailsPayload = {
      orderId: "orderId1",
    };

    const result = await lcxClient.orderDetailsGet(payload);

    expect(result.status).toEqual("success");
  });

  test("orderHistoryGet should throw an error if API-KEY or SECRET-KEY is missing", async () => {
    const invalidConfig = new Configuration({});
    const invalidClient = new LcxApi(invalidConfig);

    const payload: OrderHistoryPayload = {
      offset: 1,
    };

    await expect(invalidClient.orderHistoryGet(payload)).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request."
    );
  });

  test.skip("orderHistoryGet should fetch order history successfully", async () => {
    const payload: OrderHistoryPayload = {
      offset: 1,
    };

    const result = await lcxClient.orderHistoryGet(payload);

    expect(result.status).toEqual("success");
  });

  test("tradeHistoryGet should throw an error if API-KEY or SECRET-KEY is missing", async () => {
    const invalidConfig = new Configuration({});
    const invalidClient = new LcxApi(invalidConfig);

    const payload: TradeHistoryPayload = {
      offset: 1,
    };

    await expect(invalidClient.tradeHistoryGet(payload)).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request."
    );
  });

  test.skip("tradeHistoryGet should fetch trade history successfully", async () => {
    const payload: TradeHistoryPayload = {
      offset: 1,
    };

    const result = await lcxClient.tradeHistoryGet(payload);

    expect(result.status).toEqual("success");
  });
});
