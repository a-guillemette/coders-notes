import { Request, Response, Next } from 'restify';
import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';

@RoutePrefix('token')
export class AuthenticationController {
    @HttpPost @Route('')
    authenticate(req: Request, res: Response, next: Next) {
        const authenticationRequest = req.body;

        res.send(200, 'token');
        next();
    }
}
