import { DataObject } from './data-object';

export function Prop(type?: { new(): DataObject | Date; }) {
    return (target: DataObject, propertyKey: string | symbol) => {
        const properties = DataObject.getProperties(target);
        if (!properties.find(prop => prop.field === propertyKey)) {
            properties.push({
                field: propertyKey,
                type: type
            });
        }
        DataObject.setProperties(target, properties);
    }
}
