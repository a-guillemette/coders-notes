import { ThemeId }      from './theme';
import { FileId }       from './file';
import { LabelId }      from './label';
import { Snippet }      from './snippet';
import { StatusId }     from './status';
import { UserId }       from './user';
import { VisibilityId } from './visibility';

export type NoteId = number;

export class Note {
    _id: NoteId;
    forkedFromId?: NoteId;
    statusId: StatusId;
    visibilityId: VisibilityId;
    title: string;
    description: string;
    createdDate: Date;
    createdByUserId: UserId;
    editedDate?: Date;
    editedByUserId?: UserId;
    colorId?: ThemeId;
    labels?: Array<LabelId>;
    snippets?: Array<Snippet>;
    images?: Array<FileId>;
}
