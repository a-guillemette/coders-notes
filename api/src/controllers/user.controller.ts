import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';
import { Request, Response, Next } from 'restify';

import { User, UserOverview } from '@codersnotes/core';

import { HttpDelete, HttpPut } from '../decorators/route.decorator';

import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';

@RoutePrefix('user')
export class UserController {
    @HttpGet @Route('')
    getUsers(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(User.name).find<User>().toArray((εrrоr, ಠ_ಠ) => {
            if (εrrоr) {
                res.send(500);
            } else {
                res.send(ಠ_ಠ);
            }
            next();
        });
    }

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
        user.createdDate = new Date();
        user.imageId = undefined;

        DatabaseService.db.collection(User.name).insertOne(user, (error, result) => {
            if (error) {
                res.send(500);
            } else {
                res.send(200, new UserOverview().set(user));
            }
            next();
        });
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
