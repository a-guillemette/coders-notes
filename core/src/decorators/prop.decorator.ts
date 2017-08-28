import { DataObject, getProperties, setProperties } from '../data-object';

export function Prop(type?: { new(): DataObject | Date; }) {
    return (target: DataObject, propertyKey: string | symbol) => {
        const properties = getProperties(target);
        if (!properties.find(prop => prop.field === propertyKey)) {
            properties.push({
                field: propertyKey,
                type: type
            });
        }
        setProperties(target, properties);
    }
}
