import {HttpDelete, HttpGet, HttpPost, HttpPut, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';


@RoutePrefix('note')
export class NoteController {
    @HttpGet @Route('/:id')
    getNote(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpPost @Route('/:id')
    addNote(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpPut @Route('')
    editNote(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpDelete @Route(':id')
    removeNote(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }
}
