export type StatusId = StatusEnum;

export class Status {
    _id: StatusId;
    enumValueName: string;
    displayName: string;
}

export enum StatusEnum {
    normal = 0,
    pinned = 1,
    archived = 2,
    deleted = 3
}
