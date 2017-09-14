import { HttpMessage } from '../http-message';

export abstract class ApiController {
    ok(body?: any): HttpMessage {
        return new HttpMessage(200, body);
    }

    badRequest(body?: any) {
        return new HttpMessage(400, body);
    }

    notFound(): HttpMessage {
        return new HttpMessage(404);
    }

    internalServerError() {
        return new HttpMessage(500);
    }

    notImplemented() {
        return new HttpMessage(501);
    }
}
