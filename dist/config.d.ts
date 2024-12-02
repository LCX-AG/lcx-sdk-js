import { AxiosInstance } from 'axios';
interface ConfigurationOptions {
    baseOptions?: {
        headers: {
            'API-KEY': string;
            'SECRET-KEY': string;
        };
    };
}
export declare class Configuration {
    axiosInstance: AxiosInstance;
    apiKey?: string;
    secretKey?: string;
    constructor(options: ConfigurationOptions);
}
export {};
