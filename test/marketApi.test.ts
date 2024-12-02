import { LcxApi } from "../src/api/lcxApi";
import {
  OrderBookPayload,
  MarketKlinePayload,
  TradesPayload,
  MarketPairPayload,
  MarketTickerPayload,
} from "../src/types";

describe("MarketApi", () => {
  let lcxClient: LcxApi;

  beforeAll(() => {
    lcxClient = new LcxApi();
  });

  test("orderBookDetailsGet should return status 200", async () => {
    const payload: OrderBookPayload = { pair: "LCX/EUR" };

    const result = await lcxClient.orderBookDetailsGet(payload);

    expect(result.status).toEqual("success");
  });

  test("orderBookDetailsGet should throw error for invalid payload", async () => {
    const invalidPayload = { pair: "" };

    await expect(
      lcxClient.orderBookDetailsGet(invalidPayload as any)
    ).rejects.toThrowError();
  });

  test("marketKlineDetailsGet should return valid OHLCV data", async () => {
    const payload: MarketKlinePayload = {
      pair: "LCX/EUR",
      resolution: "60",
      from: 1633776000,
      to: 1633779600,
    };

    const result = await lcxClient.marketKlineDetailsGet(payload);

    expect(result.status).toEqual("success");
  });

  test("marketKlineDetailsGet should throw error for invalid payload", async () => {
    const invalidPayload = {
      pair: "",
      resolution: "60",
      from: 1633776000,
      to: 1633779600,
    };

    await expect(
      lcxClient.marketKlineDetailsGet(invalidPayload as any)
    ).rejects.toThrowError();
  });

  test("marketKlineDetailsGet should throw error for missing parameters", async () => {
    const invalidPayload = { pair: "LCX/EUR" };

    await expect(
      lcxClient.marketKlineDetailsGet(invalidPayload as any)
    ).rejects.toThrowError();
  });

  test("marketTradesGet should return trade data", async () => {
    const payload: TradesPayload = {
      pair: "LCX/ETH",
      offset: 1,
    };

    const result = await lcxClient.marketTradesGet(payload);

    expect(result.status).toEqual("success");
  });

  test("marketTradesGet should throw error for invalid payload", async () => {
    const invalidPayload = { pair: "", offset: 1 };

    await expect(
      lcxClient.marketTradesGet(invalidPayload as any)
    ).rejects.toThrowError();
  });

  test("marketTradesGet should throw error for missing required parameters", async () => {
    const invalidPayload = { pair: "LCX/ETH" }; // Missing `offset`

    await expect(
      lcxClient.marketTradesGet(invalidPayload as any)
    ).rejects.toThrowError();
  });

  test("marketPairsGet should return available market pairs", async () => {
    const result = await lcxClient.marketPairsGet();

    expect(result.status).toEqual("success");
  });

  test("marketPairDetailsGet should return details of the trading pair", async () => {
    const payload: MarketPairPayload = { pair: "LCX/ETH" };

    const result = await lcxClient.marketPairDetailsGet(payload);

    expect(result.status).toEqual("success");
  });

  test("marketPairDetailsGet should throw error for invalid pair", async () => {
    const invalidPayload = { pair: "" };

    await expect(
      lcxClient.marketPairDetailsGet(invalidPayload as any)
    ).rejects.toThrowError();
  });

  test("marketTickersGet should return tickers for multiple trading pairs", async () => {
    const result = await lcxClient.marketTickersGet();

    expect(result.status).toEqual("success");
  });

  test("marketTickerGet should return ticker for a specific trading pair", async () => {
    const payload: MarketTickerPayload = { pair: "LCX/ETH" };

    const result = await lcxClient.marketTickerGet(payload);

    expect(result.status).toEqual("success");
  });

  test("marketTickerGet should throw error for invalid pair", async () => {
    const invalidPayload = { pair: "" };

    await expect(
      lcxClient.marketTickerGet(invalidPayload as any)
    ).rejects.toThrowError();
  });
});
