declare const Reflect: any;

/*
    Utility functions
 */
export function getProperties(dataObject: DataObject): Array<DataObjectProperty> {
    return Reflect.getMetadata('properties', dataObject) || [];
}

export function setProperties(dataObject: DataObject, properties: Array<DataObjectProperty>) {
    return Reflect.defineMetadata('properties', properties, dataObject);
}

function createInstance<T extends Object>(object: T): T {
    return new (object as any).constructor();
}

function createType<T extends DataObject | Date>(type: { new(): T; }, current: T, value: any): DataObject | Date {
    if (type instanceof DataObject) {
        return (current instanceof type ? current as DataObject : <DataObject>new type()).set(value);
    } else if (type instanceof Date) {
        return new Date(value);
    } else {
        throw new Error('Unsupported DateObject Property type: ' + JSON.stringify(type));
    }
}

function equalsType<T extends DataObject | Date>(type: { new(): T; }, value1: T, value2: T): boolean {
    if (type instanceof DataObject) {
        return !value1 === !value2 && (!value1 || (value1 as DataObject).equals(value2 as DataObject));
    } else if (type instanceof Date) {
        return +value1 === +value2;
    } else {
        return value1 === value2;
    }
}

/**
 * Interface for the property metadata.
 * The metadata is set by using the Prop decorator and
 * used by data object for copy, set and equals methods.
 */
export interface DataObjectProperty {
    field: string | symbol;
    type?: { new(): DataObject | Date; };
}

export abstract class DataObject {
    copy(): this {
        const copy = createInstance(this);
        copy.set(this);
        return copy;
    }

    set(dto: any): this {
        const properties = getProperties(this);
        const nbProp = properties.length;

        for (let i = 0; i < nbProp; i++) {
            const prop = properties[i];
            if (prop.type && dto[prop.field]) {
                const isArray = dto[prop.field];
                if (isArray) {
                    const nbItem = dto[prop.field].length;
                    (<any>this)[prop.field] = new Array(nbItem);
                    for (let j = 0; j < nbItem; j++) {
                        (<any>this)[prop.field][j] = createType(prop.type, undefined, dto[prop.field][j]);
                    }
                } else {
                    (<any>this)[prop.field] = createType(prop.type, (<any>this)[prop.field], dto[prop.field]);
                }
            } else {
                (<any>this)[prop.field] = dto[prop.field];
            }
        }

        return this;
    }

    equals(dataObject: this): boolean {
        const properties = getProperties(this);
        const nbProp = properties.length;

        for (let i = 0; i < nbProp; i++) {
            const prop = properties[i];
            if (prop.type) {
                const isArray = (<any>this)[prop.field];
                if (isArray) {
                    const nbItem = (<any>this)[prop.field].length;
                    if (nbItem !== (<any>dataObject)[prop.field].length) {
                        return false;
                    }
                    for (let j = 0; j < nbItem; j++) {
                        if (!equalsType(prop.type, (<any>this)[prop.field][j], (<any>dataObject)[prop.field][j])) {
                            return false;
                        }
                    }
                } else if ((<any>this)[prop.field] !== (<any>dataObject)[prop.field]) {
                    return false;
                }
            }
        }

        return true;
    }
}
