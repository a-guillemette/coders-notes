import { DataObject } from './data-object';

export class BaseDataObject {
    clone(): this {
        return DataObject.clone(this);
    }

    set(dto: this | any): this {
        return DataObject.set(this, dto);
    }

    equals(dataObject: this): boolean {
        return DataObject.equals(this, dataObject);
    }
}
