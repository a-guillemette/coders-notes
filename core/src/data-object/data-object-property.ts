import { EmptyConstructor } from '../empty-constructor';

export interface DataObjectProperty {
    field: string | symbol;
    type?: EmptyConstructor<Object>;
}
