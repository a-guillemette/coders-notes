import { MongoClient, Db, MongoError } from 'mongodb';

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
        MongoClient.connect('mongodb://codersnotes-api:Password1@localhost:27017/codersnotes', (error, db) => {
            if (!error) {
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
