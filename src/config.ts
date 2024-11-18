import axios, { AxiosInstance } from 'axios';
import { LcxEnvironments } from './enums';

interface ConfigurationOptions {
  baseOptions?: {
    headers: {
      'API-KEY': string;
      'SECRET-KEY': string;
    };
  };
}

export class Configuration {
  public axiosInstance: AxiosInstance;
  public apiKey?: string;
  public secretKey?: string;

  constructor(options: ConfigurationOptions) {
    this.apiKey = options.baseOptions?.headers['API-KEY'];
    this.secretKey = options.baseOptions?.headers['SECRET-KEY'];

    this.axiosInstance = axios.create({
      headers: {
        'x-access-key': this.apiKey,
        'x-access-sign': this.secretKey,
        'Content-Type': 'application/json',
      },
    });
  }
}
