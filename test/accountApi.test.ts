import { Configuration } from '../src/config';
import { LcxApi } from '../src/api/lcxApi';
import { LcxEnvironments } from '../src/enums';
import { CoinBalanceDetailsPayload } from '../src/types';

describe('AccountApi', () => {
  let lcxClient: LcxApi;

  beforeAll(() => {
    const config = new Configuration({
      environment: LcxEnvironments.sandbox,
      baseOptions: {
        headers: {
          'API-KEY': 'test-api-key',
          'SECRET-KEY': 'test-secret-key',
        },
      },
    });

    lcxClient = new LcxApi(config);
  });

  test('balancesGet should return balances data for all listed coins', async () => {
    const result = await lcxClient.balancesGet();

    expect(result.status).toEqual('success');
  });

  test('balancesGet should throw error if API-KEY or SECRET-KEY is missing', async () => {
    const configWithoutKeys = new Configuration({
      environment: LcxEnvironments.sandbox,
    });
    const lcxClientWithoutKeys = new LcxApi(configWithoutKeys);

    await expect(lcxClientWithoutKeys.balancesGet()).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.",
    );
  });

  test('balanceGet should return the balance for a specific coin', async () => {
    const payload: CoinBalanceDetailsPayload = { coin: 'LCX' };

    const result = await lcxClient.balanceGet(payload);

    expect(result.status).toEqual('success');
  });

  test('balanceGet should throw error for invalid coin or missing coin parameter', async () => {
    const invalidPayload = { coin: '' };

    await expect(
      lcxClient.balanceGet(invalidPayload as any),
    ).rejects.toThrowError();
  });

  test('balanceGet should throw error if API-KEY or SECRET-KEY is missing', async () => {
    const configWithoutKeys = new Configuration({
      environment: LcxEnvironments.sandbox,
    });
    const lcxClientWithoutKeys = new LcxApi(configWithoutKeys);

    const payload: CoinBalanceDetailsPayload = { coin: 'LCX' };

    await expect(lcxClientWithoutKeys.balanceGet(payload)).rejects.toThrowError(
      "Authentication error: 'API-KEY' and 'SECRET-KEY' are required for this request.",
    );
  });
});