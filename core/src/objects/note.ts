import { ColorId } from './color';
import { Image } from './image';
import { LabelId } from './label';
import { Snippet } from './snippet';
import { StatusId } from './status';
import { UserId } from './user';

export type NoteId = number;

export class Note {
    _id: NoteId;
    status: StatusId;
    title: string;
    description: string;
    createdDate: Date;
    editedDate?: Date;
    createdByUserId: UserId;
    editedByUserId?: UserId;
    colorId: ColorId | null;
    labels: Array<LabelId>;
    snippets?: Array<Snippet>;
    images?: Array<Image>;
}
