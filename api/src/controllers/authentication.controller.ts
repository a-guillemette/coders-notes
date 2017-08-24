import { Request, Response, Next } from 'restify';
import * as _ from 'lodash';

import { MongoClient } from 'mongodb';

import {
    AuthenticationRequest,
    AuthenticationError,
    AuthenticationErrorCode
} from '@codersnotes/core';

import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';

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
            MongoClient.connect('mongodb://codersnotes-api:Password1@localhost:27017/codersnotes', (err, db) => {
                if (!err) {
                    console.log('Connected!');
                    db.close();
                    res.send(200);
                } else {
                    console.log('MongoDB error', err);
                    res.send(500);
                }
                next();
            });
        }
    }
}
