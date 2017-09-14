import { Request, Response, Next } from 'restify';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import {
    DataObject,
    PropGroupEnum,
    AuthenticationRequest,
    AuthenticationError,
    AuthenticationErrorCode,
    User
} from '@codersnotes/core';

import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';

import { DatabaseService } from '../services/database.service';
import { ApiController } from './api-controller';
import { HttpMessage } from '../http-message';

@RoutePrefix('token')
export class AuthenticationController extends ApiController {
    @HttpPost @Route('')
    authenticate(req: Request): HttpMessage | Observable<HttpMessage> {
        const authenticationRequest = req.body as AuthenticationRequest;

        if (!authenticationRequest) {
            return this.badRequest('Body is required');
        } else {
            switch (authenticationRequest.grant_type) {
                case 'password':
                    return this.authenticatePassword(authenticationRequest.scope, authenticationRequest.username, authenticationRequest.password);
                case 'refresh_token':
                    return this.notImplemented();
                default:
                    return this.badRequest(new AuthenticationError(AuthenticationErrorCode.unsupported_grant_type));
            }
        }
    }

    private authenticatePassword(scope: string, username: string, password: string): HttpMessage | Observable<HttpMessage> {
        if (!_.isString(username) || !_.isString(password)) {
            return this.badRequest(new AuthenticationError(AuthenticationErrorCode.invalid_request));
        } else {
            const userSearchFilter = new User();
            userSearchFilter.email = username;

            return DatabaseService.db
                .collection<User>(User.name)
                .findOne(userSearchFilter)
                .toObservable()
                .map(user => {
                    if (user) {
                        return this.ok(DataObject.from(User, user, PropGroupEnum.Overview));
                    } else {
                        return this.badRequest(new AuthenticationError(AuthenticationErrorCode.invalid_grant));
                    }
                });
        }
    }
}
