export interface IConfig {
    tokenSecretKey: string;
    databaseConnectionString: string;
}

/*
Example config to be placed in config.ts

import { IConfig } from './config.interface';

export const config: IConfig = {
    tokenSecretKey: ''
};

 */
