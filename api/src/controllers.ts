import { AuthenticationController } from './controllers/authentication.controller';
import { TestController } from './controllers/test.controller';
import {StatusController} from './controllers/status.controller';

export const Controllers: Array<any> = [
    AuthenticationController,
    TestController,
    StatusController
];
