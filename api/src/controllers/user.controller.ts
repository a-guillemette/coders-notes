import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';
import { Request, Response, Next } from 'restify';

import { User, UserOverview, DataObject } from '@codersnotes/core';

import { HttpDelete, HttpPut } from '../decorators/route.decorator';
import { IdFilter } from '../filter/id-filter';

import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';

import { UpdateWriteOpResult } from 'mongodb';

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
        DatabaseService.db.collection(User.name)
            .findOne(new IdFilter(req.params.id))
            .then(result => {
                if (!result) {
                    res.send(404);
                } else {
                    res.send(200, DataObject.from(UserOverview, result));
                }
                next();
            })
            .catch(error => {
                res.send(500);
                next();
            });
    }

    @HttpPost @Route('')
    createUser(req: Request, res: Response, next: Next) {
        const user = DataObject.from(User, req.body);
        user.salt = AuthenticationService.instance.generateRandomString(16);
        user.password = AuthenticationService.instance.hash(user.password, user.salt);
        user.createdDate = new Date();
        user.imageId = undefined;

        DatabaseService.db.collection(User.name).insertOne(user, (error, result) => {
            if (error) {
                res.send(500);
            } else {
                res.send(200, DataObject.from(UserOverview, user));
            }
            next();
        });
    }

    @HttpPut @Route('/:id')
    editUser(req: Request, res: Response, next: Next) {
        // Do not refactor using this method yet, might refactor and remove the findOne to use only updateOne. Need investigation...

        // Check req.params.id is not null...

        const userEdit = DataObject.from(User, req.body);
        // Validate userEdit...

        let editedObject: User;
        Observable.fromPromise(DatabaseService.db.collection(User.name).findOne(new IdFilter(req.params.id)))
            .flatMap(result => {
                if (result) {
                    editedObject = result;
                    editedObject.name = userEdit.name;
                    editedObject.imageId = userEdit.imageId;
                    return DatabaseService.db.collection(User.name).updateOne(new IdFilter(req.params.id), editedObject);
                } else {
                    res.send(404);
                    next();
                    return Observable.empty<UpdateWriteOpResult>();
                }
            })
            .subscribe(result => {
                if (result.matchedCount > 0) {
                    res.send(200, DataObject.from(UserOverview, editedObject));
                } else {
                    res.send(404);
                }
                next();
            }, error => {
                res.send(500);
                next();
            });
    }

    @HttpDelete @Route(':id')
    deleteUser(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(User.name).deleteOne(new IdFilter(req.params.id), (error, result) => {
            if (error) {
                res.send(500);
            } else if (result.deletedCount > 0) {
                res.send(200);
            } else {
                res.send(404);
            }
            next();
        });
    }
}
