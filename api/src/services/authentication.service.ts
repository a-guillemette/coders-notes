export class AuthenticationService {
    private static _instance: AuthenticationService;
    static get instance(): AuthenticationService {
        if (!AuthenticationService._instance) {
            AuthenticationService._instance = new AuthenticationService();
        }
        return AuthenticationService._instance;
    }

    private constructor() {}

}
