import { LanguageId } from './language';

export type SnippetId = any;

export class Snippet {
    _id: SnippetId;
    languageId: LanguageId;
    title: string;
    code: string;
}
