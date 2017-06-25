import { FileId } from './file';

export type UserId = number;

export class User {
    _id: UserId;
    email: string;
    name: string;
    password: string;
    createdDate: Date;
    imageId?: FileId;
}