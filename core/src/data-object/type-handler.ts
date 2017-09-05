export interface TypeHandler<T extends Object> {
    clone(dataObject: T): T;
    set(dataObject: T, dto: T | any): void;
    equals(dataObject1: T, dataObject2: T): boolean;
}
