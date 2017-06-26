import { RequestBodyModel } from './request-body-model';

export class AuthenticationRequest extends RequestBodyModel {
    grant_type: string;
    scope: string;
    username: string;
    password: string;
    refresh_token: string;
}
