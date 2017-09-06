import { ObjectID } from 'bson';

export class IdFilter {
    [index: string]: any;

    private __objectId: ObjectID;

    constructor(id: string | number | ObjectID) {
        this.__objectId = new ObjectID(id);
    }

    get _id(): any {
        return this.__objectId;
    }
}
