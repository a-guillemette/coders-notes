import { Request, Response, Next } from 'restify';
import * as _ from 'lodash';

import {
    DataObject,
    AuthenticationRequest,
    AuthenticationError,
    AuthenticationErrorCode,
    User,
    UserOverview
} from '@codersnotes/core';

import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';

import { DatabaseService } from '../services/database.service';

@RoutePrefix('token')
export class AuthenticationController {
    @HttpPost @Route('')
    authenticate(req: Request, res: Response, next: Next) {
        const authenticationRequest = req.body as AuthenticationRequest;

        if (!authenticationRequest) {
            res.send(400, 'Body is required');
            next();
        } else {
            switch (authenticationRequest.grant_type) {
                case 'password':
                    this.authenticatePassword(res, next, authenticationRequest.scope, authenticationRequest.username, authenticationRequest.password);
                    break;
                case 'refresh_token':
                    res.send(501, 'Not implemented');
                    next();
                    break;
                default:
                    res.send(400, new AuthenticationError(AuthenticationErrorCode.unsupported_grant_type));
                    next();
            }
        }
    }

    private authenticatePassword(res: Response, next: Next, scope: string, username: string, password: string) {
        if (!_.isString(username) || !_.isString(password)) {
            res.send(400, new AuthenticationError(AuthenticationErrorCode.invalid_request));
            next();
        } else {
            const userSearchFilter = new User();
            userSearchFilter.email = username;

            const collection = DatabaseService.db.collection<User>(User.name).findOne(userSearchFilter, (error, user) => {
                if (error) {
                    res.send(500);
                } else if (!user) {
                    res.send(400, new AuthenticationError(AuthenticationErrorCode.invalid_grant));
                } else {
                    res.send(200, DataObject.from(UserOverview, user));
                }
                next();
            })
        }
    }
}
