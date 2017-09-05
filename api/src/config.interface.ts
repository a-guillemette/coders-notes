export interface IConfig {
    port: number;
    debug: boolean;
    logRoutes: boolean;
    tokenSecretKey: string;
    databaseConnectionString: string;
}
