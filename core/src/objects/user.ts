import { DataObject } from '../data-object';
import { Prop } from '../decorators/prop.decorator';

import { FileId } from './file';

export type UserId = number;

export class User extends DataObject {
    @Prop() _id: UserId;
    @Prop() email: string;
    @Prop() name: string;
    @Prop() password: string;
    @Prop() salt: string;
    @Prop(Date) createdDate: Date;
    @Prop() imageId?: FileId;
}

export class UserOverview extends DataObject {
    @Prop() _id: UserId;
    @Prop() email: string;
    @Prop() name: string;
    @Prop(Date) createdDate: Date;
    @Prop() imageId?: FileId;
}
