import { EmptyConstructor } from '../util';
import { DataObjectProperty } from './data-object-property';
import { DataObjectTypeHandler } from './type-handler/data-object.type-handler';
import { DateTypeHandler } from './type-handler/date.type-handler';
import { TypeHandler } from './type-handler';

declare const Reflect: any;

export class DataObject {
    private static TypeHandlers = new Map<EmptyConstructor<Object>, TypeHandler<Object>>([
        [Date, new DateTypeHandler()]
    ]);
    private static DataObjectHandler = new DataObjectTypeHandler();

    static getTypeHandler<T>(type: EmptyConstructor<T>): TypeHandler<T> {
        const typeHandler = DataObject.TypeHandlers.get(type) as TypeHandler<T>;
        if (typeHandler) {
            return typeHandler;
        } else if (DataObject.hasProperties(type.prototype)) {
            return DataObject.DataObjectHandler as TypeHandler<T>;
        } else {
            throw new Error('DataObject: No type handler registered for object: ' + JSON.stringify(type.prototype.name));
        }
    }

    static getProperties(dataObject: Object, group?: number): Array<DataObjectProperty> {
        let properties: Array<DataObjectProperty> = Reflect.getMetadata('properties', dataObject) || [];
        if (group > 0) {
            properties = properties.filter(p => (p.group & group) === group);
        }
        return properties;
    }

    static setProperties(dataObject: Object, properties: Array<DataObjectProperty>) {
        return Reflect.defineMetadata('properties', properties, dataObject);
    }

    static hasProperties(dataObject: Object): boolean {
        return Reflect.hasMetadata('properties', dataObject);
    }

    static clone<T extends Object>(dataObject: T): T {
        if (dataObject) {
            const typeHandler = DataObject.getTypeHandler(dataObject.constructor as EmptyConstructor<T>);
            return typeHandler.clone(dataObject);
        } else {
            return undefined;
        }
    }

    static set<T extends Object>(dataObject: T, dto: T | any, group?: number): T {
        const typeHandler = DataObject.getTypeHandler(dataObject.constructor as EmptyConstructor<T>);
        typeHandler.set(dataObject, dto, group);
        return dataObject;
    }

    static from<T extends Object>(type: EmptyConstructor<T>, dto: any, group?: number): T {
        if (dto) {
            const instance = new type();
            DataObject.set(instance, dto, group);
            return instance;
        } else {
            return undefined;
        }
    }

    static equals<T extends Object>(dataObject1: T, dataObject2: T): boolean {
        if (dataObject1.constructor !== dataObject2.constructor) {
            return false;
        } else {
            const typeHandler = DataObject.getTypeHandler(dataObject1.constructor as EmptyConstructor<T>);
            return typeHandler.equals(dataObject1, dataObject2);
        }
    }

    private constructor() {}
}
