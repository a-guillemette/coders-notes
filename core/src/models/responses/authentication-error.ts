export enum AuthenticationErrorCode {
    invalid_request = 0,
    invalid_client = 1,
    invalid_grant = 2,
    unauthorized_client = 3,
    unsupported_grant_type = 4,
    invalid_scope = 5
}

export enum AuthenticationFailureReason {
    Unknown = 0,
    InvalidUsername = 1,
    InvalidPassword = 2,
    AccountDisabled = 3,
    AccountLockedOut = 4,
    UserNotRegistered = 5,
    TrialExpired = 6
}

export class AuthenticationError {
    constructor(
        public errorCode: AuthenticationErrorCode,
        public failureReason?: AuthenticationFailureReason
    ) { }
}
