export interface Config {
    tokenSecretKey: string;
    databaseConnectionString: string;
}

/*
Example config to be placed in config.ts

import { Config } from './config.interface';

export const config: Config = {
    tokenSecretKey: ''
};

 */
