import { LcxEnvironments } from '../enums';

export const baseUrls = {
  [LcxEnvironments.production]: {
    exchangeUrl: 'https://exchange-api.lcx.com',
    klineUrl: 'https://api-kline-staging.lcx.com',
    wsUrl: 'wss://exchange-api.lcx.com',
  },
};
