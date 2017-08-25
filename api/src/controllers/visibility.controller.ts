import {HttpGet, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';


@RoutePrefix('visibility')
export class VisibilityController {
    @HttpGet @Route('')
    getVisibilities(req: Request, res: Response, next: Next) {
        res.send(200, 'want some fuk');
        next();
    }
}
