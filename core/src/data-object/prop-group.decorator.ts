import { DataObject } from './data-object';

export function PropGroup(group: number) {
    return (target: DataObject, propertyKey: string | symbol) => {
        const properties = DataObject.getProperties(target);
        const prop = properties.find(p => p.field === propertyKey);
        if (prop) {
            prop.group = group;
        } else {
            properties.push({
                field: propertyKey,
                group: group
            });
        }
        DataObject.setProperties(target, properties);
    }
}
