export type FileId = number;

export class File {
    _id: FileId;
    path: string;
    filename: string;
    mediaType: string;
    size: number;
}
