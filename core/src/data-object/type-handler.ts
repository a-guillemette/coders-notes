export interface TypeHandler<T extends Object> {
    clone(dataObject: T): T;
    set(dataObject: T, dto: T | any, group?: number): void;
    equals(dataObject1: T, dataObject2: T): boolean;
}
