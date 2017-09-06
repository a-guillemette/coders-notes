import { Prop, BaseDataObject } from '../data-object';

export type LabelId = number;

export class Label extends BaseDataObject {
    @Prop() _id: LabelId;
    @Prop() text: string;
}
