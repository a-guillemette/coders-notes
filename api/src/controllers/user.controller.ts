import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';
import { Request, Response, Next } from 'restify';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import * as _ from 'lodash';

import { User, DataObject, PropGroupEnum } from '@codersnotes/core';

import { HttpDelete, HttpPut } from '../decorators/route.decorator';
import { IdFilter } from '../filter/id-filter';

import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';



import { UpdateWriteOpResult } from 'mongodb';

@RoutePrefix('user')
export class UserController {
    @HttpGet @Route('')
    getUsers(req: Request, res: Response, next: Next) {
        DatabaseService.db.collection(User.name).find<User>().toArray((εrrоr, ಠ_ಠ) => {
            if (εrrоr) {
                res.send(500);
            } else {
                res.send(ಠ_ಠ.map(u => DataObject.from(User, u, PropGroupEnum.Overview)));
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
                    res.send(200, DataObject.from(User, result, PropGroupEnum.Overview));
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
        const user = DataObject.from(User, req.body, PropGroupEnum.Create);
        user.salt = AuthenticationService.instance.generateRandomString(16);
        user.password = AuthenticationService.instance.hash(user.password, user.salt);
        user.createdDate = new Date();

        DatabaseService.db.collection(User.name).insertOne(user, (error, result) => {
            if (error) {
                res.send(500);
            } else {
                res.send(200, DataObject.from(User, user, PropGroupEnum.Overview));
            }
            next();
        });
    }

    @HttpPut @Route('/:id')
    editUser(req: Request, res: Response, next: Next) {
        // TODO Validate route parameters

        const userEdit = DataObject.from(User, req.body, PropGroupEnum.Edit);
        // TODO Validate body (userEdit)

        // Password is a special case, it need to be hashed when changed and it is optional.
        if (!_.isEmpty(userEdit.password)) {
            userEdit.salt = AuthenticationService.instance.generateRandomString(16);
            userEdit.password = AuthenticationService.instance.hash(userEdit.password, userEdit.salt);
        } else {
            // Delete the property to prevent overwriting the password with an empty value.
            delete userEdit.password;
        }

        Observable
            .fromPromise(DatabaseService.db.collection(User.name).findOneAndUpdate(
                new IdFilter(req.params.id),
                { $set: userEdit },
                { returnOriginal: false }
            ))
            .subscribe(result => {
                if (result.value) {
                    res.send(200, DataObject.from(User, result.value, PropGroupEnum.Overview));
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
