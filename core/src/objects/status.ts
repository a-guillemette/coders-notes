export type StatusId = number;

export class Status {
    _id: StatusId;
    enumValueName: string;
}

export enum StatusEnum {
    normal = 0,
    pinned = 1,
    archived = 2,
    deleted = 3
}