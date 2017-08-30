import * as crypto from 'crypto';

export class AuthenticationService {
    private static _instance: AuthenticationService;
    static get instance(): AuthenticationService {
        if (!AuthenticationService._instance) {
            AuthenticationService._instance = new AuthenticationService();
        }
        return AuthenticationService._instance;
    }

    private constructor() {}

    generateRandomString(length: number): string {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    }

    hash(value: string, salt: string): string {
        const algorithm = 'sha512';
        return crypto
            .createHmac(algorithm, salt)
            .update(value)
            .digest('hex');
    };
}
