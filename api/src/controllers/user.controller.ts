import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';
import { Request, Response, Next } from 'restify';

import { User } from '@codersnotes/core';

import { HttpDelete, HttpPut } from '../decorators/route.decorator';
import { AuthenticationService } from '../services/authentication.service';

@RoutePrefix('user')
export class UserController {
    @HttpGet @Route('/:id')
    getUser(req: Request, res: Response, next: Next) {
        res.send(200, 'want som fk');
        next();
    }

    @HttpPost @Route('')
    createUser(req: Request, res: Response, next: Next) {
        const user = new User().set(req.body);
        user.salt = AuthenticationService.instance.generateRandomString(16);
        user.password = AuthenticationService.instance.hash(user.password, user.salt);

        res.send(200, user);
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
