import { HttpGet, HttpPost, Route, RoutePrefix } from '../decorators/route.decorator';
import { Request, Response, Next } from 'restify';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as _ from 'lodash';

import { User, DataObject, PropGroupEnum } from '@codersnotes/core';

import '../util/promise-to-observable';
import { HttpDelete, HttpPut } from '../decorators/route.decorator';
import { IdFilter } from '../filter/id-filter';

import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';
import { HttpMessage } from '../http-message';
import { ApiController } from './api-controller';

@RoutePrefix('user')
export class UserController extends ApiController {
    @HttpGet @Route('')
    getUsers() {
        return DatabaseService.db
            .collection(User.name)
            .find<User>()
            .toArray()
            .toObservable()
            .map(users => users.map(u => DataObject.from(User, u, PropGroupEnum.Overview)));
    }

    @HttpGet @Route('/:id')
    getUser(req: Request) {
        return DatabaseService.db
            .collection(User.name)
            .findOne(new IdFilter(req.params.id))
            .toObservable()
            .map(user => DataObject.from(User, user, PropGroupEnum.Overview));
    }

    @HttpPost @Route('')
    createUser(req: Request) {
        const newUser = DataObject.from(User, req.body, PropGroupEnum.Create);
        newUser.salt = AuthenticationService.instance.generateRandomString(16);
        newUser.password = AuthenticationService.instance.hash(newUser.password, newUser.salt);
        newUser.createdDate = new Date();

        return DatabaseService.db
            .collection(User.name)
            .insertOne(newUser)
            .toObservable()
            .map(user => DataObject.from(User, user, PropGroupEnum.Overview));
    }

    @HttpPut @Route('/:id')
    editUser(req: Request): Observable<User> {
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

        return DatabaseService.db
            .collection(User.name)
            .findOneAndUpdate(
                new IdFilter(req.params.id),
                { $set: userEdit },
                { returnOriginal: false }
            )
            .toObservable()
            .map(result => DataObject.from(User, result.value, PropGroupEnum.Overview));
    }

    @HttpDelete @Route(':id')
    deleteUser(req: Request) {
        return DatabaseService.db
            .collection(User.name)
            .deleteOne(new IdFilter(req.params.id))
            .toObservable()
            .map(result => result.deletedCount > 0 ? this.ok() : this.notFound());
    }
}
