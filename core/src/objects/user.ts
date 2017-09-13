import { Prop, PropGroup, BaseDataObject } from '../data-object';
import { PropGroupEnum as PG } from '../prop-group.enum';

import { FileId } from './file';

export type UserId = any;

export class User extends BaseDataObject {
    @Prop() @PropGroup(PG.Overview)
    _id: UserId;

    @Prop() @PropGroup(PG.Overview | PG.Create)
    email: string;

    @Prop() @PropGroup(PG.Overview | PG.Create | PG.Edit)
    name: string;

    @Prop() @PropGroup(PG.Create | PG.Edit)
    password: string;

    @Prop()
    salt: string;

    @Prop(Date) @PropGroup(PG.Overview)
    createdDate: Date;

    @Prop() @PropGroup(PG.Overview | PG.Create | PG.Edit)
    imageId?: FileId;
}
