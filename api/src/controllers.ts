import {AuthenticationController} from './controllers/authentication.controller';
import {TestController} from './controllers/test.controller';
import {StatusController} from './controllers/status.controller';
import {ThemeController} from './controllers/theme.controller';
import {FileController} from './controllers/file.controller';
import {LabelController} from './controllers/label.controller';
import {LanguageController} from './controllers/language.controller';
import {NoteController} from './controllers/note.controller';
import {SnippetController} from './controllers/snippet.controller';
import {UserController} from './controllers/user.controller';
import {VisibilityController} from './controllers/visibility.controller';

export const Controllers: Array<any> = [
    AuthenticationController,
    TestController,
    StatusController,
    ThemeController,
    FileController,
    LabelController,
    LanguageController,
    NoteController,
    SnippetController,
    UserController,
    VisibilityController
];
