import {HttpGet, HttpPost, Route, RoutePrefix} from '../decorators/route.decorator';
import {Request, Response, Next} from 'restify';
import {HttpDelete, HttpPut} from '../decorators/route.decorator';


@RoutePrefix('user')
export class UserController {
    @HttpGet @Route('/:id')
    getUser(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpPost @Route('')
    createUser(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpPut @Route('/:id')
    editUser(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpDelete @Route(':id')
    deleteUser(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }
}
