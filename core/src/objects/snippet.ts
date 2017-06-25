import { LanguageId } from './language';

export type SnippetId = number;

export class Snippet {
    _id: SnippetId;
    languageId: LanguageId;
    title: string;
    code: string;
}
