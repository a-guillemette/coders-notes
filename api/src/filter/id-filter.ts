import { ObjectID } from 'bson';

export class IdFilter {
    [index: string]: any;

    _id: ObjectID;

    constructor(id: string | number | ObjectID) {
        this._id = new ObjectID(id);
    }
}
