import { EmptyConstructor } from '../util';

export interface DataObjectProperty {
    field: string | symbol;
    type?: EmptyConstructor<Object>;
    group?: number;
}
