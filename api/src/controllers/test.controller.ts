import { Request, Response, Next } from 'restify';
import { HttpGet, Route, RoutePrefix } from '../decorators/route.decorator';

@RoutePrefix('test')
export class TestController {
    @HttpGet @Route('~/hello/:name')
    hello(req: Request, res: Response, next: Next) {
        res.send(200, 'Hello ' + req.params.name);
        next();
    }

    @HttpGet @Route('')
    test(req: Request, res: Response, next: Next) {
        res.send(200, 'Test');
        next();
    }
}
