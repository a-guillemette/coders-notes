import {HttpDelete, HttpGet, HttpPost, HttpPut, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';


@RoutePrefix('snippet')
export class SnippetController {
    @HttpGet @Route('/:id')
    getSnippet(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpPost @Route('/:id')
    addSnippet(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpPut @Route('')
    editSnippet(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpDelete @Route(':id')
    removeSnippet(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }
}
