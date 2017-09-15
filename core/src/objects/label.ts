import { Prop, BaseDataObject } from '../data-object';
import { PropGroup } from '../data-object/prop-group.decorator';
import { PropGroupEnum as PG } from '../prop-group.enum';

export type LabelId = number;

export class Label extends BaseDataObject {
    @Prop() _id: LabelId;
    @Prop() @PropGroup(PG.Create | PG.Edit) text: string;
}
