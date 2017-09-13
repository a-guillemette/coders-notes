import { TypeHandler } from '../type-handler';
import { DataObject } from '../data-object';

export class DataObjectTypeHandler implements TypeHandler<Object> {
    clone(dataObject: any): Object {
        if (!dataObject) {
            return undefined;
        }

        const clone = new (dataObject as any).constructor();

        const properties = DataObject.getProperties(dataObject);
        const nbProperties = properties ? properties.length : 0;

        if (nbProperties > 0) {
            for (let i = 0; i < nbProperties; i++) {
                const property = properties[i];
                if (property.type) {
                    const typeHandler = DataObject.getTypeHandler(property.type);
                    const isArray = Array.isArray(dataObject[property.field]);
                    if (isArray) {
                        const nbItems = dataObject[property.field].length;
                        clone[property.field] = new Array<any>(nbItems);
                        for (let j = 0; j < nbItems; j++) {
                            clone[property.field][j] = typeHandler.clone(dataObject[property.field][j]);
                        }
                    } else {
                        clone[property.field] = typeHandler.clone(dataObject[property.field]);
                    }
                } else {
                    clone[property.field] = dataObject[property.field];
                }
            }
        } else {
            console.warn('DataObjectTypeHandler: Object of type ' + dataObject.constructor.name + ' doesn\'t have any properties defined.');
        }

        return clone;
    }

    set(dataObject: any, dto: Object | any, group?: number) {
        if (!dataObject) {
            return;
        }

        const properties = DataObject.getProperties(dataObject, group);
        const nbProperties = properties ? properties.length : 0;

        if (nbProperties > 0) {
            for (let i = 0; i < nbProperties; i++) {
                const property = properties[i];
                if (property.type) {
                    const typeHandler = DataObject.getTypeHandler(property.type);
                    const isArray = Array.isArray(dto[property.field]);
                    if (isArray) {
                        const nbItems = dto[property.field].length;
                        if (!dataObject[property.field] || dataObject[property.field].length !== nbItems) {
                            dataObject[property.field] = new Array<any>(nbItems);
                        }
                        for (let j = 0; j < nbItems; j++) {
                            if (!dto[property.field][j]) {
                                dataObject[property.field][j] = undefined;
                            } else {
                                if (!dataObject[property.field][j] || dataObject[property.field][j].constructor !== property.type) {
                                    dataObject[property.field][j] = new property.type();
                                }
                                typeHandler.set(dataObject[property.field][j], dto[property.field][j]);
                            }
                        }
                    } else {
                        if (!dto[property.field]) {
                            dataObject[property.field] = undefined;
                        } else {
                            if (!dataObject[property.field] || dataObject[property.field].constructor !== property.type) {
                                dataObject[property.field] = new property.type();
                            }
                            typeHandler.set(dataObject[property.field], dto[property.field]);
                        }
                    }
                } else {
                    dataObject[property.field] = dto[property.field];
                }
            }
        } else {
            console.warn('DataObjectTypeHandler: Object of type ' + dataObject.constructor.name + ' doesn\'t have any properties defined.');
        }
    }

    equals(dataObject1: any, dataObject2: any): boolean {
        if ((!dataObject1 && !dataObject2) || dataObject1 === dataObject2) {
            return true;
        } else if (!dataObject1 || !dataObject2 || dataObject1.constructor !== dataObject2.constructor) {
            return false;
        }

        const properties = DataObject.getProperties(dataObject1);
        const nbProperties = properties ? properties.length : 0;

        if (nbProperties > 0) {
            for (let i = 0; i < nbProperties; i++) {
                const property = properties[i];
                if (property.type) {
                    if (!dataObject1[property.field] !== !dataObject2[property.field]) {
                        return false;
                    } else if (!!dataObject1[property.field] && !!dataObject2[property.field]) {
                        const typeHandler = DataObject.getTypeHandler(property.type);
                        const isArray = Array.isArray(dataObject1[property.field]);
                        if (isArray) {
                            const nbItems = dataObject1[property.field].length;
                            if (nbItems !== dataObject2.length) {
                                return false;
                            }
                            for (let j = 0; j < nbItems; j++) {
                                if (!typeHandler.equals(dataObject1[property.field][j], dataObject2[property.field][j])) {
                                    return false;
                                }
                            }
                        } else if (!typeHandler.equals(dataObject1[property.field], dataObject2[property.field])) {
                            return false;
                        }
                    }
                } else if (dataObject1[property.field] !== dataObject2[property.field]) {
                    return false;
                }
            }
        }

        return true;
    }
}
