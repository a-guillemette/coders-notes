import { MongoClient, Db, MongoError } from 'mongodb';
import {Config} from './config';

export class DatabaseService {
    private static _instance: DatabaseService;
    static get instance(): DatabaseService {
        if (!DatabaseService._instance) {
            DatabaseService._instance = new DatabaseService();
        }
        return DatabaseService._instance;
    }

    static get db(): Db {
        return DatabaseService.instance.db;
    }

    private _db: Db;

    private constructor() {}

    get db(): Db {
        return this._db;
    }

    connect(onSuccess: (db: Db) => void, onError: (error: MongoError) => void) {
        MongoClient.connect(Config.current.databaseConnectionString, (error, db) => {
            if (!error) {
                this._db = db;
                onSuccess(db);
            } else {
                onError(error);
            }
        });
    }

    close() {
        if (this.db) {
            this.db.close(true);
        }
    }
}
