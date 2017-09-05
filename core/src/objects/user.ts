import { Prop, BaseDataObject } from '../data-object';

import { FileId } from './file';

export type UserId = any;

export class User extends BaseDataObject {
    @Prop() _id: UserId;
    @Prop() email: string;
    @Prop() name: string;
    @Prop() password: string;
    @Prop() salt: string;
    @Prop(Date) createdDate: Date;
    @Prop() imageId?: FileId;
}

export class UserOverview extends BaseDataObject {
    @Prop() _id: UserId;
    @Prop() email: string;
    @Prop() name: string;
    @Prop(Date) createdDate: Date;
    @Prop() imageId?: FileId;
}
