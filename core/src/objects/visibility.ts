export type VisibilityId = number;

export class Visibility {
    _id: VisibilityId;
    enumValueName: string;
    displayName: string;
}

export enum VisibilityEnum {
    private = 0,
    unlisted = 1,
    public = 2
}
