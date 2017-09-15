import { Request, Response, Next } from 'restify';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import '../util/promise-to-observable';

import { Label, DataObject, PropGroupEnum } from '@codersnotes/core';
import { HttpGet, HttpDelete, HttpPost, HttpPut, Route, RoutePrefix } from '../decorators/route.decorator';

import { IdFilter } from '../filter/id-filter';
import { DatabaseService } from '../services/database.service';
import { ApiController } from './api-controller';
import { HttpMessage } from '../http-message';

@RoutePrefix('label')
export class LabelController extends ApiController {
    @HttpGet @Route('')
    getLabels(req: Request) {
        return DatabaseService.db
            .collection(Label.name)
            .find<Label>()
            .toArray();
    }

    @HttpGet @Route('/:id')
    getLabel(req: Request) {
        return DatabaseService.db
            .collection(Label.name)
            .findOne<Label>(new IdFilter(req.params.id));
    }

    @HttpPost @Route('')
    createLabel(req: Request) {
        const label = DataObject.from(Label, req.body, PropGroupEnum.Create);

        const duplicateSearch = new Label();
        duplicateSearch.text = label.text;

        return DatabaseService.db
            .collection(Label.name)
            .findOne<Label>(duplicateSearch)
            .toObservable()
            .flatMap(result => {
                if (result) {
                    return Observable.of<any>(this.badRequest('Label with this name already exist.'));
                } else {
                    return DatabaseService.db
                        .collection(Label.name)
                        .insertOne(label)
                        .toObservable()
                        .map(insertResult => {
                            if (insertResult.insertedCount > 0) {
                                return this.ok(insertResult.ops[0]);
                            } else {
                                return this.internalServerError();
                            }
                        });
                }
            });
    }

    @HttpPut @Route('/:id')
    editLabel(req: Request) {
        const label = DataObject.from(Label, req.body, PropGroupEnum.Edit);

        return DatabaseService.db
            .collection(Label.name)
            .findOneAndUpdate(
                new IdFilter(req.params.id),
                { $set: label },
                { returnOriginal: false }
            )
            .toObservable()
            .map(result => result.value);
    }

    @HttpDelete @Route('/:id')
    deleteLabel(req: Request) {
        return DatabaseService.db
            .collection(Label.name)
            .deleteOne(new IdFilter(req.params.id))
            .toObservable()
            .map(result => result.deletedCount > 0 ? this.ok() : this.notFound());
    }
}
